/** Verifies a bot-protection token; implemented by Turnstile or a dev no-op. */
export abstract class CaptchaService {
  abstract verify(token: string): Promise<boolean>;
}
