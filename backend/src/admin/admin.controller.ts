import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { AdminService } from "./admin.service.js";

class RequestFilterDto {
  @IsOptional()
  @IsIn(["APPROVED", "DENIED", "ESCALATED"])
  status?: "APPROVED" | "DENIED" | "ESCALATED";
}

class OverrideDto {
  @IsIn(["APPROVED", "DENIED", "ESCALATED"])
  status: "APPROVED" | "DENIED" | "ESCALATED";

  @IsString()
  @MinLength(3)
  note: string;
}

@Controller("api/admin")
export class AdminController {
  constructor(private admin: AdminService) {}

  // Dashboard statistics
  @Get("stats")
  getStats() {
    return this.admin.getStats();
  }

  // Refund requests with optional status filter
  @Get("requests")
  listRequests(@Query() filter: RequestFilterDto) {
    return this.admin.listRequests(filter.status);
  }

  // Details for one refund request
  @Get("requests/:id")
  getRequest(@Param("id") id: string) {
    return this.admin.getRequestDetail(id);
  }

  // Support agent changes the refund decision
  @Patch("requests/:id/decision")
  override(@Param("id") id: string, @Body() dto: OverrideDto) {
    return this.admin.overrideDecision(id, dto.status, dto.note);
  }
}
