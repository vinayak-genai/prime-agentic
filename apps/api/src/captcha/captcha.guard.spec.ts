import { describe, expect, it, vi } from 'vitest';
import { CaptchaGuard } from './captcha.guard.js';
import type { CaptchaService } from './captcha.service.js';

function contextWithToken(token?: string) {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ headers: { 'x-turnstile-token': token } }),
    }),
  };
}

describe('CaptchaGuard', () => {
  it('passes when the token verifies', async () => {
    const captcha = { verify: vi.fn().mockResolvedValue(true) };
    const guard = new CaptchaGuard(captcha as unknown as CaptchaService);
    await expect(
      guard.canActivate(contextWithToken('ok') as never),
    ).resolves.toBe(true);
  });

  it('passes an empty token through to the verifier (disabled captcha)', async () => {
    const captcha = { verify: vi.fn().mockResolvedValue(true) };
    const guard = new CaptchaGuard(captcha as unknown as CaptchaService);
    await expect(guard.canActivate(contextWithToken() as never)).resolves.toBe(
      true,
    );
    expect(captcha.verify).toHaveBeenCalledWith('');
  });

  it('rejects when verification fails', async () => {
    const captcha = { verify: vi.fn().mockResolvedValue(false) };
    const guard = new CaptchaGuard(captcha as unknown as CaptchaService);
    await expect(
      guard.canActivate(contextWithToken('bad') as never),
    ).rejects.toThrow();
  });
});
