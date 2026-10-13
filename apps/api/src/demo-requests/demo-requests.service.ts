import { Injectable } from '@nestjs/common';
import type { DemoRequest } from '@prime-agentic/contracts';
import { PrismaService } from '../prisma/prisma.service.js';

/** Bump when the consent/privacy copy changes, so leads record which text they agreed to. */
export const CONSENT_VERSION = 'v1';

const DEDUPE_WINDOW_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class DemoRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: DemoRequest): Promise<void> {
    // Honeypot filled -> fake success with similar latency, store nothing.
    if (input.honeypot) {
      await this.simulateLatency();
      return;
    }

    // Idempotent dedupe: same email + platform within 24h -> success, no new row.
    const recent = await this.prisma.demoRequest.findFirst({
      where: {
        email: input.email,
        platform: input.platform,
        createdAt: { gte: new Date(Date.now() - DEDUPE_WINDOW_MS) },
      },
    });
    if (recent) return;

    await this.prisma.demoRequest.create({
      data: {
        name: input.name,
        email: input.email,
        company: input.company,
        role: input.role,
        platform: input.platform,
        message: input.message,
        consentVersion: CONSENT_VERSION,
        nextAttemptAt: new Date(),
      },
    });
  }

  private async simulateLatency(): Promise<void> {
    const delay = 150 + Math.floor(Math.random() * 200);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
