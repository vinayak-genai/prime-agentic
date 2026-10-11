'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { usePrefersReducedMotion } from './use-prefers-reduced-motion';

export type CarouselVariant = 'hero' | 'cards' | 'logos' | 'story';

export interface CarouselProps {
  /** Slide contents. Pass `loading="lazy"` on any <img> except the first hero slide. */
  items: React.ReactNode[];
  autoplay?: boolean;
  interval?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  variant?: CarouselVariant;
  ariaLabel?: string;
  className?: string;
}

/** Embla slide flex-basis per variant (mobile / md / lg). */
const SLIDE_BASIS: Record<CarouselVariant, string> = {
  hero: 'flex-[0_0_100%]',
  cards: 'flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%]',
  story: 'flex-[0_0_100%]',
  logos: 'flex-[0_0_auto]',
};

function Chevron({ direction }: { direction: 'prev' | 'next' }) {
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
      {direction === 'prev' ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

export function Carousel({
  items,
  autoplay = false,
  interval = 5000,
  loop = true,
  showDots = true,
  showArrows = true,
  variant = 'cards',
  ariaLabel = 'carousel',
  className,
}: CarouselProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const options = React.useMemo(
    () => ({
      loop,
      align: variant === 'story' ? ('center' as const) : ('start' as const),
      containScroll: 'trimSnaps' as const,
    }),
    [loop, variant],
  );

  const plugins = React.useMemo(
    () =>
      autoplay && !reducedMotion
        ? [
            Autoplay({
              delay: interval,
              stopOnMouseEnter: true,
              stopOnFocusIn: true,
            }),
          ]
        : [],
    [autoplay, reducedMotion, interval],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = React.useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = React.useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi],
  );
  const scrollTo = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollNext();
    }
  };

  if (items.length === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative ${className ?? ''}`}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {items.map((item, index) => (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${items.length}`}
              className={`min-w-0 ${SLIDE_BASIS[variant]}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-ink shadow-md outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Chevron direction="prev" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-ink shadow-md outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Chevron direction="next" />
          </button>
        </>
      )}

      {showDots && (
        <div className="flex justify-center gap-2 pt-4">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : undefined}
              className={`h-3 w-3 rounded-full p-0 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                index === selectedIndex
                  ? 'bg-accent'
                  : 'bg-border hover:bg-muted'
              }`}
            />
          ))}
        </div>
      )}

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Slide ${selectedIndex + 1} of ${items.length}`}
      </div>
    </div>
  );
}
