import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { assertProductionGuards, loadEnv } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(process.env);
  assertProductionGuards(env);
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().set('trust proxy', env.TRUST_PROXY_HOPS);
  app.setGlobalPrefix('api', { exclude: ['health'] });
  await app.listen(env.PORT);
}
await bootstrap();
