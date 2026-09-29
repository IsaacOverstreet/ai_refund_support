export type Customer = {
  id: string;
  name: string;
  email: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export type Product = {
  id: string;
  name: string;
};

export type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: number | string;
  isFinalSale: boolean;
  product: Product;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerId: string;
  status: string;
  totalAmount: number | string;
  orderedAt: string;
  deliveredAt: string | null;
  items: OrderItem[];
};
