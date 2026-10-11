import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { DemoViewer } from './demo-viewer';

const demo = {
  persona: { name: 'Alex Morgan', detail: 'Illustrative persona' },
  steps: [
    { title: 'Upload portfolio', description: 'First step' },
    { title: 'Scenario review', description: 'Second step' },
    { title: 'Plan summary', description: 'Third step' },
  ],
};

describe('DemoViewer', () => {
  it('shows the mock-demo label and the first step', () => {
    render(<DemoViewer demo={demo} />);
    expect(
      screen.getByText('Mock demo, illustrative data'),
    ).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Upload portfolio' }),
    ).toBeInTheDocument();
  });

  it('advances and goes back between steps', async () => {
    const user = userEvent.setup();
    render(<DemoViewer demo={demo} />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });

  it('disables Back on the first step and Next on the last', async () => {
    const user = userEvent.setup();
    render(<DemoViewer demo={demo} />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('announces the current step in a live region', () => {
    render(<DemoViewer demo={demo} />);
    expect(
      screen.getByText('Step 1 of 3: Upload portfolio'),
    ).toBeInTheDocument();
  });
});
