import { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/react';

import { display, mono } from './fonts';
import Intro from '@/components/site/Intro';
import { jsonLd, siteConfig } from '@/config/seo';
import { INTRO_BOOT_SCRIPT } from '@/lib/intro';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.author.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico' },
  manifest: '/manifest.json',
  themeColor: '#08080a',
  colorScheme: 'dark',
  // viewport-fit=cover is what makes env(safe-area-inset-*) resolve on iOS,
  // which the fixed command bar and the sheet both depend on.
  viewport:
    'width=device-width, initial-scale=1, viewport-fit=cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <head>
        {/* Must run before first paint, or a returning visitor sees a flash
            of the intro before the skip is applied. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Intro />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
