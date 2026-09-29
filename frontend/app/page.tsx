"use client";
import { useState } from "react";
import { RotateCcw, LayoutDashboard, MessageSquare } from "lucide-react";
import CustomerChat from "@/components/customer/CustomerChat";
import AdminDashboard from "@/components/admin/AdminDashboard";

type View = "customer" | "admin";

export default function Home() {
  const [view, setView] = useState<View>("customer");
  // const [loadingOrders, setLoadingOrders] = useState(false);

  // const [selectedCustomer, setSelectedCustomer] =
  //   React.useState<Customer | null>(null);

  // const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  // const [refundMessage, setRefundMessage] = React.useState("");

  // Get customers from the backend

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0F172A] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15">
              <RotateCcw className="h-5 w-5 text-indigo-400" />
            </div>

            <div>
              <span className="block text-sm font-semibold tracking-tight">
                Refund Support
              </span>

              <span className="hidden text-xs text-slate-400 sm:block">
                AI-powered support
              </span>
            </div>
          </div>

          {/* View Switcher */}
          <nav className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setView("customer")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all sm:px-4 ${
                view === "customer"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Customer</span>
            </button>

            <button
              type="button"
              onClick={() => setView("admin")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all sm:px-4 ${
                view === "admin"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Admin</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-slate-400">Refund Support</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="min-h-[calc(100vh-150px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
            <div className="w-full p-4 sm:p-6 lg:p-8">
              {view === "customer" ? <CustomerChat /> : <AdminDashboard />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
