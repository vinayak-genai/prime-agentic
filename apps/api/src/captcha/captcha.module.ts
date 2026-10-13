import { Module } from '@nestjs/common';
import { ENV } from '../config/config.module.js';
import type { Env } from '../config/env.js';
import { CaptchaGuard } from './captcha.guard.js';
import { CaptchaService } from './captcha.service.js';
import { DisabledCaptchaService } from './disabled-captcha.service.js';
import { TurnstileCaptchaService } from './turnstile-captcha.service.js';

@Module({
  providers: [
    CaptchaGuard,
    {
      provide: CaptchaService,
      useFactory: (env: Env) =>
        env.NODE_ENV === 'production'
          ? new TurnstileCaptchaService(env.TURNSTILE_SECRET_KEY ?? '')
          : new DisabledCaptchaService(),
      inject: [ENV],
    },
  ],
  exports: [CaptchaService, CaptchaGuard],
})
export class CaptchaModule {}
