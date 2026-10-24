import { cache } from 'react';
import { platformContentSchema, type PlatformContent } from './schema';

/**
 * Lazy, per-slug content loaders so a platform route only bundles its own
 * JSON (scaling concern, not a Lighthouse one). A registry slug absent here
 * renders the "coming soon" page. Adding a platform means adding one entry;
 * the JSON is zod-validated when first loaded, so a malformed file fails the
 * build during SSG.
 */
export const PLATFORM_CONTENT_LOADERS = [
  ['financial-planner', () => import('./financial-planner.json')],
  ['recruitment-ats', () => import('./recruitment-ats.json')],
  ['edtech-ai', () => import('./edtech-ai.json')],
  ['iot', () => import('./iot.json')],
] as const;

export const getPlatformContent = cache(
  async (slug: string): Promise<PlatformContent | undefined> => {
    const entry = PLATFORM_CONTENT_LOADERS.find(([key]) => key === slug);
    if (!entry) return undefined;
    const [, load] = entry;
    const mod = await load();
    return platformContentSchema.parse(mod.default);
  },
);
