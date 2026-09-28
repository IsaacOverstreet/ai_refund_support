import { AdminService } from "./admin.service.js";
declare class RequestFilterDto {
    status?: "APPROVED" | "DENIED" | "ESCALATED";
}
declare class OverrideDto {
    status: "APPROVED" | "DENIED" | "ESCALATED";
    note: string;
}
export declare class AdminController {
    private admin;
    constructor(admin: AdminService);
    getStats(): Promise<{
        total: number;
        approved: number;
        denied: number;
        escalated: number;
    }>;
    listRequests(filter: RequestFilterDto): Promise<({
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
    getRequest(id: string): Promise<({
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
    override(id: string, dto: OverrideDto): Promise<{
        id: string;
        status: import("../generated/prisma/enums.js").RefundStatus;
        createdAt: Date;
        refundRequestId: string;
        source: import("../generated/prisma/enums.js").DecisionSource;
        reason: string;
        confidence: number | null;
    }>;
}
export {};
