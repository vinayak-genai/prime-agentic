import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FAQ } from './faq';

describe('FAQ', () => {
  it('renders each question and answer', () => {
    render(
      <FAQ
        items={[
          { question: 'When will this be available?', answer: 'Soon.' },
          { question: 'Is there early access?', answer: 'TBD.' },
        ]}
      />,
    );
    expect(
      screen.getByText('When will this be available?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Is there early access?')).toBeInTheDocument();
  });

  it('renders each item as its own disclosure (multi-open)', () => {
    const { container } = render(
      <FAQ
        items={[
          { question: 'First question', answer: 'First answer' },
          { question: 'Second question', answer: 'Second answer' },
        ]}
      />,
    );
    expect(container.querySelectorAll('details')).toHaveLength(2);
  });
});
