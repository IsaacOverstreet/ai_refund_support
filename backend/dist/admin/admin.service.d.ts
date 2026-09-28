import { PrismaService } from "../prisma/prisma.service.js";
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        total: number;
        approved: number;
        denied: number;
        escalated: number;
    }>;
    listRequests(status?: "APPROVED" | "DENIED" | "ESCALATED"): Promise<({
        customer: {
            name: string;
            id: string;
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
    getRequestDetail(id: string): Promise<({
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
    }) | null>;
    overrideDecision(id: string, status: "APPROVED" | "DENIED" | "ESCALATED", note: string): Promise<{
        id: string;
        status: import("../generated/prisma/enums.js").RefundStatus;
        createdAt: Date;
        refundRequestId: string;
        source: import("../generated/prisma/enums.js").DecisionSource;
        reason: string;
        confidence: number | null;
    }>;
}
