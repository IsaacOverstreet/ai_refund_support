import { Injectable, Logger } from "@nestjs/common";
import OpenAI from "openai";
import { REFUND_POLICY, PolicyCheck } from "../policy/refundPolicy.js";
import { PROMPT_INJECTION_PROMPT } from "./prompts/prompt-injection.prompt.js";
import { REFUND_INTENT_PROMPT } from "./prompts/refund-intent.prompt.js";
import { buildIdentifyProductPrompt } from "./prompts/identify-product.prompt.js";
import { buildRefundEvaluationPrompt } from "./prompts/refund-evaluation.prompt.js";

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

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly openai: OpenAI;

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

  // Check for common prompt injection phrases.
  detectInjection(text: string): {
    suspicious: boolean;
    matched?: string;
  } {
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

  async checkRefundIntent(
    customerMessage: string,
  ): Promise<RefundIntentResult> {
    // Check whether the current message contains a refund-related request.
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

      // Get the AI response.
      const content = completion.choices[0].message.content;

      if (!content) {
        throw new Error("AI returned an empty refund intent response.");
      }

      // Convert the JSON response into an object.
      const result = JSON.parse(content) as RefundIntentResult;

      // Make sure the AI returned the expected fields.
      if (
        typeof result.hasRefundIntent !== "boolean" ||
        typeof result.reasoning !== "string"
      ) {
        throw new Error("AI returned an invalid refund intent response.");
      }

      return result;
    } catch (error) {
      this.logger.error("AI refund intent check failed", error);

      // Fail safely if the intent check cannot be completed.
      return {
        hasRefundIntent: false,
        reasoning: "Refund intent could not be determined safely.",
      };
    }
  }

  async checkPromptInjection(
    customerMessage: string,
  ): Promise<InjectionCheckResult> {
    // Use the AI to check the message for prompt injection.
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

      // Get the AI response.
      const content = completion.choices[0].message.content;

      if (!content) {
        throw new Error("AI returned an empty prompt injection response.");
      }

      // Convert the JSON response into an object.
      const result = JSON.parse(content) as InjectionCheckResult;

      // Make sure the AI returned the expected fields.
      if (
        typeof result.suspicious !== "boolean" ||
        typeof result.reasoning !== "string"
      ) {
        throw new Error("AI returned an invalid prompt injection response.");
      }

      return result;
    } catch (error) {
      this.logger.error("AI prompt injection check failed", error);

      // Escalate if the security check fails.
      return {
        suspicious: true,
        reasoning: "The prompt injection check could not be completed safely.",
      };
    }
  }

  async identifyProduct(args: {
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
  }): Promise<IdentifyProductResult> {
    const { customerMessage, conversationHistory, order } = args;

    // Build the prompt using the customer's actual order items.
    const systemPrompt = buildIdentifyProductPrompt({
      orderNumber: order.orderNumber,
      items: order.items,
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

        temperature: 0,
      });

      // Get the AI response.
      const content = completion.choices[0].message.content;

      if (!content) {
        throw new Error(
          "AI returned an empty product identification response.",
        );
      }

      // Convert the JSON response into an object.
      const result = JSON.parse(content) as IdentifyProductResult;

      // Make sure the AI only returns a product from the order.
      if (
        result.productName !== null &&
        !order.items.some(
          (item) =>
            item.productName.toLowerCase() ===
            result.productName!.toLowerCase(),
        )
      ) {
        return {
          productName: null,
        };
      }

      return {
        productName: result.productName ?? null,
      };
    } catch (error) {
      this.logger.error("AI product identification failed", error);

      // Return null if the product cannot be identified safely.
      return {
        productName: null,
      };
    }
  }

  async evaluate(args: {
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
  }): Promise<AiDecision> {
    const {
      customerMessage,
      conversationHistory,
      refundAmount,
      productName,
      order,
      policyChecks,
      requiresEscalation,
      hardFail,
      injectionSuspected,
    } = args;

    // Handle policy failures before calling the AI.
    if (hardFail) {
      const failedCheck = policyChecks.find(
        (check) => !check.passed && check.severity === "hard",
      );

      return {
        decision: "denied",
        productName,

        reasoning:
          failedCheck?.reason ??
          "Refund request does not meet policy requirements.",

        reply:
          `I'm sorry, but ${productName} doesn't qualify for a refund. ` +
          `${
            failedCheck?.reason ??
            "The refund request does not meet our refund policy."
          } ` +
          `If you believe this is a mistake, please contact our support team.`,
      };
    }

    // Escalate if a prompt injection was detected.
    if (injectionSuspected) {
      return {
        decision: "escalated",
        productName,

        reasoning:
          "Suspicious instructions were detected in the customer request.",

        reply:
          "Your refund request requires human review. " +
          "A member of our support team will review it and follow up with you.",
      };
    }

    // Escalate refunds above the automatic approval limit.
    if (requiresEscalation) {
      return {
        decision: "escalated",
        productName,

        reasoning:
          `The requested refund of $${refundAmount.toFixed(2)} exceeds ` +
          `$${REFUND_POLICY.maxAmountWithoutReview} and requires human review.`,

        reply:
          `Thank you for your request. Because this refund exceeds ` +
          `$${REFUND_POLICY.maxAmountWithoutReview}, I've forwarded it ` +
          `to our support team for manual review.`,
      };
    }

    // Build the prompt with the backend-verified refund information.
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

      // Get the AI response.
      const content = completion.choices[0].message.content;

      if (!content) {
        throw new Error("AI returned an empty refund evaluation response.");
      }

      // Convert the JSON response into an object.
      const result = JSON.parse(content) as AiDecision;

      // Make sure the AI returned a valid decision.
      if (
        result.decision !== "approved" &&
        result.decision !== "denied" &&
        result.decision !== "escalated"
      ) {
        throw new Error("AI returned an invalid refund decision.");
      }

      // Keep the product name from the backend.
      result.productName = productName;

      return result;
    } catch (error) {
      this.logger.error("AI refund evaluation failed", error);

      // Escalate if the AI evaluation fails.
      return {
        decision: "escalated",
        productName,

        reasoning:
          "The refund request could not be safely evaluated automatically.",

        reply:
          "We could not complete the automatic review of your refund request. " +
          "A member of our support team will review it and follow up with you.",
      };
    }
  }
}
