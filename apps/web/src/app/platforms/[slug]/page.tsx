import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Carousel, Hero, SectionHeading, StatusBadge } from '@prime-agentic/ui';
import { ComingSoon } from '@/components/coming-soon';
import { CTABand } from '@/components/cta-band';
import { FAQ } from '@/components/faq';
import { PLATFORMS } from '@/content/platforms';
import { getPlatformContent } from '@/content/platforms/index';
import { getPlatformDemo } from '@/mocks';

const DemoViewer = dynamic(
  () => import('@prime-agentic/ui').then((m) => m.DemoViewer),
  {
    loading: () => (
      <div className="min-h-72 animate-pulse rounded-lg border border-border bg-surface motion-reduce:animate-none" />
    ),
  },
);

function Disclaimer({ text }: { text: string }) {
  return (
    <p className="rounded-md bg-warning-soft px-4 py-3 text-sm text-warning">
      {text}
    </p>
  );
}

export function generateStaticParams() {
  return PLATFORMS.map((platform) => ({ slug: platform.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const platform = PLATFORMS.find((p) => p.slug === slug);
  const content = platform
    ? await getPlatformContent(platform.slug)
    : undefined;
  return {
    title: platform ? `${platform.name} — Prime Agentic` : 'Prime Agentic',
    description: content?.hero.outcome ?? platform?.tagline,
    robots: platform && !content ? { index: false, follow: true } : undefined,
  };
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const platform = PLATFORMS.find((p) => p.slug === slug);
  if (!platform) notFound();

  const content = await getPlatformContent(platform.slug);
  if (!content) {
    return <ComingSoon title={platform.name} description={platform.tagline} />;
  }
  const demo = await getPlatformDemo(platform.slug);

  const featureItems = content.features.map((feature) => (
    <div
      key={feature.title}
      className="flex h-full flex-col gap-2 rounded-md border border-border bg-surface p-6"
    >
      <h3 className="text-lg font-semibold text-ink">{feature.title}</h3>
      <p className="text-muted">{feature.description}</p>
    </div>
  ));

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl">
        <div className="px-4 pt-10 md:px-6">
          <StatusBadge status={platform.status} />
        </div>
        <Hero
          eyebrow={platform.name}
          title={content.hero.outcome}
          subtitle={content.hero.description}
          ctas={[
            {
              label: 'Request a demo',
              href: `/contact?platform=${platform.slug}`,
            },
          ]}
        />
        {content.disclaimer ? (
          <div className="px-4 pb-10 md:px-6">
            <Disclaimer text={content.disclaimer} />
          </div>
        ) : null}
      </section>

      {/* Problem / outcome */}
      <section className="bg-bg-subtle py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="text-2xl font-semibold text-ink">
              {content.problem.title}
            </h2>
            <p className="mt-3 text-muted">{content.problem.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">
              {content.outcome.title}
            </h2>
            <p className="mt-3 text-muted">{content.outcome.description}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <SectionHeading eyebrow="Features" title="What it does" />
        <div className="mt-10">
          <Carousel
            items={featureItems}
            variant="cards"
            showDots={false}
            ariaLabel="Features"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-bg-subtle py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <SectionHeading eyebrow="How it works" title="Three steps" />
          <ol className="mt-10 space-y-6">
            {content.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Interactive demo */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <SectionHeading
          eyebrow="Demo"
          title="See it in action"
          description="An illustrative walkthrough with mock data."
        />
        <div className="mt-10">
          {demo ? (
            <DemoViewer demo={demo} />
          ) : (
            <p className="text-muted">Demo coming soon.</p>
          )}
          {content.disclaimer ? (
            <div className="mt-4">
              <Disclaimer text={content.disclaimer} />
            </div>
          ) : null}
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-bg-subtle py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading eyebrow="Use cases" title="Where it applies" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="rounded-md border border-border bg-surface p-6"
              >
                <h3 className="text-lg font-semibold text-ink">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-muted">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mt-10">
          <FAQ items={content.faqs} />
        </div>
      </section>

      {/* Page-footer disclaimer */}
      {content.disclaimer ? (
        <div className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
          <Disclaimer text={content.disclaimer} />
        </div>
      ) : null}

      <CTABand
        title="See it for your workflow"
        description="Request a demo and we'll walk through the approach against your workflow."
        ctas={[
          {
            label: 'Request a demo',
            href: `/contact?platform=${platform.slug}`,
          },
        ]}
      />
    </>
  );
}
