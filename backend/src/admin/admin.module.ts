import { Module } from "@nestjs/common";
import { AdminController } from "../admin/admin.controller.js";
import { AdminService } from "../admin/admin.service.js";

@Module({
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
