import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/header';
import { PLATFORMS } from '@/content/platforms';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://prime-agentic.com'),
  title:
    'Prime Agentic — Coordinated agentic AI for finance, recruiting, education, and industry',
  description:
    'Prime Agentic builds agentic AI platforms that plan, execute, and adapt — across wealth management, recruiting, education, and industrial IoT.',
  openGraph: {
    title: 'Prime Agentic',
    description: 'Four agentic platforms. One coordinated approach.',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header platforms={PLATFORMS} />
        {children}
      </body>
    </html>
  );
}
