export const REFUND_POLICY = {
  maxDaysForRefund: 30,
  maxAmountWithoutReview: 500,

  rules: [
    "Final sale items are not eligible for refunds.",
    "Orders older than 30 days cannot be refunded.",
    "Refunds above $500 require human review.",
    "Damaged or incorrect items may qualify for a refund after the item is returned and verified.",
    "Suspicious or conflicting requests should be escalated.",
  ],
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

export function evaluatePolicy(input: RefundPolicyInput): PolicyEvaluation {
  const checks: PolicyCheck[] = [];

  // 1. Refund amount
  const refundAmountIsValid =
    input.refundAmount > 0 && input.refundAmount <= input.itemAmount;

  checks.push({
    rule: "refund_amount",
    passed: refundAmountIsValid,
    reason: refundAmountIsValid
      ? "Refund amount is valid."
      : "Refund must be greater than $0 and cannot exceed the item's value.",
    severity: "hard",
  });

  // 2. Final sale
  const isEligibleForRefund = !input.isFinalSale;

  checks.push({
    rule: "final_sale",
    passed: isEligibleForRefund,
    reason: isEligibleForRefund
      ? "Item is eligible for a refund."
      : "Item is marked as final sale and is not eligible for a refund.",
    severity: "hard",
  });

  // 3. Refund window
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const orderAgeInDays = Math.floor(
    (Date.now() - input.orderedAt.getTime()) / MS_PER_DAY,
  );

  const isWithinRefundWindow =
    orderAgeInDays >= 0 && orderAgeInDays <= REFUND_POLICY.maxDaysForRefund;

  checks.push({
    rule: "age_limit",
    passed: isWithinRefundWindow,
    reason: isWithinRefundWindow
      ? `Order is within the ${REFUND_POLICY.maxDaysForRefund}-day refund window.`
      : "Order is outside the allowed refund window.",
    severity: "hard",
  });

  // 4. Automatic approval limit
  const requiresEscalation =
    input.refundAmount > REFUND_POLICY.maxAmountWithoutReview;

  checks.push({
    rule: "human_review_limit",
    passed: !requiresEscalation,
    reason: requiresEscalation
      ? `Refund exceeds $${REFUND_POLICY.maxAmountWithoutReview} and requires human review.`
      : "Refund is within the automatic approval limit.",
    severity: "soft",
  });

  // A hard policy failure means the refund cannot be approved automatically.
  const hardFail = checks.some(
    (check) => check.severity === "hard" && !check.passed,
  );

  return {
    checks,
    hardFail,
    requiresEscalation,
  };
}
