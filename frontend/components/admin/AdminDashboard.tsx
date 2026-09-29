"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  Inbox,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";

import StatCard from "./StatsCard";
import RequestRow from "./RequestRow";
import { formatRequest } from "./admin.utils";
import {
  AdminRequest,
  BackendRefundRequest,
  StatusFilter,
} from "./admin.types";

const API_URL = "http://localhost:3001/api";

export default function AdminDashboard() {
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<StatusFilter>("all");

  const [search, setSearch] = useState("");

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<BackendRefundRequest[]>(
        `${API_URL}/admin/requests`,
      );

      setRequests(response.data.map(formatRequest));
    } catch (error) {
      console.error("Failed to load refund requests:", error);

      setError("Failed to load refund requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      await load();
    };

    fetchRequests();
  }, []);

  async function handleAction(
    id: string,
    status: "APPROVED" | "DENIED" | "ESCALATED",
    note: string,
  ) {
    try {
      setActionLoading(id);
      setError(null);

      await axios.patch(`${API_URL}/admin/requests/${id}/decision`, {
        status,
        note,
      });

      await load();
    } catch (error) {
      console.error("Failed to update request:", error);

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Failed to update refund request.",
        );
      } else {
        setError("Failed to update refund request.");
      }
    } finally {
      setActionLoading(null);
    }
  }

  const filtered = requests.filter((request) => {
    if (filter !== "all" && request.status !== filter) {
      return false;
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      return (
        request.customerName.toLowerCase().includes(query) ||
        request.orderNumber.toLowerCase().includes(query) ||
        request.reason.toLowerCase().includes(query) ||
        request.description.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const stats = {
    total: requests.length,

    approved: requests.filter((request) => request.status === "approved")
      .length,

    denied: requests.filter((request) => request.status === "denied").length,

    escalated: requests.filter((request) => request.status === "escalated")
      .length,

    pending: requests.filter((request) => request.status === "pending").length,
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600">
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Support Dashboard
            </h2>

            <p className="text-xs text-slate-500">
              Refund requests & AI decision logs
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 px-6 py-4 bg-slate-50 border-b border-slate-200">
        <StatCard
          label="Total"
          value={stats.total}
          color="text-slate-900"
          bg="bg-white"
        />

        <StatCard
          label="Approved"
          value={stats.approved}
          color="text-emerald-600"
          bg="bg-white"
        />

        <StatCard
          label="Denied"
          value={stats.denied}
          color="text-red-600"
          bg="bg-white"
        />

        <StatCard
          label="Escalated"
          value={stats.escalated}
          color="text-amber-600"
          bg="bg-white"
        />

        <StatCard
          label="Pending"
          value={stats.pending}
          color="text-slate-600"
          bg="bg-white"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-6 py-3 bg-white border-b border-slate-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, order ID, or reason..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-1.5">
          {(
            [
              "all",
              "pending",
              "approved",
              "denied",
              "escalated",
            ] as StatusFilter[]
          ).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                filter === status
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Request list */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {loading ? (
          <div className="flex items-center justify-center h-full text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mb-2" />

            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={load}
              className="mt-3 text-sm text-teal-600 font-medium hover:underline"
            >
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Inbox className="w-10 h-10 mb-2" />

            <p className="text-sm">No refund requests found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filtered.map((request) => (
              <RequestRow
                key={request.id}
                request={request}
                expanded={expandedId === request.id}
                onToggle={() =>
                  setExpandedId(expandedId === request.id ? null : request.id)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
