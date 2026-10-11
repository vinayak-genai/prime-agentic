import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePrefersReducedMotion } from './use-prefers-reduced-motion';

function Probe() {
  const reduced = usePrefersReducedMotion();
  return <div data-testid="probe">{reduced ? 'reduced' : 'motion'}</div>;
}

function setMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

describe('usePrefersReducedMotion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns true when reduced motion is preferred', () => {
    setMatchMedia(true);
    render(<Probe />);
    expect(screen.getByTestId('probe')).toHaveTextContent('reduced');
  });

  it('returns false when motion is allowed', () => {
    setMatchMedia(false);
    render(<Probe />);
    expect(screen.getByTestId('probe')).toHaveTextContent('motion');
  });
});
