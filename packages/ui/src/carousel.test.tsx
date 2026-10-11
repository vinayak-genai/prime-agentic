import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Carousel } from './carousel';

const items = ['One', 'Two', 'Three'].map((text) => (
  <div key={text}>{text}</div>
));

describe('Carousel', () => {
  it('exposes carousel ARIA semantics', () => {
    render(<Carousel items={items} ariaLabel="Example" />);
    const region = screen.getByRole('region', { name: 'Example' });
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('labels each slide as a group with its position', () => {
    render(<Carousel items={items} />);
    const slides = screen.getAllByRole('group');
    expect(slides).toHaveLength(3);
    expect(slides[0]).toHaveAttribute('aria-roledescription', 'slide');
    expect(slides[0]).toHaveAttribute('aria-label', 'Slide 1 of 3');
    expect(slides[2]).toHaveAttribute('aria-label', 'Slide 3 of 3');
  });

  it('renders one dot per slide with accessible names', () => {
    render(<Carousel items={items} />);
    const dots = screen.getAllByRole('button', { name: /go to slide/i });
    expect(dots).toHaveLength(3);
  });

  it('renders accessible prev/next buttons', () => {
    render(<Carousel items={items} />);
    expect(
      screen.getByRole('button', { name: 'Previous slide' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next slide' }),
    ).toBeInTheDocument();
  });

  it('renders nothing when there are no items', () => {
    const { container } = render(<Carousel items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a pause control when autoplay is enabled', () => {
    render(<Carousel items={items} autoplay />);
    expect(screen.getByRole('button', { name: 'Autoplay' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('does not render a pause control when autoplay is disabled', () => {
    render(<Carousel items={items} />);
    expect(
      screen.queryByRole('button', { name: 'Autoplay' }),
    ).not.toBeInTheDocument();
  });
});
