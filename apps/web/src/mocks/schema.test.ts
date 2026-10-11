import { describe, expect, it } from 'vitest';
import { demoSchema } from './schema';

const valid = {
  slug: 'financial-planner',
  persona: { name: 'Alex Morgan', detail: 'Illustrative persona' },
  steps: [{ title: 'Upload portfolio', description: 'Illustrative data' }],
};

describe('demoSchema', () => {
  it('accepts a valid demo', () => {
    expect(demoSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a demo with no steps', () => {
    expect(demoSchema.safeParse({ ...valid, steps: [] }).success).toBe(false);
  });
});
