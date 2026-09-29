import { AdminRequest, BackendRefundRequest } from "./admin.types";

export function formatRequest(request: BackendRefundRequest): AdminRequest {
  const status = request.decision?.status
    ? (request.decision.status.toLowerCase() as
        | "approved"
        | "denied"
        | "escalated")
    : "pending";

  return {
    id: request.id,

    status,

    customerName: request.customer.name,
    customerEmail: request.customer.email,

    orderId: request.order.id,
    orderNumber: request.order.orderNumber,
    orderAmount: Number(request.order.totalAmount),

    reason: request.reason,
    description: request.description,

    confidence: request.decision?.confidence ?? null,

    decision: request.decision?.status ?? null,

    decisionSource: request.decision?.source ?? null,

    reasoning: request.decision?.reason ?? null,

    createdAt: request.createdAt,

    conversation: request.chatMessages
      .slice()
      .reverse()
      .map((message) => ({
        role:
          message.role === "user"
            ? "customer"
            : message.role === "assistant"
              ? "ai"
              : "system",

        content: message.content,
      })),
  };
}
