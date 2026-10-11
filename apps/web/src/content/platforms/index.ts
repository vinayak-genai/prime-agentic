import type { PlatformContent } from './schema';

/**
 * Build-time-validated platform copy, keyed by slug. A registry slug without an
 * entry here renders the "coming soon" page. Add a platform by importing its
 * JSON and parsing it with `platformContentSchema`.
 */
export const PLATFORM_CONTENT: Record<string, PlatformContent> = {};
