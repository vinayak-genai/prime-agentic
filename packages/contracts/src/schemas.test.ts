import { describe, expect, it } from 'vitest';
import {
  apiErrorSchema,
  demoRequestSchema,
  platformSlugSchema,
} from './schemas';

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  company: 'Acme',
  platform: 'financial-planner' as const,
  message: 'hello',
  consent: true,
};

describe('demoRequestSchema', () => {
  it('accepts a valid request', () => {
    expect(demoRequestSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a missing consent', () => {
    expect(
      demoRequestSchema.safeParse({ ...valid, consent: false }).success,
    ).toBe(false);
  });

  it('rejects a non-email address', () => {
    expect(
      demoRequestSchema.safeParse({ ...valid, email: 'not-an-email' }).success,
    ).toBe(false);
  });

  it('rejects an unknown platform', () => {
    expect(
      demoRequestSchema.safeParse({ ...valid, platform: 'nope' }).success,
    ).toBe(false);
  });

  it('rejects an over-long message', () => {
    expect(
      demoRequestSchema.safeParse({ ...valid, message: 'x'.repeat(2001) })
        .success,
    ).toBe(false);
  });
});

describe('platformSlugSchema', () => {
  it('accepts the four registry slugs', () => {
    for (const slug of [
      'financial-planner',
      'recruitment-ats',
      'edtech-ai',
      'iot',
    ]) {
      expect(platformSlugSchema.safeParse(slug).success).toBe(true);
    }
  });
});

describe('apiErrorSchema', () => {
  it('accepts a typed error', () => {
    expect(
      apiErrorSchema.safeParse({ error: { code: 'x', message: 'y' } }).success,
    ).toBe(true);
  });
});
