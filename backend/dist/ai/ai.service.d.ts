import { PolicyCheck } from "../policy/refund-policy.js";
type ConversationMessage = {
    role: "user" | "assistant";
    content: string;
};
type AiDecision = {
    decision: "approved" | "denied" | "escalated";
    reasoning: string;
    reply: string;
};
export declare class AiService {
    private readonly logger;
    private readonly openai;
    constructor();
    detectInjection(text: string): {
        suspicious: boolean;
        matched?: string;
    };
    evaluate(args: {
        customerMessage: string;
        conversationHistory: ConversationMessage[];
        refundAmount: number;
        order: {
            orderNumber: string;
            totalAmount: number;
            orderedAt: Date;
            items: {
                productName: string;
                quantity: number;
                isFinalSale: boolean;
            }[];
        };
        policyChecks: PolicyCheck[];
        requiresEscalation: boolean;
        hardFail: boolean;
        injectionSuspected: boolean;
    }): Promise<AiDecision>;
}
export {};
