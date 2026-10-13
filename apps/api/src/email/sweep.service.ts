import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import type { DemoRequest as Lead } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { EmailService } from './email.service.js';

const MAX_ATTEMPTS = 5;
const BASE_BACKOFF_MS = 60_000;
const SWEEP_INTERVAL_MS = 60_000;

function backoffMs(attempts: number): number {
  return BASE_BACKOFF_MS * 2 ** Math.max(0, attempts - 1);
}

/** Retries pending lead emails, claiming rows atomically via a 'sending' state. */
@Injectable()
export class SweepService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SweepService.name);
  private timer?: NodeJS.Timeout;

  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
  ) {}

  onModuleInit(): void {
    this.timer = setInterval(() => void this.run(), SWEEP_INTERVAL_MS);
  }

  onModuleDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  async run(): Promise<void> {
    const now = new Date();

    await this.prisma.demoRequest.updateMany({
      where: {
        emailStatus: 'pending',
        attempts: { lt: MAX_ATTEMPTS },
        nextAttemptAt: { lte: now },
      },
      data: { emailStatus: 'sending' },
    });

    const claimed = await this.prisma.demoRequest.findMany({
      where: { emailStatus: 'sending' },
    });

    for (const lead of claimed) {
      await this.sendFor(lead);
    }
  }

  private async sendFor(lead: Lead): Promise<void> {
    try {
      await this.email.sendNotification(lead);
      await this.email.sendConfirmation(lead);
      await this.prisma.demoRequest.update({
        where: { id: lead.id },
        data: { emailStatus: 'sent', lastError: null },
      });
    } catch (error) {
      const attempts = lead.attempts + 1;
      const terminal = attempts >= MAX_ATTEMPTS;
      const message = error instanceof Error ? error.message : String(error);
      await this.prisma.demoRequest.update({
        where: { id: lead.id },
        data: {
          attempts,
          emailStatus: terminal ? 'failed' : 'pending',
          lastError: message,
          nextAttemptAt: terminal
            ? null
            : new Date(Date.now() + backoffMs(attempts)),
        },
      });
      this.logger.error(
        `Email failed for lead ${lead.id} (attempt ${attempts}): ${message}`,
      );
    }
  }
}
