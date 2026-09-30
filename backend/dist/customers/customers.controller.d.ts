import { CustomersService } from "./customers.service.js";
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    getCustomers(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }[]>;
    getCustomerOrders(id: string): Promise<{
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
            status: import("../generated/prisma/enums.js").OrderStatus;
            createdAt: Date;
            orderNumber: string;
            customerId: string;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            orderedAt: Date;
            deliveredAt: Date | null;
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
