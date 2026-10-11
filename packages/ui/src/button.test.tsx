import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders a button by default', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('renders an anchor when href is provided', () => {
    render(<Button href="/demo">Request a demo</Button>);
    expect(
      screen.getByRole('link', { name: 'Request a demo' }),
    ).toHaveAttribute('href', '/demo');
  });

  it('forwards disabled state', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeDisabled();
  });
});
