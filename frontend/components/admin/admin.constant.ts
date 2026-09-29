import { CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react";

export const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-slate-500",
    bg: "bg-slate-100",
    text: "text-slate-700",
  },

  approved: {
    label: "Approved",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },

  denied: {
    label: "Denied",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50",
    text: "text-red-700",
  },

  escalated: {
    label: "Escalated",
    icon: AlertCircle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
};
