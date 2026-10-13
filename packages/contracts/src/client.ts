import { apiErrorSchema, demoRequestSchema } from './schemas.js';
import type { ApiError, DemoRequestInput } from './schemas.js';

export interface RequestOptions {
  baseUrl?: string;
  signal?: AbortSignal;
}

export type ApiResult<T> =
  { ok: true; data: T } | { ok: false; error: ApiError };

const DEFAULT_BASE_URL = '/api';

export async function createDemoRequest(
  input: DemoRequestInput,
  options: RequestOptions = {},
): Promise<ApiResult<null>> {
  const body = demoRequestSchema.parse(input);
  const res = await fetch(
    `${options.baseUrl ?? DEFAULT_BASE_URL}/demo-requests`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: options.signal,
    },
  );

  if (res.ok) return { ok: true, data: null };
  return { ok: false, error: parseApiError(await res.text()) };
}

function parseApiError(text: string): ApiError {
  try {
    return apiErrorSchema.parse(JSON.parse(text));
  } catch {
    return { error: { code: 'unexpected', message: 'Unexpected error.' } };
  }
}
