import * as React from 'react';

export interface CarouselProps {
  items: React.ReactNode[];
  variant?: 'hero' | 'cards' | 'logos' | 'story';
}

export function Carousel({ items, variant = 'cards' }: CarouselProps) {
  return (
    <div role="region" aria-roledescription="carousel" data-variant={variant}>
      {items}
    </div>
  );
}
