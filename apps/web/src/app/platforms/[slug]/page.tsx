import { notFound } from 'next/navigation';
import { ComingSoon } from '@/components/coming-soon';
import { PLATFORMS } from '@/content/platforms';

export function generateStaticParams() {
  return PLATFORMS.map((platform) => ({ slug: platform.slug }));
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const platform = PLATFORMS.find((p) => p.slug === slug);
  if (!platform) notFound();
  return <ComingSoon title={platform.name} description={platform.tagline} />;
}
