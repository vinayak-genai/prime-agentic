'use client';

import { useRef, useState, type FormEvent } from 'react';
import { createDemoRequest, demoRequestSchema } from '@prime-agentic/contracts';
import { PLATFORMS } from '@/content/platforms';
import { TurnstileWidget } from './turnstile-widget';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const inputClass =
  'mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent';
const labelClass = 'block text-sm font-medium text-ink';

export function LeadForm({ defaultPlatform }: { defaultPlatform?: string }) {
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errors, setErrors] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>();
  const errorRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const input = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      role: String(data.get('role') ?? '').trim() || undefined,
      platform: String(data.get('platform') ?? ''),
      message: String(data.get('message') ?? '').trim(),
      consent: data.get('consent') === 'on',
      honeypot: String(data.get('website') ?? ''),
    };

    const parsed = demoRequestSchema.safeParse(input);
    if (!parsed.success) {
      setStatus('error');
      setErrors(
        parsed.error.issues.map(
          (issue) => `${issue.path.join('.') || 'form'}: ${issue.message}`,
        ),
      );
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }

    setStatus('submitting');
    setErrors([]);

    const result = await createDemoRequest(parsed.data, {
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      headers: turnstileToken
        ? { 'x-turnstile-token': turnstileToken }
        : undefined,
    });

    if (result.ok) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
      setErrors([result.error.error.message]);
      requestAnimationFrame(() => errorRef.current?.focus());
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Error summary — receives focus on validation failure. */}
      <div ref={errorRef} tabIndex={-1} role="alert" className="min-h-[1.5rem]">
        {errors.length > 0 ? (
          <div className="rounded-md border border-warning bg-warning-soft px-4 py-3 text-sm text-warning">
            <p className="font-semibold">Please fix the following:</p>
            <ul className="mt-1 list-disc pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="role" className={labelClass}>
            Role <span className="text-muted">(optional)</span>
          </label>
          <input
            id="role"
            name="role"
            autoComplete="organization-title"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="platform" className={labelClass}>
          Platform of interest
        </label>
        <select
          id="platform"
          name="platform"
          defaultValue={defaultPlatform ?? PLATFORMS[0].slug}
          className={inputClass}
        >
          {PLATFORMS.map((platform) => (
            <option key={platform.slug} value={platform.slug}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          What would you like to explore?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          className={inputClass}
        />
      </div>

      {/* Honeypot: visually hidden, filled by bots, never by humans. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4"
        />
        <label htmlFor="consent" className="text-sm text-muted">
          [PLACEHOLDER] I agree to the privacy policy and consent to being
          contacted about my request.
        </label>
      </div>

      <TurnstileWidget
        siteKey={TURNSTILE_SITE_KEY}
        onToken={setTurnstileToken}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-medium text-accent-foreground hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Request a demo'}
        </button>
        <p aria-live="polite" className="min-h-[1.25rem] text-sm text-muted">
          {status === 'success'
            ? 'Thanks — we received your request and will be in touch.'
            : ''}
        </p>
      </div>
    </form>
  );
}
