import { Carousel } from '@prime-agentic/ui';

const slides = ['One', 'Two', 'Three', 'Four', 'Five'].map((text) => (
  <div
    key={text}
    className="flex h-48 items-center justify-center rounded-md bg-accent-soft text-2xl text-ink"
  >
    Slide {text}
  </div>
));

export default function CarouselPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-12">
      <h1 className="text-4xl font-semibold">Carousel</h1>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Cards</h2>
        <Carousel items={slides} variant="cards" ariaLabel="Cards example" />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Hero</h2>
        <Carousel
          items={slides}
          variant="hero"
          ariaLabel="Hero example"
          autoplay
          interval={3000}
        />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Logos</h2>
        <Carousel
          items={slides}
          variant="logos"
          ariaLabel="Logos example"
          autoplay
          showDots={false}
          showArrows={false}
        />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Story</h2>
        <Carousel items={slides} variant="story" ariaLabel="Story example" />
      </section>
    </main>
  );
}
