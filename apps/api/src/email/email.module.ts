import { Module } from '@nestjs/common';
import { EmailService } from './email.service.js';
import { SweepService } from './sweep.service.js';

@Module({
  providers: [EmailService, SweepService],
  exports: [EmailService, SweepService],
})
export class EmailModule {}
