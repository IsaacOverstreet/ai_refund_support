import { Controller, Get, Param } from "@nestjs/common";
import { CustomersService } from "./customers.service.js";

@Controller("api/customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // GET /api/customers
  @Get()
  getCustomers() {
    return this.customersService.getCustomers();
  }

  // GET /api/customers/:id/orders
  @Get(":id/orders")
  getCustomerOrders(@Param("id") id: string) {
    return this.customersService.getCustomerOrders(id);
  }
}
