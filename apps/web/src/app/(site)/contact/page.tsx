import type { Metadata } from 'next';
import { LeadForm } from '@/components/lead-form';

export const metadata: Metadata = {
  title: 'Request a demo — Prime Agentic',
  description:
    'Request a demo of the Prime Agentic approach for your workflow.',
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ platform?: string }>;
}) {
  const { platform } = await searchParams;

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-16 md:px-6">
        <h1 className="text-4xl font-semibold text-ink">Request a demo</h1>
        <p className="mt-3 text-lg text-muted">
          Tell us about your workflow and we&apos;ll walk through the approach
          with you.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <LeadForm defaultPlatform={platform} />
      </section>
    </>
  );
}
