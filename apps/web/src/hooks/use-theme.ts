'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const QUERY = '(prefers-color-scheme: dark)';

const listeners = new Set<() => void>();

function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia(QUERY).matches ? 'dark' : 'light';
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const mq = window.matchMedia(QUERY);
  const onChange = () => listeners.forEach((l) => l());
  mq.addEventListener('change', onChange);
  return () => {
    listeners.delete(listener);
    mq.removeEventListener('change', onChange);
  };
}

function persistTheme(next: Theme) {
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((l) => l());
}

/**
 * Light/dark theme. Defaults to the system preference on first visit and
 * persists a manual choice. Mirrors <html data-theme>, which the design tokens
 * in theme.css key off.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    persistTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  return { theme, toggle };
}
