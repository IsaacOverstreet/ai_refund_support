import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service.js";
import { AiService } from "../ai/ai.service.js";
import { evaluatePolicy } from "../policy/refundPolicy.js";
import { Cron } from "@nestjs/schedule";

import { HARDCODED_INTRO } from "./chat.constants.js";

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ai: AiService,
  ) {}

  @Cron("*/10 * * * * *")
  async cleanupAbandonedSessions() {
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

    const result = await this.prisma.refundRequest.deleteMany({
      where: {
        decision: null,
        createdAt: {
          lt: twoMinutesAgo,
        },
      },
    });

    if (result.count > 0) {
      console.log(`Cleaned up ${result.count} abandoned refund session(s).`);
    }
  }

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
      },
    });

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    const request = await this.prisma.refundRequest.create({
      data: {
        customerId: order.customerId,
        orderId: order.id,
        reason: "OTHER",
        description: "Refund chat session initiated",

        // This is only the order total stored on the session.
        // The actual refund amount is calculated from the identified item
        // later in sendMessage().
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

    // Once a real refund decision exists, the session is finished.
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

    // Check for prompt injection.
    const injection = this.ai.detectInjection(userMessage);

    // Identify which actual product from the order the customer is talking about.
    //We do this before evaluating the refund policy because we need the actual item's price.
    const productResult = await this.ai.identifyProduct({
      customerMessage: userMessage,

      conversationHistory: [
        ...request.chatMessages,
        {
          role: "user",
          content: userMessage,
        },
      ].map((message) => ({
        role: message.role as "user" | "assistant",
        content: message.content,
      })),

      order: {
        orderNumber: request.order.orderNumber,

        items: request.order.items.map((item) => ({
          productName: item.product.name,
          quantity: item.quantity,
          isFinalSale: item.isFinalSale,
        })),
      },
    });

    //Find the product returned by the AI in the actual database order.
    //The AI is never trusted to invent a product. The product must exist in this order.
    const item = productResult.productName
      ? request.order.items.find(
          (orderItem) =>
            orderItem.product.name.toLowerCase() ===
            productResult.productName!.toLowerCase(),
        )
      : undefined;

    //The AI could not identify a product.
    //This is NOT a refund decision.
    // We only send a clarification message and keep the session open.

    if (!item) {
      const assistantMessage = await this.prisma.chatMessage.create({
        data: {
          refundRequestId: sessionId,
          role: "assistant",
          content:
            "I couldn't identify which product you're requesting a refund for. " +
            "Could you please tell me the product name?",
          metadata: {
            type: "clarification",
            injectionSuspected: injection.suspicious,
          },
        },
      });

      return {
        message: assistantMessage,
        decision: null,
        reasoning: null,
        policyChecks: [],
        injectionSuspected: injection.suspicious,
      };
    }

    const refundIntent = await this.ai.checkRefundIntent(userMessage);

    if (!refundIntent.hasRefundIntent) {
      const assistantMessage = await this.prisma.chatMessage.create({
        data: {
          refundRequestId: sessionId,
          role: "assistant",
          content:
            `I found your ${item.product.name}. ` +
            `Could you please tell me what issue you're having with it?`,
          metadata: {
            type: "clarification",
            productName: item.product.name,
            injectionSuspected: injection.suspicious,
          },
        },
      });

      return {
        message: assistantMessage,
        decision: null,
        reasoning: null,
        policyChecks: [],
        injectionSuspected: injection.suspicious,
      };
    }

    //////////////////////////////////////////////////////////////////////////////////
    //Calculate the refund amount from the actual item.
    const itemRefundAmount = Number(item.unitPrice) * item.quantity;

    // Evaluate the business rules using the actual item amount.
    const policy = evaluatePolicy({
      refundAmount: itemRefundAmount,
      itemAmount: itemRefundAmount,
      orderedAt: request.order.orderedAt,
      isFinalSale: item.isFinalSale,
    });

    //Now that we know the actual product and refund amount,
    //let the AI generate the final response and reasoning.
    const aiResult = await this.ai.evaluate({
      customerMessage: userMessage,

      conversationHistory: [
        ...request.chatMessages,
        {
          role: "user",
          content: userMessage,
        },
      ].map((message) => ({
        role: message.role as "user" | "assistant",
        content: message.content,
      })),

      // IMPORTANT:
      // This is the identified item's refund amount.
      // It is NOT the order total.
      refundAmount: itemRefundAmount,

      productName: item.product.name,

      order: {
        orderNumber: request.order.orderNumber,
        totalAmount: Number(request.order.totalAmount),
        orderedAt: request.order.orderedAt,

        items: request.order.items.map((orderItem) => ({
          productName: orderItem.product.name,
          quantity: orderItem.quantity,
          isFinalSale: orderItem.isFinalSale,
        })),
      },

      policyChecks: policy.checks,
      requiresEscalation: policy.requiresEscalation,
      hardFail: policy.hardFail,
      injectionSuspected: injection.suspicious,
    });

    // The backend determines the final decision.
    // The AI can provide reasoning and a suggested decision,  but the backend policy rules take priority.
    let finalDecision = aiResult.decision.toUpperCase() as
      "APPROVED" | "DENIED" | "ESCALATED";

    let decisionSource: "POLICY" | "AI" = "AI";

    let finalReply = aiResult.reply;
    let finalReasoning = aiResult.reasoning;

    // Hard policy failure always means DENIED.
    if (policy.hardFail) {
      finalDecision = "DENIED";
      decisionSource = "POLICY";

      const failedCheck = policy.checks.find(
        (check) => !check.passed && check.severity === "hard",
      );

      finalReasoning =
        failedCheck?.reason ?? "This item does not qualify for a refund.";

      finalReply =
        `I'm sorry, but this item doesn't qualify for a refund. ` +
        `${finalReasoning} ` +
        `If you believe this is a mistake, please contact our support team.`;
    }

    // Suspicious requests or refunds above the automatic limit require human review.
    else if (injection.suspicious || policy.requiresEscalation) {
      finalDecision = "ESCALATED";
      decisionSource = "POLICY";

      if (injection.suspicious) {
        finalReasoning =
          "The request contained content that requires human review.";
      } else {
        finalReasoning =
          "The refund amount exceeds the automatic approval limit and requires human review.";
      }

      finalReply =
        `Your refund request for ${item.product.name} requires human review. ` +
        `A support representative will review the request and determine the next step.`;
    }

    // SEE THE FINAL DECISION HERE
    console.log("FINAL REFUND DECISION:", {
      decision: finalDecision,
      source: decisionSource,
      reasoning: finalReasoning,
      productName: item.product.name,
      refundAmount: itemRefundAmount,
      injectionSuspected: injection.suspicious,
      requiresEscalation: policy.requiresEscalation,
    });

    // Save the final assistant response.
    const assistantMessage = await this.prisma.chatMessage.create({
      data: {
        refundRequestId: sessionId,
        role: "assistant",
        content: finalReply,
        metadata: {
          decision: finalDecision,
          reasoning: finalReasoning,
          policyChecks: policy.checks,

          // Store the actual identified product.
          productName: item.product.name,

          // Store the item's price, not the order total.
          itemPrice: Number(item.unitPrice),
          itemQuantity: item.quantity,
          refundAmount: itemRefundAmount,

          injectionSuspected: injection.suspicious,
        },
      },
    });

    //Save the actual refund decision.
    // //This is what marks the session as finished.
    const decisionRecord = await this.prisma.refundDecision.create({
      data: {
        refundRequestId: sessionId,
        status: finalDecision,
        source: decisionSource,
        reason: finalReasoning,
        confidence: injection.suspicious ? 0.5 : 0.9,
      },
    });

    //Save an audit record with the actual refund amount.
    await this.prisma.auditLog.create({
      data: {
        refundRequestId: sessionId,
        action: `decision_${finalDecision.toLowerCase()}`,
        details: {
          policyChecks: policy.checks,

          productName: item.product.name,
          itemPrice: Number(item.unitPrice),
          itemQuantity: item.quantity,

          // Actual refund amount for the identified item.
          refundAmount: itemRefundAmount,

          injectionSuspected: injection.suspicious,
          reasoning: finalReasoning,
          decisionSource,
        },
      },
    });

    return {
      message: assistantMessage,
      decision: decisionRecord.status,
      reasoning: finalReasoning,
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
