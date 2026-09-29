import { ChevronDown, ChevronRight } from "lucide-react";

import RequestDetails from "./RequestDetails";
import { STATUS_CONFIG } from "./admin.constant";
import { AdminRequest } from "./admin.types";

type RequestRowProps = {
  request: AdminRequest;
  expanded: boolean;
  onToggle: () => void;
};

export default function RequestRow({
  request,
  expanded,
  onToggle,
}: RequestRowProps) {
  const config = STATUS_CONFIG[request.status] ?? STATUS_CONFIG.pending;

  const StatusIcon = config.icon;

  return (
    <div className="bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        {/* Status icon */}
        <div
          className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full ${config.bg} ${config.color}`}
        >
          <StatusIcon className="w-4 h-4" />
        </div>

        {/* Request information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-slate-900 truncate">
              {request.customerName}
            </span>

            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
            >
              {config.label}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-0.5 truncate">
            Order {request.orderNumber} · ${request.orderAmount.toFixed(2)} ·{" "}
            {new Date(request.createdAt).toLocaleString()}
          </p>

          <p className="text-sm text-slate-600 mt-1 line-clamp-1">
            {request.description}
          </p>
        </div>

        {/* Expand icon */}
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-2" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-2" />
        )}
      </button>

      {expanded && <RequestDetails request={request} />}
    </div>
  );
}
