import { describe, expect, it } from 'vitest';
import { assertProductionGuards, loadEnv } from './env.js';

describe('loadEnv', () => {
  it('applies defaults in development', () => {
    const env = loadEnv({ NODE_ENV: 'development' });
    expect(env.PORT).toBe(3001);
    expect(env.EMAIL_PROVIDER).toBe('console');
    expect(env.TRUST_PROXY_HOPS).toBe(0);
  });

  it('coerces numeric values', () => {
    const env = loadEnv({
      NODE_ENV: 'development',
      PORT: '4000',
      TRUST_PROXY_HOPS: '2',
    });
    expect(env.PORT).toBe(4000);
    expect(env.TRUST_PROXY_HOPS).toBe(2);
  });

  it('throws on an invalid value', () => {
    expect(() => loadEnv({ NODE_ENV: 'development', PORT: 'nope' })).toThrow(
      /Invalid environment/,
    );
  });
});

describe('assertProductionGuards', () => {
  it('does not throw outside production', () => {
    const env = loadEnv({ NODE_ENV: 'development' });
    expect(() => assertProductionGuards(env)).not.toThrow();
  });

  it('throws in production when guards are missing', () => {
    const env = loadEnv({ NODE_ENV: 'production', EMAIL_PROVIDER: 'console' });
    expect(() => assertProductionGuards(env)).toThrow(/DATABASE_URL/);
    expect(() => assertProductionGuards(env)).toThrow(/TURNSTILE_SECRET_KEY/);
    expect(() => assertProductionGuards(env)).toThrow(/CORS_ORIGIN/);
  });

  it('passes in production when all guards are set', () => {
    const env = loadEnv({
      NODE_ENV: 'production',
      DATABASE_URL: 'postgres://x',
      TURNSTILE_SECRET_KEY: 'secret',
      EMAIL_PROVIDER: 'smtp',
      CORS_ORIGIN: 'https://prime-agentic.com',
      TRUST_PROXY_HOPS: '1',
    });
    expect(() => assertProductionGuards(env)).not.toThrow();
  });
});
