import { platformContentSchema, type PlatformContent } from './schema';
import financialPlanner from './financial-planner.json';

/**
 * Build-time-validated platform copy, keyed by slug. A registry slug without an
 * entry here renders the "coming soon" page. Add a platform by importing its
 * JSON and parsing it with `platformContentSchema`.
 */
export const PLATFORM_CONTENT: Record<string, PlatformContent | undefined> = {
  'financial-planner': platformContentSchema.parse(financialPlanner),
};
