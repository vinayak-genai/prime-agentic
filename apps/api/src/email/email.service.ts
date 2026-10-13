import { Inject, Injectable } from '@nestjs/common';
import type { DemoRequest as Lead } from '@prisma/client';
import { ENV } from '../config/config.module.js';
import type { Env } from '../config/env.js';
import { ConsoleEmailProvider } from './console-email.provider.js';
import type { EmailProvider } from './email.provider.js';
import { ResendEmailProvider } from './resend-email.provider.js';
import { SmtpEmailProvider } from './smtp-email.provider.js';

/** Strip CR/LF so user-controlled values cannot inject extra headers. */
export function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function plainTextLead(lead: Lead): string {
  return [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
    `Role: ${lead.role ?? '-'}`,
    `Platform: ${lead.platform}`,
    '',
    'Message:',
    lead.message,
  ].join('\n');
}

export function createEmailProvider(env: Env): EmailProvider {
  switch (env.EMAIL_PROVIDER) {
    case 'smtp':
      return new SmtpEmailProvider({
        host: env.SMTP_HOST ?? '',
        port: env.SMTP_PORT ?? 587,
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
        from: env.EMAIL_FROM ?? '',
      });
    case 'resend':
      return new ResendEmailProvider(
        env.RESEND_API_KEY ?? '',
        env.EMAIL_FROM ?? '',
      );
    default:
      return new ConsoleEmailProvider();
  }
}

@Injectable()
export class EmailService {
  private readonly provider: EmailProvider;
  private readonly salesInbox: string;

  constructor(@Inject(ENV) env: Env) {
    this.provider = createEmailProvider(env);
    this.salesInbox = env.SALES_INBOX_EMAIL ?? '';
  }

  async sendNotification(lead: Lead): Promise<void> {
    await this.provider.send({
      to: sanitizeHeader(this.salesInbox),
      subject: sanitizeHeader(`New demo request — ${lead.platform}`),
      text: plainTextLead(lead),
    });
  }

  async sendConfirmation(lead: Lead): Promise<void> {
    await this.provider.send({
      to: sanitizeHeader(lead.email),
      subject: sanitizeHeader('We received your demo request'),
      text: `Hi ${lead.name},\n\nThanks for your interest. We'll be in touch soon.\n`,
    });
  }
}
