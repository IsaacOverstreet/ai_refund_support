var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module.js";
import { ConfigModule } from "@nestjs/config";
import { AiModule } from "./ai/ai.module.js";
import { ChatModule } from "./chat/chat.module.js";
import { AdminModule } from "./admin/admin.module.js";
import { CustomersModule } from "./customers/customers.module.js";
import { ScheduleModule } from "@nestjs/schedule";
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map