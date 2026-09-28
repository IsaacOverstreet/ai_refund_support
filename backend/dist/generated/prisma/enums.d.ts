export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly SHIPPED: "SHIPPED";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const RefundStatus: {
    readonly APPROVED: "APPROVED";
    readonly DENIED: "DENIED";
    readonly ESCALATED: "ESCALATED";
};
export type RefundStatus = (typeof RefundStatus)[keyof typeof RefundStatus];
export declare const RefundReason: {
    readonly DAMAGED: "DAMAGED";
    readonly FAULTY: "FAULTY";
    readonly WRONG_ITEM: "WRONG_ITEM";
    readonly NOT_DELIVERED: "NOT_DELIVERED";
    readonly MISSING_ITEM: "MISSING_ITEM";
    readonly OTHER: "OTHER";
};
export type RefundReason = (typeof RefundReason)[keyof typeof RefundReason];
export declare const DecisionSource: {
    readonly POLICY: "POLICY";
    readonly AI: "AI";
    readonly HUMAN: "HUMAN";
};
export type DecisionSource = (typeof DecisionSource)[keyof typeof DecisionSource];
