import { Button } from './button';

export interface HeroCTA {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctas?: HeroCTA[];
  align?: 'left' | 'center';
  className?: string;
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  ctas = [],
  align = 'left',
  className,
}: HeroProps) {
  const alignClass =
    align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div
      className={`flex min-h-[20rem] flex-col justify-center px-6 py-16 md:min-h-[24rem] md:px-12 ${alignClass} ${className ?? ''}`}
    >
      <div className="flex max-w-2xl flex-col gap-5">
        {eyebrow ? (
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-4xl font-semibold text-ink md:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="text-lg text-muted md:text-xl">{subtitle}</p>
        ) : null}
        {ctas.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {ctas.map((cta) => (
              <Button
                key={`${cta.href}-${cta.label}`}
                href={cta.href}
                variant={cta.variant ?? 'primary'}
                size="lg"
              >
                {cta.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
