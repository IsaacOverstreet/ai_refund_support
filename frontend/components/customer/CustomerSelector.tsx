import { User } from "lucide-react";

import { Customer } from "./customer.types";

type CustomerSelectorProps = {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;

  onCustomerChange: (customerId: string) => void;
};

export default function CustomerSelector({
  customers,
  selectedCustomer,
  loading,
  error,
  onCustomerChange,
}: CustomerSelectorProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        <User className="w-5 h-5 text-gray-600" />

        <h2 className="text-lg font-bold text-gray-900">Customers</h2>
      </div>

      <select
        value={selectedCustomer?.id ?? ""}
        onChange={(event) => onCustomerChange(event.target.value)}
        disabled={loading}
        className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm bg-white focus:outline-none focus:border-[#0071dc]"
      >
        <option value="" disabled>
          {loading ? "Loading customers..." : "Select a customer"}
        </option>

        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {selectedCustomer && (
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <p className="font-semibold text-gray-900">{selectedCustomer.name}</p>

          <p className="text-sm text-gray-500 mt-1">{selectedCustomer.email}</p>
        </div>
      )}
    </>
  );
}
