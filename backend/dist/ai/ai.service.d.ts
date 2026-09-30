import { PolicyCheck } from "../policy/refundPolicy.js";
type ConversationMessage = {
    role: "user" | "assistant";
    content: string;
};
type IdentifyProductResult = {
    productName: string | null;
};
type InjectionCheckResult = {
    suspicious: boolean;
    reasoning: string;
};
type RefundIntentResult = {
    hasRefundIntent: boolean;
    reasoning: string;
};
export type AiDecision = {
    decision: "approved" | "denied" | "escalated";
    reasoning: string;
    reply: string;
    productName: string | null;
};
export declare class AiService {
    private readonly logger;
    private readonly openai;
    constructor();
    detectInjection(text: string): {
        suspicious: boolean;
        matched?: string;
    };
    checkRefundIntent(customerMessage: string): Promise<RefundIntentResult>;
    checkPromptInjection(customerMessage: string): Promise<InjectionCheckResult>;
    identifyProduct(args: {
        customerMessage: string;
        conversationHistory: ConversationMessage[];
        order: {
            orderNumber: string;
            items: {
                productName: string;
                quantity: number;
                isFinalSale: boolean;
            }[];
        };
    }): Promise<IdentifyProductResult>;
    evaluate(args: {
        customerMessage: string;
        conversationHistory: ConversationMessage[];
        refundAmount: number;
        productName: string;
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
