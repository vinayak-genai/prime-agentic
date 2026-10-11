import type { PlatformDemo } from './schema';

/**
 * Build-time-validated demo data, keyed by slug. Add a platform by importing
 * its JSON and parsing it with `demoSchema`.
 */
export const PLATFORM_DEMOS: Record<string, PlatformDemo> = {};
