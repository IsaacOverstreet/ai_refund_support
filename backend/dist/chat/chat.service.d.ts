import { PrismaService } from "../prisma/prisma.service.js";
import { AiService } from "../ai/ai.service.js";
export declare class ChatService {
    private readonly prisma;
    private readonly ai;
    constructor(prisma: PrismaService, ai: AiService);
    cleanupAbandonedSessions(): Promise<void>;
    startSession(orderId: string): Promise<{
        sessionId: string;
        orderId: string;
        messages: {
            id: string;
            createdAt: Date;
            role: string;
            content: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            refundRequestId: string;
        }[];
    }>;
    sendMessage(sessionId: string, userMessage: string): Promise<{
        message: {
            id: string;
            createdAt: Date;
            role: string;
            content: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            refundRequestId: string;
        };
        decision: null;
        reasoning: null;
        policyChecks: never[];
        injectionSuspected: boolean;
    } | {
        message: {
            id: string;
            createdAt: Date;
            role: string;
            content: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            refundRequestId: string;
        };
        decision: import("../generated/prisma/enums.js").RefundStatus;
        reasoning: string;
        policyChecks: import("../policy/refundPolicy.js").PolicyCheck[];
        injectionSuspected: boolean;
    }>;
    listSessions(): Promise<({
        chatMessages: {
            id: string;
            createdAt: Date;
            role: string;
            content: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            refundRequestId: string;
        }[];
        customer: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
        };
        order: {
            items: ({
                product: {
                    id: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    sku: string;
                    price: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                orderId: string;
                productId: string;
                quantity: number;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                isFinalSale: boolean;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            orderNumber: string;
            status: import("../generated/prisma/enums.js").OrderStatus;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            orderedAt: Date;
            deliveredAt: Date | null;
        };
        decision: {
            id: string;
            reason: string;
            createdAt: Date;
            status: import("../generated/prisma/enums.js").RefundStatus;
            refundRequestId: string;
            source: import("../generated/prisma/enums.js").DecisionSource;
            confidence: number | null;
        } | null;
        auditLogs: {
            id: string;
            createdAt: Date;
            refundRequestId: string;
            action: string;
            details: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
    } & {
        id: string;
        reason: import("../generated/prisma/enums.js").RefundReason;
        description: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        orderId: string;
    })[]>;
}
