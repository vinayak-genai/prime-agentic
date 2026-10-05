import { describe, expect, it } from 'vitest';
import { UI_VERSION } from './index';

describe('@prime-agentic/ui', () => {
  it('exports a version', () => {
    expect(UI_VERSION).toBe('0.0.0');
  });
});
