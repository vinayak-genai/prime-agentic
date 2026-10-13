import { BadRequestException, type PipeTransform } from '@nestjs/common';
import type { ZodSchema } from 'zod';

/** Validates a body against a zod schema and maps issues to the shared ApiError shape. */
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown): unknown {
    const result = this.schema.safeParse(value);
    if (result.success) return result.data;

    const fields: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join('.') || 'form';
      if (!(key in fields)) fields[key] = issue.message;
    }

    throw new BadRequestException({
      error: { code: 'validation', message: 'Validation failed', fields },
    });
  }
}
