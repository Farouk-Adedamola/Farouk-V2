import { Metadata } from 'next';

import { siteConfig } from '@/config/seo';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Farouk Adedamola, a Senior Frontend Engineer specializing in React, Next.js, and TypeScript. Discover my journey, skills, and passion for building exceptional web experiences.',
  keywords: [
    ...siteConfig.keywords,
    'about',
    'biography',
    'career',
    'skills',
    'frontend engineer background',
  ],
  openGraph: {
    title: 'About - Farouk Adedamola',
    description:
      'Learn more about my journey as a Frontend Engineer and software developer.',
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - Farouk Adedamola',
    description:
      'Learn more about my journey as a Frontend Engineer and software developer.',
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="font-figtree text-2xl font-bold">TBA yet to be updated</h1>
    </div>
  );
}
