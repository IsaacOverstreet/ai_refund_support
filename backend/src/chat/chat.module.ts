import { Module } from "@nestjs/common";
import { ChatService } from "../chat/chat.service.js";
import { ChatController } from "../chat/chat.controller.js";
import { AiModule } from "../ai/ai.module.js";

@Module({
  imports: [AiModule], // gives ChatService access to AiService
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService], // in case other modules need it later
})
export class ChatModule {}
