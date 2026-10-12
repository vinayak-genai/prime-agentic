import type { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import { getPlatformContent } from '@/content/platforms/index';

export default async function PlatformLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getPlatformContent(slug);
  return (
    <>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer disclaimer={content?.disclaimer} />
    </>
  );
}
