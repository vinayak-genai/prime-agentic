import { apiErrorSchema, demoRequestSchema } from './schemas.js';
import type { ApiError, DemoRequestInput } from './schemas.js';

export interface RequestOptions {
  baseUrl?: string;
  signal?: AbortSignal;
}

export type ApiResult<T> =
  { ok: true; data: T } | { ok: false; error: ApiError };

const DEFAULT_BASE_URL = '/api';

const UNEXPECTED_ERROR: ApiError = {
  error: {
    code: 'unexpected',
    message: 'Something went wrong. Please try again.',
  },
};

/** POST a demo request. Never throws; always returns a typed ApiResult. */
export async function createDemoRequest(
  input: DemoRequestInput,
  options: RequestOptions = {},
): Promise<ApiResult<null>> {
  const parsed = demoRequestSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: {
        error: {
          code: 'invalid_request',
          message: 'Please check the form for errors.',
        },
      },
    };
  }

  let res: Response;
  try {
    res = await fetch(`${options.baseUrl ?? DEFAULT_BASE_URL}/demo-requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(parsed.data),
      signal: options.signal,
    });
  } catch {
    return {
      ok: false,
      error: {
        error: {
          code: 'network',
          message: 'Could not reach the server. Please try again.',
        },
      },
    };
  }

  if (res.ok) return { ok: true, data: null };

  let text: string;
  try {
    text = await res.text();
  } catch {
    return { ok: false, error: UNEXPECTED_ERROR };
  }

  return { ok: false, error: parseApiError(text) };
}

function parseApiError(text: string): ApiError {
  try {
    return apiErrorSchema.parse(JSON.parse(text));
  } catch {
    return UNEXPECTED_ERROR;
  }
}
