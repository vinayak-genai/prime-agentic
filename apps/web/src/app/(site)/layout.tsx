import type { ReactNode } from 'react';
import { Footer } from '@/components/footer';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
