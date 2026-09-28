import { PrismaService } from "../prisma/prisma.service.js";
export declare class CustomersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCustomers(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }[]>;
    getCustomerOrders(customerId: string): Promise<{
        orders: ({
            items: ({
                product: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    sku: string;
                    price: import("@prisma/client-runtime-utils").Decimal;
                };
            } & {
                id: string;
                orderId: string;
                productId: string;
                quantity: number;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                isFinalSale: boolean;
            })[];
        } & {
            id: string;
            orderNumber: string;
            customerId: string;
            status: import("../generated/prisma/enums.js").OrderStatus;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            orderedAt: Date;
            deliveredAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }>;
}
