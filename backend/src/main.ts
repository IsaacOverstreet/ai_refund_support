import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableShutdownHooks();

  const port = process.env.PORT || 3001;

  await app.listen(port);

  console.log(`🚀 API running at http://localhost:${port}/api`);
}

await bootstrap();
