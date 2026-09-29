// import type {
//   RefundRequest,
//   DecisionResponse,
//   ConversationMessage,
// } from "./types";

// // const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/refund-decision`;

// // export async function submitRefund(data: {
// //   customer_name: string;
// //   customer_email: string;
// //   order_id: string;
// //   order_amount: number;
// //   reason: string;
// //   conversation: ConversationMessage[];
// // }): Promise<DecisionResponse> {
// //   const headers: Record<string, string> = {
// //     "Content-Type": "application/json",
// //   };
// //   const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// //   if (anonKey) {
// //     headers["Authorization"] = `Bearer ${anonKey}`;
// //   }

// //   const response = await fetch(functionUrl, {
// //     method: "POST",
// //     headers,
// //     body: JSON.stringify(data),
// //   });

// //   if (!response.ok) {
// //     const errorBody = await response.json().catch(() => ({}));
// //     throw new Error(errorBody.error || `Request failed (${response.status})`);
// //   }

// //   const result = await response.json();
// //   if (!result.request_id || !result.decision) {
// //     throw new Error("Unexpected response from the decision service");
// //   }
// //   return result as DecisionResponse;
// // }

// // export async function fetchRefundRequests(): Promise<RefundRequest[]> {
// //   const { data, error } = await supabase
// //     .from("refund_requests")
// //     .select("*")
// //     .order("created_at", { ascending: false });

// //   if (error) throw error;
// //   return (data ?? []) as RefundRequest[];
// // }

// // export async function updateRefundStatus(
// //   id: string,
// //   status: RefundRequest["status"],
// //   reasoning: string,
// // ): Promise<void> {
// //   const { error } = await supabase
// //     .from("refund_requests")
// //     .update({ status, reasoning, updated_at: new Date().toISOString() })
// //     .eq("id", id);

// //   if (error) throw error;
// // }
