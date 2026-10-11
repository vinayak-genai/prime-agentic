export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const alignClass =
    align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className ?? ''}`}>
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold text-ink">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-lg text-muted">{description}</p>
      ) : null}
    </div>
  );
}
