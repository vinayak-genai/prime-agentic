import { describe, expect, it } from 'vitest';
import { sanitizeHeader } from './email.service.js';

describe('sanitizeHeader', () => {
  it('strips newlines to prevent header injection', () => {
    expect(sanitizeHeader('subject\r\nBcc: evil@example.com')).toBe(
      'subject Bcc: evil@example.com',
    );
  });

  it('trims surrounding whitespace', () => {
    expect(sanitizeHeader('  hi  ')).toBe('hi');
  });
});
