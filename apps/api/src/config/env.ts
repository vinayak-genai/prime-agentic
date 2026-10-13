import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  EMAIL_PROVIDER: z.enum(['console', 'smtp', 'resend']).default('console'),
  SALES_INBOX_EMAIL: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  CORS_ORIGIN: z.string().optional(),
  TRUST_PROXY_HOPS: z.coerce.number().int().nonnegative().default(0),
});

export type Env = z.infer<typeof envSchema>;

/** Parse and validate the environment; throws with a flattened error on failure. */
export function loadEnv(source: Record<string, string | undefined>): Env {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    const details = JSON.stringify(parsed.error.flatten());
    throw new Error(`Invalid environment: ${details}`);
  }
  return parsed.data;
}

/** Refuse to start in production unless every security-critical value is set. */
export function assertProductionGuards(env: Env): void {
  if (env.NODE_ENV !== 'production') return;
  const missing: string[] = [];
  if (!env.DATABASE_URL) missing.push('DATABASE_URL');
  if (!env.TURNSTILE_SECRET_KEY) missing.push('TURNSTILE_SECRET_KEY');
  if (env.EMAIL_PROVIDER === 'console') {
    missing.push('EMAIL_PROVIDER (must be smtp or resend)');
  }
  if (!env.SALES_INBOX_EMAIL) missing.push('SALES_INBOX_EMAIL');
  if (!env.CORS_ORIGIN) missing.push('CORS_ORIGIN');
  if (missing.length > 0) {
    throw new Error(
      `Refusing to start in production without: ${missing.join(', ')}`,
    );
  }
}
