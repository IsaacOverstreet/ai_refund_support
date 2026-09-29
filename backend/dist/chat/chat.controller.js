var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { IsString, MinLength } from "class-validator";
import { ChatService } from "../chat/chat.service.js";
import { PrismaService } from "../prisma/prisma.service.js";
class SendMessageDto {
    message;
}
__decorate([
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], SendMessageDto.prototype, "message", void 0);
let ChatController = class ChatController {
    chat;
    prisma;
    constructor(chat, prisma) {
        this.chat = chat;
        this.prisma = prisma;
    }
    start(orderId) {
        return this.chat.startSession(orderId);
    }
    send(id, dto) {
        return this.chat.sendMessage(id, dto.message);
    }
    list() {
        return this.chat.listSessions();
    }
};
__decorate([
    Post("sessions/start/:orderId"),
    __param(0, Param("orderId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "start", null);
__decorate([
    Post("sessions/:id/message"),
    __param(0, Param("id")),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, SendMessageDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "send", null);
__decorate([
    Get("sessions"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "list", null);
ChatController = __decorate([
    Controller("api"),
    __metadata("design:paramtypes", [ChatService,
        PrismaService])
], ChatController);
export { ChatController };
//# sourceMappingURL=chat.controller.js.map