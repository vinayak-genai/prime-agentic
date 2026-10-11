import Link from 'next/link';

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-accent">
        Coming soon
      </p>
      <h1 className="text-4xl font-semibold text-ink">{title}</h1>
      {description ? <p className="text-lg text-muted">{description}</p> : null}
      <Link
        href="/"
        className="text-accent underline underline-offset-4 hover:text-accent-hover"
      >
        Back to home
      </Link>
    </div>
  );
}
