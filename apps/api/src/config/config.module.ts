import { Global, Module } from '@nestjs/common';
import { loadEnv } from './env.js';
import type { Env } from './env.js';

/** Injection token for the parsed environment. */
export const ENV = Symbol('ENV');

@Global()
@Module({
  providers: [{ provide: ENV, useFactory: (): Env => loadEnv(process.env) }],
  exports: [ENV],
})
export class ConfigModule {}
