import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { SlidingWindowRateLimiter } from './rate-limit.js';

interface RequestLike {
  ip?: string;
  body?: { email?: string };
}

/** Per-IP and per-email rate limits for the demo-request endpoint. */
@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly ipLimiter = new SlidingWindowRateLimiter({
    windowMs: 60_000,
    max: 20,
  });
  private readonly emailLimiter = new SlidingWindowRateLimiter({
    windowMs: 60_000,
    max: 5,
  });

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<RequestLike>();

    if (!this.ipLimiter.isAllowed(req.ip ?? 'unknown')) {
      throw new HttpException(
        { error: { code: 'rate_limited', message: 'Too many requests' } },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const email = req.body?.email;
    if (email && !this.emailLimiter.isAllowed(email)) {
      throw new HttpException(
        {
          error: {
            code: 'rate_limited',
            message: 'Too many requests for this email address',
          },
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
