type ConversationMessage = {
  role: "customer" | "ai" | "system";
  content: string;
};

type ConversationLogProps = {
  conversation: ConversationMessage[];
};

export default function ConversationLog({
  conversation,
}: ConversationLogProps) {
  if (conversation.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
        Conversation Log
      </h4>

      <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3 max-h-64 overflow-y-auto">
        {conversation.map((message, index) => (
          <div key={index} className="text-sm">
            <span
              className={`font-semibold ${
                message.role === "customer"
                  ? "text-teal-600"
                  : message.role === "ai"
                    ? "text-slate-600"
                    : "text-slate-400"
              }`}
            >
              {message.role === "customer"
                ? "Customer"
                : message.role === "ai"
                  ? "AI"
                  : "System"}
              :
            </span>

            <span className="text-slate-600 ml-1.5">{message.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
