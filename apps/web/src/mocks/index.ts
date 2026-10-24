import { cache } from 'react';
import { demoSchema, type PlatformDemo } from './schema';

/**
 * Lazy, per-slug demo loaders mirroring the content loaders. A platform may
 * have content but no demo yet; the page renders a "Demo coming soon." stub.
 */
export const PLATFORM_DEMO_LOADERS = [
  ['financial-planner', () => import('./financial-planner.demo.json')],
  ['recruitment-ats', () => import('./recruitment-ats.demo.json')],
  ['edtech-ai', () => import('./edtech-ai.demo.json')],
  ['iot', () => import('./iot.demo.json')],
] as const;

export const getPlatformDemo = cache(
  async (slug: string): Promise<PlatformDemo | undefined> => {
    const entry = PLATFORM_DEMO_LOADERS.find(([key]) => key === slug);
    if (!entry) return undefined;
    const [, load] = entry;
    const mod = await load();
    return demoSchema.parse(mod.default);
  },
);
