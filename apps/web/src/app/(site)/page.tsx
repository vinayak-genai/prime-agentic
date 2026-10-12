import {
  Carousel,
  Hero,
  PlatformCard,
  SectionHeading,
} from '@prime-agentic/ui';
import { AgentFlow } from '@/components/agent-flow';
import { CTABand } from '@/components/cta-band';
import {
  agenticApproach,
  ctaBand,
  heroSlides,
  platformShowcase,
  scenarios,
} from '@/content/home';
import { PLATFORMS } from '@/content/platforms';

const HERO_GRADIENT = {
  background:
    'linear-gradient(135deg, var(--color-accent-soft), var(--color-bg-subtle))',
};

export default function HomePage() {
  const heroItems = heroSlides.map((slide) => (
    <div key={slide.title} style={HERO_GRADIENT}>
      <Hero
        eyebrow={slide.eyebrow}
        title={slide.title}
        subtitle={slide.subtitle}
        ctas={[{ label: slide.ctaLabel, href: slide.ctaHref }]}
      />
    </div>
  ));

  const platformCards = PLATFORMS.map((platform) => (
    <PlatformCard
      key={platform.slug}
      name={platform.name}
      tagline={platform.tagline}
      status={platform.status}
      href={`/platforms/${platform.slug}`}
    />
  ));

  const scenarioItems = scenarios.items.map((scenario) => (
    <div
      key={scenario.title}
      className="flex h-full flex-col gap-3 rounded-md border border-border bg-surface p-6"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-accent">
        Illustrative &middot; {scenario.industry}
      </p>
      <h3 className="text-xl font-semibold text-ink">{scenario.title}</h3>
      <p className="text-muted">{scenario.description}</p>
    </div>
  ));

  return (
    <>
      <section>
        <Carousel
          items={heroItems}
          variant="hero"
          autoplay
          interval={6000}
          showArrows={false}
          ariaLabel="Hero"
        />
      </section>

      <section id="platforms" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <SectionHeading
          eyebrow={platformShowcase.eyebrow}
          title={platformShowcase.title}
          description={platformShowcase.description}
        />
        <div className="mt-10">
          <Carousel
            items={platformCards}
            variant="cards"
            showDots={false}
            ariaLabel="Platforms"
          />
        </div>
      </section>

      <section className="bg-bg-subtle py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow={agenticApproach.eyebrow}
            title={agenticApproach.title}
            description={agenticApproach.description}
          />
          <AgentFlow goal="One goal" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {agenticApproach.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-md border border-border bg-surface p-6"
              >
                <h3 className="text-lg font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-muted">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <SectionHeading
          eyebrow={scenarios.eyebrow}
          title={scenarios.title}
          description={scenarios.description}
        />
        <div className="mt-10">
          <Carousel
            items={scenarioItems}
            variant="story"
            showArrows
            ariaLabel="Illustrative scenarios"
          />
        </div>
      </section>

      <CTABand
        title={ctaBand.title}
        description={ctaBand.description}
        ctas={[{ label: 'Request a demo', href: '/contact' }]}
      />
    </>
  );
}
