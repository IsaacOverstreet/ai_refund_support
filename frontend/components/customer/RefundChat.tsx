import { Send } from "lucide-react";

import { Message, Order } from "./customer.types";

type RefundChatProps = {
  order: Order;
  messages: Message[];
  message: string;
  sending: boolean;
  sessionId: string | null;
  error: string | null;
  chatEnded: boolean;

  onMessageChange: (value: string) => void;

  onSend: () => void;
};

export default function RefundChat({
  order,
  messages,
  message,
  sending,
  sessionId,
  error,
  chatEnded,
  onMessageChange,
  onSend,
}: RefundChatProps) {
  return (
    <div className="mt-8 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Refund Support</h2>

            <p className="text-sm text-slate-500 mt-1">
              Chat with our AI support assistant about your order.
            </p>
          </div>

          <div className="hidden sm:block text-right">
            {order.items.map((item) => (
              <p key={item.id} className="text-sm font-semibold text-slate-900">
                {item.product.name}
              </p>
            ))}

            <p className="text-xs text-slate-500">Order #{order.orderNumber}</p>
          </div>
        </div>
      </div>

      {/* Order Information */}
      <div className="px-5 py-4 border-b border-slate-200">
        <div className="bg-slate-50 rounded-xl p-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 mb-3 last:mb-0"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.product.name}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-medium text-slate-900">
                ${(Number(item.unitPrice) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          {/* Order Summary */}
          <div className="border-t border-slate-200 mt-4 pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">
                Order #{order.orderNumber}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Ordered {new Date(order.orderedAt).toLocaleDateString()}
              </p>
            </div>

            <p className="font-bold text-slate-900">
              ${Number(order.totalAmount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-105 overflow-y-auto p-5 space-y-4 bg-white">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <h3 className="font-semibold text-slate-900">How can we help?</h3>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-teal-600 text-white rounded-br-md"
                    : "bg-slate-100 text-slate-800 rounded-bl-md"
                }`}
              >
                {msg.role === "assistant" && (
                  <p className="text-xs font-semibold text-teal-700 mb-1">
                    AI Support
                  </p>
                )}

                <p className="leading-relaxed whitespace-pre-line">
                  {msg.content}
                </p>
              </div>
            </div>
          ))
        )}

        {/* AI typing indicator */}
        {sending && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-bl-md px-4 py-3">
              <p className="text-xs font-semibold text-teal-700 mb-2">
                AI Support
              </p>

              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />

                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />

                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-slate-200 p-4 bg-slate-50">
        {chatEnded ? (
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              This chat has ended.
            </p>
          </div>
        ) : (
          <>
            {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

            <div className="flex items-end gap-3">
              <textarea
                value={message}
                onChange={(event) => onMessageChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    onSend();
                  }
                }}
                placeholder="Tell us what happened with your order..."
                rows={2}
                disabled={sending || !sessionId}
                className="flex-1 resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />

              <button
                type="button"
                onClick={onSend}
                disabled={!message.trim() || !sessionId || sending}
                className="h-11 w-11 shrink-0 rounded-xl bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Press Enter to send · Shift + Enter for a new line
            </p>
          </>
        )}
      </div>
    </div>
  );
}
