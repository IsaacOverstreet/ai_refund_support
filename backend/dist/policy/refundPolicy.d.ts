export declare const REFUND_POLICY: {
    maxDaysForRefund: number;
    maxAmountWithoutReview: number;
    rules: string[];
};
export type PolicyCheck = {
    rule: string;
    passed: boolean;
    reason: string;
    severity: "hard" | "soft";
};
export type PolicyEvaluation = {
    checks: PolicyCheck[];
    hardFail: boolean;
    requiresEscalation: boolean;
};
type RefundPolicyInput = {
    refundAmount: number;
    itemAmount: number;
    orderedAt: Date;
    isFinalSale: boolean;
};
export declare function evaluatePolicy(input: RefundPolicyInput): PolicyEvaluation;
export {};
