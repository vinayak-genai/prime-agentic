import type { EmailMessage, EmailProvider } from './email.provider.js';

/** Dev/test adapter: prints the message instead of sending. */
export class ConsoleEmailProvider implements EmailProvider {
  async send(message: EmailMessage): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(`[email → ${message.to}] ${message.subject}\n${message.text}`);
  }
}
