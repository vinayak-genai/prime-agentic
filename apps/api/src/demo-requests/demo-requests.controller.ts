import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { demoRequestSchema, type DemoRequest } from '@prime-agentic/contracts';
import { CaptchaGuard } from '../captcha/captcha.guard.js';
import { ContentTypeGuard } from '../common/content-type.guard.js';
import { RateLimitGuard } from '../common/rate-limit.guard.js';
import { ZodValidationPipe } from '../common/zod-validation.pipe.js';
import { DemoRequestsService } from './demo-requests.service.js';

@Controller('demo-requests')
export class DemoRequestsController {
  constructor(private readonly service: DemoRequestsService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(ContentTypeGuard, RateLimitGuard, CaptchaGuard)
  async create(
    @Body(new ZodValidationPipe(demoRequestSchema)) body: DemoRequest,
  ): Promise<{ ok: true }> {
    await this.service.create(body);
    return { ok: true };
  }
}
