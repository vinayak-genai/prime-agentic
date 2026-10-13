import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

/** Reject requests that are not application/json. */
@Injectable()
export class ContentTypeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      headers?: Record<string, string | undefined>;
    }>();
    const contentType = req.headers?.['content-type'] ?? '';
    if (!contentType.includes('application/json')) {
      throw new HttpException(
        {
          error: {
            code: 'unsupported_media_type',
            message: 'Content-Type must be application/json',
          },
        },
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }
    return true;
  }
}
