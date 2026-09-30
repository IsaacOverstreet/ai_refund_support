import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module.js";
import { ConfigModule } from "@nestjs/config";
import { AiModule } from "./ai/ai.module.js";
import { ChatModule } from "./chat/chat.module.js";
import { AdminModule } from "./admin/admin.module.js";
import { CustomersModule } from "./customers/customers.module.js";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AiModule,
    ChatModule,
    AdminModule,
    CustomersModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
