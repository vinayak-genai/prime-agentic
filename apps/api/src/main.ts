import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { assertProductionGuards, loadEnv } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(process.env);
  assertProductionGuards(env);
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT);
}
await bootstrap();
