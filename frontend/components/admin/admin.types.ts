export type StatusFilter =
  | "all"
  | "pending"
  | "approved"
  | "denied"
  | "escalated";

export type BackendMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
};

export type BackendCustomer = {
  id: string;
  name: string;
  email: string;
};

export type BackendProduct = {
  id: string;
  name: string;
};

export type BackendOrderItem = {
  id: string;
  quantity: number;
  unitPrice: number | string;
  isFinalSale: boolean;
  product: BackendProduct;
};

export type BackendOrder = {
  id: string;
  orderNumber: string;
  totalAmount: number | string;
  orderedAt: string;
  status: string;
  items: BackendOrderItem[];
};

export type BackendDecision = {
  id: string;
  status: "APPROVED" | "DENIED" | "ESCALATED";
  source: "POLICY" | "AI" | "HUMAN";
  reason: string;
  confidence: number | null;
  createdAt: string;
};

export type BackendAuditLog = {
  id: string;
  action: string;
  details: unknown;
  createdAt: string;
};

export type BackendRefundRequest = {
  id: string;
  customerId: string;
  orderId: string;
  reason: string;
  description: string;
  amount: number | string;
  createdAt: string;
  updatedAt: string;

  customer: BackendCustomer;
  order: BackendOrder;

  decision: BackendDecision | null;

  chatMessages: BackendMessage[];

  auditLogs: BackendAuditLog[];
};

export type AdminRequest = {
  id: string;

  status: "pending" | "approved" | "denied" | "escalated";

  customerName: string;
  customerEmail: string;

  orderId: string;
  orderNumber: string;
  orderAmount: number;

  reason: string;
  description: string;

  confidence: number | null;
  decision: string | null;
  decisionSource: string | null;
  reasoning: string | null;

  createdAt: string;

  conversation: {
    role: "customer" | "ai" | "system";
    content: string;
  }[];
};
