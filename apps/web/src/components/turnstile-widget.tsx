'use client';

import { useEffect, useRef } from 'react';

const SCRIPT_URL =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileParams {
  sitekey: string;
  callback: (token: string) => void;
  theme?: 'light' | 'dark' | 'auto';
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | null,
        params: TurnstileParams,
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

/**
 * Cloudflare Turnstile, loaded lazily and only when a site key is configured.
 * Renders nothing when `siteKey` is absent so dev/test runs are unaffected.
 */
export function TurnstileWidget({
  siteKey,
  onToken,
}: {
  siteKey?: string;
  onToken: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!siteKey) return;
    let widgetId: string | undefined;

    const render = () => {
      widgetId = window.turnstile?.render(containerRef.current, {
        sitekey: siteKey,
        callback: onToken,
      });
    };

    if (window.turnstile?.render) {
      render();
    } else {
      const script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.onload = render;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetId && window.turnstile?.reset) window.turnstile.reset(widgetId);
    };
  }, [siteKey, onToken]);

  if (!siteKey) return null;

  return <div ref={containerRef} className="min-h-[65px]" aria-hidden="true" />;
}
