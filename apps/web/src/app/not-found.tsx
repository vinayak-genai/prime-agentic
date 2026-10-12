import Link from 'next/link';
import { Footer } from '@/components/footer';

export default function NotFound() {
  return (
    <>
      <main id="main-content" className="flex-1">
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 py-24">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            404
          </p>
          <h1 className="text-4xl font-semibold text-ink">Page not found</h1>
          <p className="text-lg text-muted">
            We couldn&apos;t find the page you&apos;re looking for.
          </p>
          <Link
            href="/"
            className="text-accent underline underline-offset-4 hover:text-accent-hover"
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
