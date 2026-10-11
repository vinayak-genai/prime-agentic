import { demoSchema, type PlatformDemo } from './schema';
import financialPlannerDemo from './financial-planner.demo.json';

/**
 * Build-time-validated demo data, keyed by slug. Add a platform by importing
 * its JSON and parsing it with `demoSchema`.
 */
export const PLATFORM_DEMOS: Record<string, PlatformDemo | undefined> = {
  'financial-planner': demoSchema.parse(financialPlannerDemo),
};
