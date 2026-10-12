import { describe, expect, it } from 'vitest';
import { PLATFORMS } from '../platforms';
import { FINANCIAL_DISCLAIMER } from '../disclaimer';
import { getPlatformContent, PLATFORM_CONTENT_LOADERS } from './index';
import { getPlatformDemo, PLATFORM_DEMO_LOADERS } from '../../mocks';

const DEMO_BANNED_TERMS = [
  'secure',
  'certified',
  'guarantee',
  'returns',
  'sebi',
  '%',
];
const FAQ_BANNED_TERMS = ['security', 'compliance', 'accuracy'];

describe('platform content loaders', () => {
  it('every content loader slug exists in the registry', () => {
    for (const [slug] of PLATFORM_CONTENT_LOADERS) {
      expect(PLATFORMS.some((p) => p.slug === slug)).toBe(true);
    }
  });

  it('every content loader parses with the zod schema', async () => {
    for (const [slug] of PLATFORM_CONTENT_LOADERS) {
      await expect(getPlatformContent(slug)).resolves.toMatchObject({ slug });
    }
  });

  it('registry slugs without content resolve to undefined (coming soon)', async () => {
    const contentSlugs = new Set<string>(
      PLATFORM_CONTENT_LOADERS.map(([slug]) => slug),
    );
    for (const platform of PLATFORMS) {
      if (!contentSlugs.has(platform.slug)) {
        await expect(
          getPlatformContent(platform.slug),
        ).resolves.toBeUndefined();
      }
    }
  });
});

describe('platform demo loaders', () => {
  it('every demo loader slug exists in the registry', () => {
    for (const [slug] of PLATFORM_DEMO_LOADERS) {
      expect(PLATFORMS.some((p) => p.slug === slug)).toBe(true);
    }
  });

  it('every demo loader parses with the zod schema', async () => {
    for (const [slug] of PLATFORM_DEMO_LOADERS) {
      await expect(getPlatformDemo(slug)).resolves.toMatchObject({ slug });
    }
  });
});

describe('financial content guards', () => {
  it('disclaimer matches the canonical constant', async () => {
    const content = await getPlatformContent('financial-planner');
    expect(content?.disclaimer).toBe(FINANCIAL_DISCLAIMER);
  });

  it('demo follows the four required steps in order', async () => {
    const demo = await getPlatformDemo('financial-planner');
    expect(demo?.steps.map((step) => step.title)).toEqual([
      'Upload portfolio',
      'Scenario review',
      'Plan adjustments',
      'Plan summary',
    ]);
  });

  it('demo contains no banned claims', async () => {
    const demo = await getPlatformDemo('financial-planner');
    const text = JSON.stringify(demo).toLowerCase();
    for (const term of DEMO_BANNED_TERMS) {
      expect(text, `banned demo term "${term}"`).not.toContain(term);
    }
  });

  it('FAQ has 4-6 questions on allowed topics only', async () => {
    const content = await getPlatformContent('financial-planner');
    expect(content?.faqs.length).toBeGreaterThanOrEqual(4);
    expect(content?.faqs.length).toBeLessThanOrEqual(6);
    const faqText = JSON.stringify(content?.faqs).toLowerCase();
    for (const term of FAQ_BANNED_TERMS) {
      expect(faqText, `banned FAQ term "${term}"`).not.toContain(term);
    }
  });
});
