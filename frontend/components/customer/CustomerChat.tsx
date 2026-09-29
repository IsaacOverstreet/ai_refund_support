"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import axios from "axios";

import CustomerSelector from "./CustomerSelector";
import OrdersList from "./OrdersList";
import RefundChat from "./RefundChat";

import { Customer, Message, Order } from "./customer.types";

const API_URL = "http://localhost:3001/api";

export default function CustomerChat() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  const [showCustomers, setShowCustomers] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [message, setMessage] = useState("");

  const [sessionId, setSessionId] = useState<string | null>(null);

  const [sending, setSending] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);

  const [customerError, setCustomerError] = useState<string | null>(null);

  const [orderError, setOrderError] = useState<string | null>(null);

  const [chatError, setChatError] = useState<string | null>(null);

  // Load customers
  useEffect(() => {
    const getCustomers = async () => {
      try {
        setLoading(true);
        setCustomerError(null);

        const response = await axios.get<Customer[]>(`${API_URL}/customers`);

        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to load customers:", error);

        setCustomerError("Unable to load customers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, []);

  // Load orders for selected customer
  const getCustomerOrders = async (customerId: string) => {
    try {
      setLoading(true);
      setOrderError(null);
      setMessages([]);

      const response = await axios.get<{
        orders: Order[];
      }>(`${API_URL}/customers/${customerId}/orders`);

      setOrders(response.data.orders);
    } catch (error) {
      console.error("Failed to load customer orders:", error);

      setOrders([]);

      setOrderError("Unable to load this customer's orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Select customer
  const handleCustomerChange = async (customerId: string) => {
    const customer = customers.find((item) => item.id === customerId);

    if (!customer) {
      return;
    }

    setSelectedCustomer(customer);

    // Reset order and chat
    setSelectedOrder(null);
    setOrders([]);
    setMessages([]);
    setMessage("");
    setSessionId(null);

    setOrderError(null);
    setChatError(null);

    await getCustomerOrders(customerId);
  };

  // Start refund session for selected order
  const handleOrderSelect = async (order: Order) => {
    try {
      setChatError(null);
      setChatEnded(false);

      setSelectedOrder(order);

      setMessages([]);
      setMessage("");
      setSessionId(null);

      const response = await axios.post(
        `${API_URL}/sessions/start/${order.id}`,
      );

      setSessionId(response.data.sessionId);
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Failed to start refund session:", error);

      setChatError("Unable to start the refund session. Please try again.");

      setSelectedOrder(null);
    }
  };

  // Send chat message
  const handleSendMessage = async () => {
    if (!message.trim() || !sessionId || sending) {
      return;
    }

    const userMessage = message.trim();

    setMessage("");
    setSending(true);
    setChatError(null);

    const temporaryMessage: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      content: userMessage,
    };

    setMessages((previous) => [...previous, temporaryMessage]);

    try {
      const response = await axios.post(
        `${API_URL}/sessions/${sessionId}/message`,
        {
          message: userMessage,
        },
      );

      setMessages((previous) => [...previous, response.data.message]);
      if (response.data.decision) {
        setChatEnded(true);
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      setChatError("We couldn't process your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 shrink-0">
          <h2 className="text-xl font-bold mb-4">Refund Support</h2>

          <button
            type="button"
            onClick={() => setShowCustomers(!showCustomers)}
            className={`w-full flex items-center justify-between py-4 px-3 border-t border-gray-200 transition ${
              showCustomers ? "bg-gray-50" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />

              <span className="font-semibold text-gray-800">Customers</span>
            </div>

            {showCustomers ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </aside>

        {/* Main Content */}
        <section className="w-full lg:w-3/4">
          {/* Return Policy */}
          <div className="bg-[#e6f1fc] p-6 rounded-lg mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Return Policy</h1>

            <p className="text-sm text-gray-600 mt-2">
              Please review our refund policy before submitting a request.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-gray-700">
              <li>• Final sale items are not eligible for a refund.</li>

              <li>
                • Orders older than 30 days are not eligible for a refund.
              </li>

              <li>• Refunds above $500 require human review.</li>

              <li>• Damaged or incorrect items may qualify for a refund.</li>

              <li>
                • Items that require a return must be received and verified
                before the refund is released.
              </li>

              <li>• Suspicious or conflicting requests may be escalated.</li>
            </ul>
          </div>

          {/* Customers */}
          {showCustomers && (
            <div className="border border-gray-200 rounded-lg p-6">
              <CustomerSelector
                customers={customers}
                selectedCustomer={selectedCustomer}
                loading={loading}
                error={customerError}
                onCustomerChange={handleCustomerChange}
              />

              {selectedCustomer && (
                <OrdersList
                  orders={orders}
                  selectedOrder={selectedOrder}
                  loading={loading}
                  error={orderError}
                  onOrderSelect={handleOrderSelect}
                />
              )}

              {selectedOrder && (
                <RefundChat
                  order={selectedOrder}
                  messages={messages}
                  message={message}
                  sending={sending}
                  sessionId={sessionId}
                  error={chatError}
                  onMessageChange={setMessage}
                  onSend={handleSendMessage}
                  chatEnded={chatEnded}
                />
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
