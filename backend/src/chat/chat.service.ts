import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service.js";
import { AiService } from "../ai/ai.service.js";
import { evaluatePolicy } from "../policy/refundPolicy.js";

const HARDCODED_INTRO = (
  customerName: string,
  orderNumber: string,
  totalAmount: number,
) =>
  `Hi ${customerName}! 👋 I'm your WORKNOON refund assistant.\n\n` +
  `I can see your order **${orderNumber}** for a total of **$${totalAmount.toFixed(2)}**.\n\n` +
  `To get started, could you tell me what went wrong? For example:\n` +
  `• The item arrived damaged\n` +
  `• I received the wrong item\n` +
  `• The item is faulty\n` +
  `• I never received it\n\n` +
  `Just describe the issue in your own words.`;

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ai: AiService,
  ) {}

  async startSession(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
        refundRequests: {
          where: { decision: null },
          include: {
            chatMessages: {
              orderBy: { createdAt: "asc" },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    const existingRequest = order.refundRequests[0];

    if (existingRequest) {
      return {
        sessionId: existingRequest.id,
        orderId: order.id,
        messages: existingRequest.chatMessages,
      };
    }

    const request = await this.prisma.refundRequest.create({
      data: {
        customerId: order.customerId,
        orderId: order.id,
        reason: "OTHER",
        description: "Refund chat session initiated",
        amount: order.totalAmount,

        chatMessages: {
          create: {
            role: "assistant",
            content: HARDCODED_INTRO(
              order.customer.name,
              order.orderNumber,
              Number(order.totalAmount),
            ),
            metadata: {
              type: "intro",
              hardcoded: true,
            },
          },
        },
      },

      include: {
        chatMessages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return {
      sessionId: request.id,
      orderId: order.id,
      messages: request.chatMessages,
    };
  }

  async sendMessage(sessionId: string, userMessage: string) {
    const request = await this.prisma.refundRequest.findUnique({
      where: { id: sessionId },
      include: {
        order: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
        chatMessages: {
          orderBy: { createdAt: "asc" },
        },
        decision: true,
      },
    });

    if (!request) {
      throw new NotFoundException("Session not found");
    }

    if (request.decision) {
      throw new BadRequestException(
        "This refund request already has a decision.",
      );
    }

    // Save the customer's message.
    await this.prisma.chatMessage.create({
      data: {
        refundRequestId: sessionId,
        role: "user",
        content: userMessage,
      },
    });

    // Check the business rules.
    const item = request.order.items[0];

    const policy = evaluatePolicy({
      refundAmount: Number(request.amount),
      itemAmount: Number(item.unitPrice),
      orderedAt: request.order.orderedAt,
      isFinalSale: item.isFinalSale,
    });

    // Check for prompt injection.
    const injection = this.ai.detectInjection(userMessage);

    // Let the AI interpret the customer's explanation.
    const aiResult = await this.ai.evaluate({
      customerMessage: userMessage,

      conversationHistory: request.chatMessages.map((message) => ({
        role: message.role as "user" | "assistant",
        content: message.content,
      })),

      refundAmount: Number(request.amount),

      order: {
        orderNumber: request.order.orderNumber,
        totalAmount: Number(request.order.totalAmount),
        orderedAt: request.order.orderedAt,

        items: request.order.items.map((item) => ({
          productName: item.product.name,
          quantity: item.quantity,
          isFinalSale: item.isFinalSale,
        })),
      },

      policyChecks: policy.checks,
      requiresEscalation: policy.requiresEscalation,
      hardFail: policy.hardFail,
      injectionSuspected: injection.suspicious,
    });

    // The backend determines the final decision.
    let finalDecision = aiResult.decision.toUpperCase() as
      "APPROVED" | "DENIED" | "ESCALATED";

    let decisionSource: "POLICY" | "AI" = "AI";

    if (policy.hardFail) {
      finalDecision = "DENIED";
      decisionSource = "POLICY";
    } else if (injection.suspicious || policy.requiresEscalation) {
      finalDecision = "ESCALATED";
      decisionSource = "POLICY";
    }

    // Save the assistant's response.
    const assistantMessage = await this.prisma.chatMessage.create({
      data: {
        refundRequestId: sessionId,
        role: "assistant",
        content: aiResult.reply,
        metadata: {
          decision: finalDecision,
          reasoning: aiResult.reasoning,
          policyChecks: policy.checks,
          injectionSuspected: injection.suspicious,
        },
      },
    });

    // Save the refund decision.
    const decisionRecord = await this.prisma.refundDecision.create({
      data: {
        refundRequestId: sessionId,
        status: finalDecision,
        source: decisionSource,
        reason: aiResult.reasoning,
        confidence: injection.suspicious ? 0.5 : 0.9,
      },
    });

    // Save the audit record.
    await this.prisma.auditLog.create({
      data: {
        refundRequestId: sessionId,
        action: `decision_${finalDecision.toLowerCase()}`,
        details: {
          policyChecks: policy.checks,
          injectionSuspected: injection.suspicious,
          reasoning: aiResult.reasoning,
          decisionSource,
        },
      },
    });

    return {
      message: assistantMessage,
      decision: decisionRecord.status,
      reasoning: aiResult.reasoning,
      policyChecks: policy.checks,
      injectionSuspected: injection.suspicious,
    };
  }

  async listSessions() {
    return this.prisma.refundRequest.findMany({
      orderBy: { createdAt: "desc" },

      include: {
        customer: true,

        order: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },

        decision: true,

        chatMessages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },

        auditLogs: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }
}
