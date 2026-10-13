import { Controller, Get, NotFoundException } from '@nestjs/common';

@Controller('debug')
export class DebugController {
  /** Triggers a Sentry test error; disabled in production. */
  @Get('sentry')
  trigger(): never {
    if (process.env.NODE_ENV === 'production') {
      throw new NotFoundException();
    }
    throw new Error('Sentry test error');
  }
}
