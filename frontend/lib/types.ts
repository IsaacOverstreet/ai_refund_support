export interface ConversationMessage {
  role: "customer" | "ai" | "system";
  content: string;
  timestamp: string;
}

export interface RefundRequest {
  id: string;
  customer_name: string;
  customer_email: string;
  order_id: string;
  order_amount: number;
  reason: string;
  status: "pending" | "approved" | "denied" | "escalated";
  decision: string | null;
  confidence: number | null;
  reasoning: string | null;
  conversation: ConversationMessage[];
  created_at: string;
  updated_at: string;
}

export interface DecisionResponse {
  request_id: string;
  decision: "approved" | "denied" | "escalated";
  confidence: number;
  reasoning: string;
  summary: string;
  status: string;
}
