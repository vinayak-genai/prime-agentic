export interface RateLimitOptions {
  windowMs: number;
  max: number;
}

/** In-memory sliding-window limiter (single instance; swap for Redis to scale out). */
export class SlidingWindowRateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(private readonly options: RateLimitOptions) {}

  isAllowed(key: string, now = Date.now()): boolean {
    const cutoff = now - this.options.windowMs;
    const times = (this.hits.get(key) ?? []).filter((t) => t > cutoff);
    if (times.length >= this.options.max) {
      this.hits.set(key, times);
      return false;
    }
    times.push(now);
    this.hits.set(key, times);
    return true;
  }
}
