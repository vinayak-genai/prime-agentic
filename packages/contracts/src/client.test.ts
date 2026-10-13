import { afterEach, describe, expect, it, vi } from 'vitest';
import { createDemoRequest } from './client';

const validInput = {
  name: 'Ada',
  email: 'ada@example.com',
  company: 'Acme',
  platform: 'financial-planner' as const,
  message: 'hi',
  consent: true,
};

describe('createDemoRequest', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns ok on a 2xx response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 201 })),
    );
    expect(await createDemoRequest(validInput)).toEqual({
      ok: true,
      data: null,
    });
  });

  it('returns a network error instead of throwing when fetch rejects', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('ECONNREFUSED')),
    );
    const result = await createDemoRequest(validInput);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.error.code).toBe('network');
  });

  it('returns the typed error on a JSON 400 body', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            error: {
              code: 'validation',
              message: 'bad',
              fields: { email: 'invalid' },
            },
          }),
          { status: 400, headers: { 'content-type': 'application/json' } },
        ),
      ),
    );
    const result = await createDemoRequest(validInput);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.error.code).toBe('validation');
      expect(result.error.error.fields).toEqual({ email: 'invalid' });
    }
  });

  it('returns a generic error, never raw server detail, on a non-JSON body', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response('<!doctype html><h1>Internal Server Error</h1>', {
          status: 500,
        }),
      ),
    );
    const result = await createDemoRequest(validInput);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.error.code).toBe('unexpected');
      expect(JSON.stringify(result.error)).not.toContain(
        'Internal Server Error',
      );
    }
  });

  it('returns an invalid_request error instead of throwing on bad input', async () => {
    const result = await createDemoRequest({ ...validInput, consent: false });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.error.code).toBe('invalid_request');
  });
});
