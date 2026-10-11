import { describe, expect, it } from 'vitest';
import { platformContentSchema } from './schema';

const valid = {
  slug: 'financial-planner',
  hero: { outcome: 'Outcome', description: 'Description' },
  problem: { title: 'Problem', description: 'Description' },
  outcome: { title: 'Outcome', description: 'Description' },
  features: [{ title: 'Feature', description: 'Description' }],
  steps: [{ title: 'Step', description: 'Description' }],
  useCases: [{ title: 'Use case', description: 'Description' }],
  faqs: [{ question: 'Question', answer: 'Answer' }],
};

describe('platformContentSchema', () => {
  it('accepts valid content', () => {
    expect(platformContentSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts an optional disclaimer', () => {
    expect(
      platformContentSchema.safeParse({ ...valid, disclaimer: 'Not advice.' })
        .success,
    ).toBe(true);
  });

  it('rejects content missing a required field', () => {
    const invalid = { ...valid } as Record<string, unknown>;
    delete invalid.steps;
    expect(platformContentSchema.safeParse(invalid).success).toBe(false);
  });
});
