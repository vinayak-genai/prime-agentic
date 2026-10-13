import type { ErrorEvent } from '@sentry/nextjs';

const LEAD_FIELDS = new Set(['name', 'email', 'company', 'role', 'message']);
const SENSITIVE_HEADERS = new Set([
  'x-turnstile-token',
  'authorization',
  'cookie',
  'x-api-key',
]);

function redactObject(obj: unknown): void {
  if (!obj || typeof obj !== 'object') return;
  const record = obj as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (LEAD_FIELDS.has(key.toLowerCase())) record[key] = '[Filtered]';
  }
}

function redactHeaders(headers: Record<string, string>): void {
  for (const key of Object.keys(headers)) {
    if (SENSITIVE_HEADERS.has(key.toLowerCase())) headers[key] = '[Filtered]';
  }
}

/** Remove lead PII and sensitive headers from events and breadcrumbs. */
export function scrubEvent(event: ErrorEvent): ErrorEvent {
  redactObject(event.request?.data);
  if (event.request?.headers) redactHeaders(event.request.headers);
  for (const breadcrumb of event.breadcrumbs ?? []) {
    redactObject(breadcrumb.data);
  }
  return event;
}

export function sentryOptions(dsn: string | undefined) {
  if (!dsn) return undefined;
  return {
    dsn,
    sendDefaultPii: false,
    tracesSampleRate: Number(
      process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? '0.05',
    ),
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
    beforeSend: scrubEvent,
  };
}
