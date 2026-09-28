var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException, } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { AiService } from "../ai/ai.service.js";
import { evaluatePolicy } from "../policy/refundPolicy.js";
const HARDCODED_INTRO = (customerName, orderNumber, totalAmount) => `Hi ${customerName}! 👋 I'm your WORKNOON refund assistant.\n\n` +
    `I can see your order **${orderNumber}** for a total of **$${totalAmount.toFixed(2)}**.\n\n` +
    `To get started, could you tell me what went wrong? For example:\n` +
    `• The item arrived damaged\n` +
    `• I received the wrong item\n` +
    `• The item is faulty\n` +
    `• I never received it\n\n` +
    `Just describe the issue in your own words.`;
let ChatService = class ChatService {
    prisma;
    ai;
    constructor(prisma, ai) {
        this.prisma = prisma;
        this.ai = ai;
    }
    async startSession(orderId) {
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
                        content: HARDCODED_INTRO(order.customer.name, order.orderNumber, Number(order.totalAmount)),
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
    async sendMessage(sessionId, userMessage) {
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
            throw new BadRequestException("This refund request already has a decision.");
        }
        await this.prisma.chatMessage.create({
            data: {
                refundRequestId: sessionId,
                role: "user",
                content: userMessage,
            },
        });
        const item = request.order.items[0];
        const policy = evaluatePolicy({
            refundAmount: Number(request.amount),
            itemAmount: Number(item.unitPrice),
            orderedAt: request.order.orderedAt,
            isFinalSale: item.isFinalSale,
        });
        const injection = this.ai.detectInjection(userMessage);
        const aiResult = await this.ai.evaluate({
            customerMessage: userMessage,
            conversationHistory: request.chatMessages.map((message) => ({
                role: message.role,
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
        let finalDecision = aiResult.decision.toUpperCase();
        let decisionSource = "AI";
        if (policy.hardFail) {
            finalDecision = "DENIED";
            decisionSource = "POLICY";
        }
        else if (injection.suspicious || policy.requiresEscalation) {
            finalDecision = "ESCALATED";
            decisionSource = "POLICY";
        }
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
        const decisionRecord = await this.prisma.refundDecision.create({
            data: {
                refundRequestId: sessionId,
                status: finalDecision,
                source: decisionSource,
                reason: aiResult.reasoning,
                confidence: injection.suspicious ? 0.5 : 0.9,
            },
        });
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
};
ChatService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        AiService])
], ChatService);
export { ChatService };
//# sourceMappingURL=chat.service.js.map