import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/nestjs';
import { AppModule } from './app.module.js';
import { sentryOptions } from './common/sentry.js';
import { assertProductionGuards, loadEnv } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(process.env);
  assertProductionGuards(env);

  const options = sentryOptions(process.env.SENTRY_DSN);
  if (options) {
    Sentry.init({ ...options, integrations: [Sentry.nestIntegration()] });
  }

  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().set('trust proxy', env.TRUST_PROXY_HOPS);
  app.setGlobalPrefix('api', { exclude: ['health'] });
  await app.listen(env.PORT);
}
await bootstrap();
