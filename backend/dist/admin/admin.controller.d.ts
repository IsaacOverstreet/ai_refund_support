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
    override(id: string, dto: OverrideDto): Promise<{
        id: string;
        refundRequestId: string;
        status: import("../generated/prisma/enums.js").RefundStatus;
        source: import("../generated/prisma/enums.js").DecisionSource;
        reason: string;
        confidence: number | null;
        createdAt: Date;
    }>;
}
export {};
