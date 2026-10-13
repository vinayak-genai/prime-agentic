import type { NextConfig } from 'next';

const TURNSTILE = 'https://challenges.cloudflare.com';
const SENTRY_INGEST = 'https://*.ingest.sentry.io';

const nextConfig: NextConfig = {
  transpilePackages: ['@prime-agentic/ui'],
  allowedDevOrigins: ['127.0.0.1'],
  async headers() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiOrigin = apiUrl ? new URL(apiUrl).origin : '';
    const connectSrc = [
      "'self'",
      TURNSTILE,
      SENTRY_INGEST,
      apiOrigin,
      'http://localhost:*',
      'ws://localhost:*',
    ]
      .filter(Boolean)
      .join(' ');

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${TURNSTILE}`,
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data:",
              `connect-src ${connectSrc}`,
              `frame-src ${TURNSTILE}`,
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

// @sentry/nextjs v11 instruments via sentry.*.config.ts + instrumentation.ts;
// source maps are uploaded automatically during `next build` when
// SENTRY_AUTH_TOKEN, SENTRY_ORG, and SENTRY_PROJECT are set in the environment.
export default nextConfig;
