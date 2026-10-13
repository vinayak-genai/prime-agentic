import { describe, expect, it } from 'vitest';
import { SlidingWindowRateLimiter } from './rate-limit.js';

describe('SlidingWindowRateLimiter', () => {
  it('allows up to max requests, then blocks', () => {
    const limiter = new SlidingWindowRateLimiter({ windowMs: 1000, max: 2 });
    expect(limiter.isAllowed('a', 0)).toBe(true);
    expect(limiter.isAllowed('a', 1)).toBe(true);
    expect(limiter.isAllowed('a', 2)).toBe(false);
  });

  it('allows again once the window slides', () => {
    const limiter = new SlidingWindowRateLimiter({ windowMs: 1000, max: 1 });
    expect(limiter.isAllowed('a', 0)).toBe(true);
    expect(limiter.isAllowed('a', 1001)).toBe(true);
  });

  it('tracks keys independently', () => {
    const limiter = new SlidingWindowRateLimiter({ windowMs: 1000, max: 1 });
    expect(limiter.isAllowed('a', 0)).toBe(true);
    expect(limiter.isAllowed('b', 0)).toBe(true);
  });
});
