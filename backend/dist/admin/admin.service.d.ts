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
            status: import("../generated/prisma/enums.js").OrderStatus;
            createdAt: Date;
            orderNumber: string;
            customerId: string;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            orderedAt: Date;
            deliveredAt: Date | null;
            updatedAt: Date;
        };
        decision: {
            id: string;
            refundRequestId: string;
            status: import("../generated/prisma/enums.js").RefundStatus;
            source: import("../generated/prisma/enums.js").DecisionSource;
            reason: string;
            confidence: number | null;
            createdAt: Date;
        } | null;
        chatMessages: {
            id: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            refundRequestId: string;
            createdAt: Date;
            role: string;
            content: string;
        }[];
        auditLogs: {
            id: string;
            refundRequestId: string;
            createdAt: Date;
            action: string;
            details: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
    } & {
        id: string;
        reason: import("../generated/prisma/enums.js").RefundReason;
        createdAt: Date;
        customerId: string;
        updatedAt: Date;
        description: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        orderId: string;
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
            status: import("../generated/prisma/enums.js").OrderStatus;
            createdAt: Date;
            orderNumber: string;
            customerId: string;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            orderedAt: Date;
            deliveredAt: Date | null;
            updatedAt: Date;
        };
        decision: {
            id: string;
            refundRequestId: string;
            status: import("../generated/prisma/enums.js").RefundStatus;
            source: import("../generated/prisma/enums.js").DecisionSource;
            reason: string;
            confidence: number | null;
            createdAt: Date;
        } | null;
        chatMessages: {
            id: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            refundRequestId: string;
            createdAt: Date;
            role: string;
            content: string;
        }[];
        auditLogs: {
            id: string;
            refundRequestId: string;
            createdAt: Date;
            action: string;
            details: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
    } & {
        id: string;
        reason: import("../generated/prisma/enums.js").RefundReason;
        createdAt: Date;
        customerId: string;
        updatedAt: Date;
        description: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        orderId: string;
    }) | null>;
    overrideDecision(id: string, status: "APPROVED" | "DENIED" | "ESCALATED", note: string): Promise<{
        id: string;
        refundRequestId: string;
        status: import("../generated/prisma/enums.js").RefundStatus;
        source: import("../generated/prisma/enums.js").DecisionSource;
        reason: string;
        confidence: number | null;
        createdAt: Date;
    }>;
}
