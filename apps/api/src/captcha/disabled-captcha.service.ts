import { CaptchaService } from './captcha.service.js';

/** Dev/test adapter: accepts any token. */
export class DisabledCaptchaService extends CaptchaService {
  async verify(): Promise<boolean> {
    return true;
  }
}
