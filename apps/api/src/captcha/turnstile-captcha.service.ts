import { CaptchaService } from './captcha.service.js';

/** Cloudflare Turnstile verification via its siteverify endpoint. */
export class TurnstileCaptchaService extends CaptchaService {
  constructor(private readonly secret: string) {
    super();
  }

  async verify(token: string): Promise<boolean> {
    const body = new URLSearchParams({ secret: this.secret, response: token });
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body,
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  }
}
