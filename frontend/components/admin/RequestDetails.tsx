import ConversationLog from "./ConversationLog";
import { AdminRequest } from "./admin.types";

type RequestDetailsProps = {
  request: AdminRequest;
};

export default function RequestDetails({ request }: RequestDetailsProps) {
  return (
    <div className="px-6 pb-5 space-y-4 bg-slate-50 border-t border-slate-100">
      {/* Customer */}
      <div className="pt-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Customer
        </h4>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-900">
            {request.customerName}
          </p>

          <p className="text-sm text-slate-500 mt-1">{request.customerEmail}</p>
        </div>
      </div>

      {/* Order */}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Order
        </h4>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Order #{request.orderNumber}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Request amount: ${request.orderAmount.toFixed(2)}
              </p>
            </div>

            <span className="text-sm font-bold text-slate-900">
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Refund request */}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Refund Request
        </h4>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Reason</p>

          <p className="text-sm font-medium text-slate-900 mt-1">
            {request.reason}
          </p>

          <p className="text-xs text-slate-500 uppercase mt-4">Description</p>

          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {request.description}
          </p>
        </div>
      </div>

      {/* AI Decision */}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          AI Decision
        </h4>

        <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-700">
              Outcome:{" "}
              <span className="font-semibold">
                {request.decision
                  ? request.decision.charAt(0).toUpperCase() +
                    request.decision.slice(1).toLowerCase()
                  : "Pending"}
              </span>
            </span>

            {request.confidence !== null && (
              <span className="text-sm font-bold text-slate-900">
                {(request.confidence * 100).toFixed(0)}% confidence
              </span>
            )}
          </div>

          {request.decisionSource && (
            <p className="text-xs text-slate-500">
              Decision source:{" "}
              <span className="font-semibold">{request.decisionSource}</span>
            </p>
          )}

          {request.reasoning && (
            <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {request.reasoning}
            </p>
          )}
        </div>
      </div>

      <ConversationLog conversation={request.conversation} />

      {/* Admin actions */}
      {request.status !== "approved" && request.status !== "denied" && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Admin Action
          </h4>
        </div>
      )}

      {/* Audit information */}
      <div className="text-xs text-slate-400 font-mono break-all">
        Request ID: {request.id}
      </div>
    </div>
  );
}
