'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@prime-agentic/ui';
import type { Platform } from '@/content/platforms';
import { useTheme } from '@/hooks/use-theme';

const NAV_ITEMS = [
  { label: 'Agentic AI', href: '/agentic-ai' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const LINK_CLASS =
  'rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Header({ platforms }: { platforms: Platform[] }) {
  const { theme, toggle } = useTheme();
  const [platformsOpen, setPlatformsOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const platformsRef = React.useRef<HTMLDivElement>(null);
  const platformsButtonRef = React.useRef<HTMLButtonElement>(null);
  const mobileRef = React.useRef<HTMLDivElement>(null);
  const hamburgerRef = React.useRef<HTMLButtonElement>(null);

  // Close the platforms disclosure on outside click.
  React.useEffect(() => {
    if (!platformsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        platformsRef.current &&
        !platformsRef.current.contains(event.target as Node)
      ) {
        setPlatformsOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [platformsOpen]);

  // Mobile menu: trap focus and close on Escape, returning focus to the toggle.
  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !mobileRef.current) return;
      const focusables = Array.from(
        mobileRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const closeAll = () => {
    setPlatformsOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
          <Link href="/" className="text-lg font-semibold text-ink">
            Prime Agentic
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center md:flex">
            <div className="relative" ref={platformsRef}>
              <button
                type="button"
                ref={platformsButtonRef}
                aria-expanded={platformsOpen}
                aria-controls="platforms-menu"
                onClick={() => setPlatformsOpen((v) => !v)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setPlatformsOpen(false);
                    platformsButtonRef.current?.focus();
                  }
                }}
                className={LINK_CLASS}
              >
                Platforms
                <span className="ml-1 text-xs" aria-hidden="true">
                  &#9662;
                </span>
              </button>
              {platformsOpen ? (
                <ul
                  id="platforms-menu"
                  className="absolute left-0 top-full z-50 mt-1 w-72 rounded-md border border-border bg-surface p-2 shadow-md"
                >
                  {platforms.map((platform) => (
                    <li key={platform.slug}>
                      <Link
                        href={`/platforms/${platform.slug}`}
                        onClick={closeAll}
                        className="block rounded-md px-3 py-2 text-sm text-ink hover:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {platform.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className={LINK_CLASS}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggle}
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <Button href="/contact" size="sm" className="hidden md:inline-flex">
              Request a demo
            </Button>
            <button
              type="button"
              ref={hamburgerRef}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
            >
              <span aria-hidden="true">{mobileOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen ? (
          <div
            id="mobile-menu"
            ref={mobileRef}
            className="border-t border-border bg-bg px-4 pb-6 pt-4 md:hidden"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">
              Platforms
            </p>
            <ul className="mt-2 space-y-1">
              {platforms.map((platform) => (
                <li key={platform.slug}>
                  <Link
                    href={`/platforms/${platform.slug}`}
                    onClick={closeAll}
                    className="block rounded-md px-3 py-2 text-ink hover:bg-bg-subtle"
                  >
                    {platform.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted">
              Company
            </p>
            <ul className="mt-2 space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    className="block rounded-md px-3 py-2 text-ink hover:bg-bg-subtle"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/contact" className="mt-4 w-full">
              Request a demo
            </Button>
          </div>
        ) : null}
      </header>
    </>
  );
}
