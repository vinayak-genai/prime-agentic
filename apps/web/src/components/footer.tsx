import Link from 'next/link';
import { Button } from '@prime-agentic/ui';
import { PLATFORMS } from '@/content/platforms';

const COMPANY_LINKS = [
  { label: 'Agentic AI', href: '/agentic-ai' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Disclaimer', href: '/legal/disclaimer' },
];

export function Footer({ disclaimer }: { disclaimer?: string }) {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-ink">Prime Agentic</p>
            <p className="mt-2 text-sm text-muted">
              Coordinated agentic AI for finance, recruiting, education, and
              industry.
            </p>
          </div>

          <nav aria-label="Platforms">
            <h2 className="text-sm font-semibold text-ink">Platforms</h2>
            <ul className="mt-3 space-y-2">
              {PLATFORMS.map((platform) => (
                <li key={platform.slug}>
                  <Link
                    href={`/platforms/${platform.slug}`}
                    className="text-sm text-muted hover:text-accent"
                  >
                    {platform.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-sm font-semibold text-ink">Company</h2>
            <ul className="mt-3 space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-ink">Updates</h2>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="mt-3 flex gap-2">
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@example.com"
                disabled
                className="h-11 flex-1 cursor-not-allowed rounded-md border border-border bg-bg px-3 text-sm text-muted"
              />
              <Button disabled>Coming soon</Button>
            </div>
            <p className="mt-2 text-xs text-muted">
              Newsletter signup opens at launch.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Prime Agentic. All rights reserved.
          </p>
          <ul className="flex gap-4">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>{disclaimer ?? 'Not financial advice.'}</p>
        </div>
      </div>
    </footer>
  );
}
