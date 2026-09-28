import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const productCatalog = [
  { name: "Wireless Headphones", sku: "WH-001", price: 199.99 },
  { name: "Running Shoes", sku: "RS-002", price: 129.5 },
  { name: "Coffee Maker", sku: "CM-003", price: 89.0 },
  { name: "Gaming Mouse", sku: "GM-004", price: 59.99 },
  { name: "Yoga Mat", sku: "YM-005", price: 39.0 },
  { name: "Desk Lamp", sku: "DL-006", price: 45.0 },
  { name: "Backpack", sku: "BP-007", price: 79.99 },
  { name: "Smart Watch", sku: "SW-008", price: 299.0 },
  { name: "Bluetooth Speaker", sku: "BS-009", price: 119.0 },
  { name: "Mechanical Keyboard", sku: "MK-010", price: 149.0 },
  { name: "Winter Jacket", sku: "WJ-011", price: 249.0 },
  { name: "Water Bottle", sku: "WB-012", price: 25.0 },
  { name: "Phone Case", sku: "PC-013", price: 19.99 },
  { name: "Tablet Stand", sku: "TS-014", price: 34.0 },
  { name: "Electric Toothbrush", sku: "ET-015", price: 89.0 },
];

const customers = [
  "Alice Johnson",
  "Bob Smith",
  "Carol White",
  "David Brown",
  "Emma Davis",
  "Frank Miller",
  "Grace Lee",
  "Henry Wilson",
  "Ivy Chen",
  "Jack Taylor",
  "Karen Moore",
  "Liam Anderson",
  "Mia Thomas",
  "Noah Jackson",
  "Olivia Martin",
];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  console.log("🧹 Clearing existing data...");

  await prisma.chatMessage.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.refundDecision.deleteMany();
  await prisma.refundRequest.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();

  console.log("📦 Creating products...");

  const products = await Promise.all(
    productCatalog.map((product) =>
      prisma.product.create({
        data: {
          ...product,
          description: `High-quality ${product.name.toLowerCase()}`,
        },
      }),
    ),
  );

  console.log("👥 Creating customers and orders...");

  for (const name of customers) {
    const email = `${name.toLowerCase().replaceAll(" ", ".")}@example.com`;

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
      },
    });

    const orderCount = randomBetween(2, 3);

    for (let i = 0; i < orderCount; i++) {
      const daysAgo = randomBetween(1, 90);

      const orderedAt = new Date();
      orderedAt.setDate(orderedAt.getDate() - daysAgo);

      const deliveredAt = new Date(orderedAt);
      deliveredAt.setDate(deliveredAt.getDate() + randomBetween(2, 7));

      const itemCount = randomBetween(1, 3);

      const pickedProducts = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, itemCount);

      let total = 0;

      const itemsData = pickedProducts.map((product) => {
        const quantity = randomBetween(1, 2);
        const unitPrice = Number(product.price);

        total += quantity * unitPrice;

        return {
          productId: product.id,
          quantity,
          unitPrice,
          isFinalSale: Math.random() < 0.15,
        };
      });

      await prisma.order.create({
        data: {
          orderNumber: `ORD-${Date.now()}-${randomBetween(1000, 9999)}`,
          customerId: customer.id,
          status: "DELIVERED",
          totalAmount: total,
          orderedAt,
          deliveredAt,

          items: {
            create: itemsData,
          },
        },
      });
    }
  }

  console.log("✅ Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
