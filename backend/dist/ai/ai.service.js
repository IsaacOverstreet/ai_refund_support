var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AiService_1;
import { Injectable, Logger } from "@nestjs/common";
import OpenAI from "openai";
import { REFUND_POLICY } from "../policy/refundPolicy.js";
import { PROMPT_INJECTION_PROMPT } from "./prompts/prompt-injection.prompt.js";
import { REFUND_INTENT_PROMPT } from "./prompts/refund-intent.prompt.js";
import { buildIdentifyProductPrompt } from "./prompts/identify-product.prompt.js";
import { buildRefundEvaluationPrompt } from "./prompts/refund-evaluation.prompt.js";
let AiService = AiService_1 = class AiService {
    logger = new Logger(AiService_1.name);
    openai;
    constructor() {
        const apiKey = process.env.DEEPSEEK_API_KEY;
        const baseURL = process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com";
        if (!apiKey) {
            throw new Error("DEEPSEEK_API_KEY is not set");
        }
        this.openai = new OpenAI({
            apiKey,
            baseURL,
        });
    }
    detectInjection(text) {
        const patterns = [
            /ignore .*instructions/i,
            /ignore .*rules/i,
            /disregard .*instructions/i,
            /disregard .*rules/i,
            /forget .*instructions/i,
            /forget .*rules/i,
            /override .*policy/i,
            /override .*rules/i,
            /bypass .*policy/i,
            /bypass .*rules/i,
            /you are now/i,
            /you are no longer/i,
            /act as (a|an) (admin|developer|manager)/i,
            /pretend (you are|to be)/i,
            /system prompt/i,
            /developer instructions/i,
            /engine or code/i,
            /internal instructions/i,
            /always (approve|refund)/i,
            /approve .*refund/i,
            /give me .*refund/i,
            /jailbreak/i,
            /without restriction/i,
        ];
        for (const pattern of patterns) {
            if (pattern.test(text)) {
                return {
                    suspicious: true,
                    matched: pattern.source,
                };
            }
        }
        return {
            suspicious: false,
        };
    }
    async checkRefundIntent(customerMessage) {
        const systemPrompt = REFUND_INTENT_PROMPT;
        try {
            const completion = await this.openai.chat.completions.create({
                model: process.env.DEEPSEEK_AI_MODEL ?? "deepseek-flash",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },
                    {
                        role: "user",
                        content: customerMessage,
                    },
                ],
                response_format: {
                    type: "json_object",
                },
                temperature: 0,
            });
            const content = completion.choices[0].message.content;
            if (!content) {
                throw new Error("AI returned an empty refund intent response.");
            }
            const result = JSON.parse(content);
            if (typeof result.hasRefundIntent !== "boolean" ||
                typeof result.reasoning !== "string") {
                throw new Error("AI returned an invalid refund intent response.");
            }
            return result;
        }
        catch (error) {
            this.logger.error("AI refund intent check failed", error);
            return {
                hasRefundIntent: false,
                reasoning: "Refund intent could not be determined safely.",
            };
        }
    }
    async checkPromptInjection(customerMessage) {
        const systemPrompt = PROMPT_INJECTION_PROMPT;
        try {
            const completion = await this.openai.chat.completions.create({
                model: process.env.DEEPSEEK_AI_MODEL ?? "deepseek-flash",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },
                    {
                        role: "user",
                        content: customerMessage,
                    },
                ],
                response_format: {
                    type: "json_object",
                },
                temperature: 0,
            });
            const content = completion.choices[0].message.content;
            if (!content) {
                throw new Error("AI returned an empty prompt injection response.");
            }
            const result = JSON.parse(content);
            if (typeof result.suspicious !== "boolean" ||
                typeof result.reasoning !== "string") {
                throw new Error("AI returned an invalid prompt injection response.");
            }
            return result;
        }
        catch (error) {
            this.logger.error("AI prompt injection check failed", error);
            return {
                suspicious: true,
                reasoning: "The prompt injection check could not be completed safely.",
            };
        }
    }
    async identifyProduct(args) {
        const { customerMessage, conversationHistory, order } = args;
        const systemPrompt = buildIdentifyProductPrompt({
            orderNumber: order.orderNumber,
            items: order.items,
        });
        console.log("🚀 ~ AiService ~ systemPrompt:", systemPrompt);
        try {
            const completion = await this.openai.chat.completions.create({
                model: process.env.DEEPSEEK_AI_MODEL ?? "deepseek-flash",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },
                    ...conversationHistory.slice(-6),
                    {
                        role: "user",
                        content: customerMessage,
                    },
                ],
                response_format: {
                    type: "json_object",
                },
                temperature: 0,
            });
            const content = completion.choices[0].message.content;
            if (!content) {
                throw new Error("AI returned an empty product identification response.");
            }
            const result = JSON.parse(content);
            console.log("🚀 ~ AiService ~ result:", result);
            if (result.productName !== null &&
                !order.items.some((item) => item.productName.toLowerCase() ===
                    result.productName.toLowerCase())) {
                return {
                    productName: null,
                };
            }
            return {
                productName: result.productName ?? null,
            };
        }
        catch (error) {
            this.logger.error("AI product identification failed", error);
            return {
                productName: null,
            };
        }
    }
    async evaluate(args) {
        const { customerMessage, conversationHistory, refundAmount, productName, order, policyChecks, requiresEscalation, hardFail, injectionSuspected, } = args;
        if (hardFail) {
            const failedCheck = policyChecks.find((check) => !check.passed && check.severity === "hard");
            return {
                decision: "denied",
                productName,
                reasoning: failedCheck?.reason ??
                    "Refund request does not meet policy requirements.",
                reply: `I'm sorry, but ${productName} doesn't qualify for a refund. ` +
                    `${failedCheck?.reason ??
                        "The refund request does not meet our refund policy."} ` +
                    `If you believe this is a mistake, please contact our support team.`,
            };
        }
        if (injectionSuspected) {
            return {
                decision: "escalated",
                productName,
                reasoning: "Suspicious instructions were detected in the customer request.",
                reply: "Your refund request requires human review. " +
                    "A member of our support team will review it and follow up with you.",
            };
        }
        if (requiresEscalation) {
            return {
                decision: "escalated",
                productName,
                reasoning: `The requested refund of $${refundAmount.toFixed(2)} exceeds ` +
                    `$${REFUND_POLICY.maxAmountWithoutReview} and requires human review.`,
                reply: `Thank you for your request. Because this refund exceeds ` +
                    `$${REFUND_POLICY.maxAmountWithoutReview}, I've forwarded it ` +
                    `to our support team for manual review.`,
            };
        }
        const systemPrompt = buildRefundEvaluationPrompt({
            productName,
            refundAmount,
            order,
            policyChecks,
        });
        try {
            const completion = await this.openai.chat.completions.create({
                model: process.env.DEEPSEEK_AI_MODEL ?? "deepseek-flash",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },
                    ...conversationHistory.slice(-6),
                    {
                        role: "user",
                        content: customerMessage,
                    },
                ],
                response_format: {
                    type: "json_object",
                },
                temperature: 0.2,
            });
            const content = completion.choices[0].message.content;
            if (!content) {
                throw new Error("AI returned an empty refund evaluation response.");
            }
            const result = JSON.parse(content);
            if (result.decision !== "approved" &&
                result.decision !== "denied" &&
                result.decision !== "escalated") {
                throw new Error("AI returned an invalid refund decision.");
            }
            result.productName = productName;
            return result;
        }
        catch (error) {
            this.logger.error("AI refund evaluation failed", error);
            return {
                decision: "escalated",
                productName,
                reasoning: "The refund request could not be safely evaluated automatically.",
                reply: "We could not complete the automatic review of your refund request. " +
                    "A member of our support team will review it and follow up with you.",
            };
        }
    }
};
AiService = AiService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], AiService);
export { AiService };
//# sourceMappingURL=ai.service.js.map