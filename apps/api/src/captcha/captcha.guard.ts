import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CaptchaService } from './captcha.service.js';

/** Verifies the Turnstile token sent in the x-turnstile-token header. */
@Injectable()
export class CaptchaGuard implements CanActivate {
  constructor(private readonly captcha: CaptchaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      headers?: Record<string, string | undefined>;
    }>();
    const token = req.headers?.['x-turnstile-token'] ?? '';
    if (!(await this.captcha.verify(token))) {
      throw new HttpException(
        { error: { code: 'captcha', message: 'Captcha verification failed' } },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }
}
