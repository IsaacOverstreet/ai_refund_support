import { Box } from "lucide-react";

import { Order } from "./customer.types";

type OrdersListProps = {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;

  onOrderSelect: (order: Order) => void;
};

export default function OrdersList({
  orders,
  selectedOrder,
  loading,
  error,
  onOrderSelect,
}: OrdersListProps) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Box className="w-5 h-5 text-gray-600" />

        <h2 className="text-lg font-bold text-gray-900">Orders</h2>
      </div>

      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

      {loading ? (
        <p className="text-sm text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-gray-500">This customer has no orders.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const isSelected = selectedOrder?.id === order.id;

            return (
              <button
                key={order.id}
                type="button"
                onClick={() => onOrderSelect(order)}
                className={`w-full text-left border rounded-lg p-4 transition ${
                  isSelected
                    ? "border-[#0071dc] bg-[#f2f8fd]"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Order items */}
                  <div>
                    {order.items.map((item) => (
                      <div key={item.id} className="mb-3 last:mb-0">
                        <p className="font-semibold text-gray-900">
                          {item.product.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Unit price: ${Number(item.unitPrice).toFixed(2)}
                        </p>

                        {item.isFinalSale && (
                          <p className="text-xs text-red-500 mt-1">
                            Final sale
                          </p>
                        )}
                      </div>
                    ))}

                    <p className="text-xs text-gray-500 mt-2">
                      Order #{order.orderNumber}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Ordered {new Date(order.orderedAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Total + status */}
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900">
                      ${Number(order.totalAmount).toFixed(2)}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">{order.status}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
