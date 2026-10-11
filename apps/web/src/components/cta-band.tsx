import { Button } from '@prime-agentic/ui';

export interface CTABandProps {
  title: string;
  description?: string;
  ctas: { label: string; href: string }[];
}

export function CTABand({ title, description, ctas }: CTABandProps) {
  return (
    <section className="bg-accent-soft">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-6">
        <h2 className="text-3xl font-semibold text-ink">{title}</h2>
        {description ? (
          <p className="mt-3 text-lg text-muted">{description}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {ctas.map((cta) => (
            <Button key={cta.href} href={cta.href} size="lg">
              {cta.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
