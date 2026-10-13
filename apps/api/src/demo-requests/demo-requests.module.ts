import { Module } from '@nestjs/common';
import { CaptchaModule } from '../captcha/captcha.module.js';
import { ContentTypeGuard } from '../common/content-type.guard.js';
import { RateLimitGuard } from '../common/rate-limit.guard.js';
import { DemoRequestsController } from './demo-requests.controller.js';
import { DemoRequestsService } from './demo-requests.service.js';

@Module({
  imports: [CaptchaModule],
  controllers: [DemoRequestsController],
  providers: [DemoRequestsService, RateLimitGuard, ContentTypeGuard],
})
export class DemoRequestsModule {}
