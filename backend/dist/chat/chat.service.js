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
import { Cron } from "@nestjs/schedule";
import { HARDCODED_INTRO } from "./chat.constants.js";
let ChatService = class ChatService {
    prisma;
    ai;
    constructor(prisma, ai) {
        this.prisma = prisma;
        this.ai = ai;
    }
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
        const injection = this.ai.detectInjection(userMessage);
        const productResult = await this.ai.identifyProduct({
            customerMessage: userMessage,
            conversationHistory: [
                ...request.chatMessages,
                {
                    role: "user",
                    content: userMessage,
                },
            ].map((message) => ({
                role: message.role,
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
        const item = productResult.productName
            ? request.order.items.find((orderItem) => orderItem.product.name.toLowerCase() ===
                productResult.productName.toLowerCase())
            : undefined;
        if (!item) {
            const assistantMessage = await this.prisma.chatMessage.create({
                data: {
                    refundRequestId: sessionId,
                    role: "assistant",
                    content: "I couldn't identify which product you're requesting a refund for. " +
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
                    content: `I found your ${item.product.name}. ` +
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
        const itemRefundAmount = Number(item.unitPrice) * item.quantity;
        const policy = evaluatePolicy({
            refundAmount: itemRefundAmount,
            itemAmount: itemRefundAmount,
            orderedAt: request.order.orderedAt,
            isFinalSale: item.isFinalSale,
        });
        console.log("🚀 ~ ChatService ~ sendMessage ~ policy:", policy);
        const aiResult = await this.ai.evaluate({
            customerMessage: userMessage,
            conversationHistory: [
                ...request.chatMessages,
                {
                    role: "user",
                    content: userMessage,
                },
            ].map((message) => ({
                role: message.role,
                content: message.content,
            })),
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
        console.log("🚀 ~ ChatService ~ sendMessage ~ aiResult:", aiResult);
        let finalDecision = aiResult.decision.toUpperCase();
        let decisionSource = "AI";
        let finalReply = aiResult.reply;
        let finalReasoning = aiResult.reasoning;
        if (policy.hardFail) {
            finalDecision = "DENIED";
            decisionSource = "POLICY";
            const failedCheck = policy.checks.find((check) => !check.passed && check.severity === "hard");
            finalReasoning =
                failedCheck?.reason ?? "This item does not qualify for a refund.";
            finalReply =
                `I'm sorry, but this item doesn't qualify for a refund. ` +
                    `${finalReasoning} ` +
                    `If you believe this is a mistake, please contact our support team.`;
        }
        else if (injection.suspicious || policy.requiresEscalation) {
            finalDecision = "ESCALATED";
            decisionSource = "POLICY";
            if (injection.suspicious) {
                finalReasoning =
                    "The request contained content that requires human review.";
            }
            else {
                finalReasoning =
                    "The refund amount exceeds the automatic approval limit and requires human review.";
            }
            finalReply =
                `Your refund request for ${item.product.name} requires human review. ` +
                    `A support representative will review the request and determine the next step.`;
        }
        console.log("FINAL REFUND DECISION:", {
            decision: finalDecision,
            source: decisionSource,
            reasoning: finalReasoning,
            productName: item.product.name,
            refundAmount: itemRefundAmount,
            injectionSuspected: injection.suspicious,
            requiresEscalation: policy.requiresEscalation,
        });
        const assistantMessage = await this.prisma.chatMessage.create({
            data: {
                refundRequestId: sessionId,
                role: "assistant",
                content: finalReply,
                metadata: {
                    decision: finalDecision,
                    reasoning: finalReasoning,
                    policyChecks: policy.checks,
                    productName: item.product.name,
                    itemPrice: Number(item.unitPrice),
                    itemQuantity: item.quantity,
                    refundAmount: itemRefundAmount,
                    injectionSuspected: injection.suspicious,
                },
            },
        });
        const decisionRecord = await this.prisma.refundDecision.create({
            data: {
                refundRequestId: sessionId,
                status: finalDecision,
                source: decisionSource,
                reason: finalReasoning,
                confidence: injection.suspicious ? 0.5 : 0.9,
            },
        });
        await this.prisma.auditLog.create({
            data: {
                refundRequestId: sessionId,
                action: `decision_${finalDecision.toLowerCase()}`,
                details: {
                    policyChecks: policy.checks,
                    productName: item.product.name,
                    itemPrice: Number(item.unitPrice),
                    itemQuantity: item.quantity,
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
};
__decorate([
    Cron("*/10 * * * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "cleanupAbandonedSessions", null);
ChatService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        AiService])
], ChatService);
export { ChatService };
//# sourceMappingURL=chat.service.js.map