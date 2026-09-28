var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
let CustomersService = class CustomersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCustomers() {
        return this.prisma.customer.findMany({
            orderBy: {
                name: "asc",
            },
        });
    }
    async getCustomerOrders(customerId) {
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
};
CustomersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CustomersService);
export { CustomersService };
//# sourceMappingURL=customers.service.js.map