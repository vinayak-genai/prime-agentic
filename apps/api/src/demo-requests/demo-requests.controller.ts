import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { demoRequestSchema, type DemoRequest } from '@prime-agentic/contracts';
import { ZodValidationPipe } from '../common/zod-validation.pipe.js';
import { DemoRequestsService } from './demo-requests.service.js';

@Controller('demo-requests')
export class DemoRequestsController {
  constructor(private readonly service: DemoRequestsService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ZodValidationPipe(demoRequestSchema)) body: DemoRequest,
  ): Promise<{ ok: true }> {
    await this.service.create(body);
    return { ok: true };
  }
}
