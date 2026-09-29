import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { IsString, MinLength } from "class-validator";
import { ChatService } from "../chat/chat.service.js";
import { PrismaService } from "../prisma/prisma.service.js";

class SendMessageDto {
  @IsString()
  @MinLength(1)
  message: string;
}

@Controller("api")
export class ChatController {
  constructor(
    private chat: ChatService,
    private prisma: PrismaService,
  ) {}

  //   @Get("customers")
  //   getCustomers() {
  //     return this.prisma.customer.findMany({
  //       include: {
  //         orders: {
  //           include: { items: { include: { product: true } } },
  //           orderBy: { orderedAt: "desc" },
  //         },
  //       },
  //     });
  //   }

  @Post("sessions/start/:orderId")
  start(@Param("orderId") orderId: string) {
    return this.chat.startSession(orderId);
  }

  @Post("sessions/:id/message")
  send(@Param("id") id: string, @Body() dto: SendMessageDto) {
    return this.chat.sendMessage(id, dto.message);
  }

  @Get("sessions")
  list() {
    return this.chat.listSessions();
  }
}
