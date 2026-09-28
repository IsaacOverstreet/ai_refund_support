import { Module } from "@nestjs/common";
import { AiService } from "../ai/ai.service.js";

@Module({
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
