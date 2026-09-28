import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  // Get all customers
  async getCustomers() {
    return this.prisma.customer.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  // Get one customer and their orders
  async getCustomerOrders(customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
      include: {
        orders: {
          orderBy: {
            orderedAt: "desc",
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException("Customer not found");
    }

    return customer;
  }
}
