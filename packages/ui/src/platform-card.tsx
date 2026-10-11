import { StatusBadge } from './status-badge';

export interface PlatformCardProps {
  name: string;
  tagline: string;
  status: 'In Development' | 'Early Access' | 'Live';
  href: string;
  icon?: React.ReactNode;
}

export function PlatformCard({
  name,
  tagline,
  status,
  href,
  icon,
}: PlatformCardProps) {
  return (
    <a
      href={href}
      className="flex h-full flex-col gap-4 rounded-md border border-border bg-surface p-6 text-left shadow-sm transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-lg font-semibold text-accent">
          {icon ?? name.charAt(0)}
        </span>
        <StatusBadge status={status} />
      </div>
      <h3 className="text-xl font-semibold text-ink">{name}</h3>
      <p className="text-muted">{tagline}</p>
      <span className="mt-auto pt-2 text-sm font-medium text-accent">
        Learn more &rarr;
      </span>
    </a>
  );
}
