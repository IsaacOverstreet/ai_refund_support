import { ChatService } from "../chat/chat.service.js";
import { PrismaService } from "../prisma/prisma.service.js";
declare class SendMessageDto {
    message: string;
}
export declare class ChatController {
    private chat;
    private prisma;
    constructor(chat: ChatService, prisma: PrismaService);
    getCustomers(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        orders: ({
            items: ({
                product: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
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
            orderNumber: string;
            customerId: string;
            status: import("../generated/prisma/enums.js").OrderStatus;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            orderedAt: Date;
            deliveredAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    })[]>;
    start(orderId: string): Promise<{
        sessionId: string;
        orderId: string;
        messages: {
            id: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            refundRequestId: string;
            role: string;
            content: string;
        }[];
    }>;
    send(id: string, dto: SendMessageDto): Promise<{
        message: {
            id: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            refundRequestId: string;
            role: string;
            content: string;
        };
        decision: import("../generated/prisma/enums.js").RefundStatus;
        reasoning: string;
        policyChecks: import("../policy/refundPolicy.js").PolicyCheck[];
        injectionSuspected: boolean;
    }>;
    list(): Promise<({
        customer: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
        };
        order: {
            items: ({
                product: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
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
            orderNumber: string;
            customerId: string;
            status: import("../generated/prisma/enums.js").OrderStatus;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            orderedAt: Date;
            deliveredAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        decision: {
            id: string;
            status: import("../generated/prisma/enums.js").RefundStatus;
            createdAt: Date;
            refundRequestId: string;
            source: import("../generated/prisma/enums.js").DecisionSource;
            reason: string;
            confidence: number | null;
        } | null;
        chatMessages: {
            id: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            refundRequestId: string;
            role: string;
            content: string;
        }[];
        auditLogs: {
            id: string;
            createdAt: Date;
            refundRequestId: string;
            action: string;
            details: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
    } & {
        id: string;
        customerId: string;
        createdAt: Date;
        updatedAt: Date;
        reason: import("../generated/prisma/enums.js").RefundReason;
        orderId: string;
        description: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
}
export {};
