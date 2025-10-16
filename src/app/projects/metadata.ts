import { Metadata } from 'next';
import { siteConfig } from '@/config/seo';

export const projectsMetadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of web applications including laboratory management systems, business networking platforms, maternity care solutions, and bill payment systems. Built with React, Next.js, TypeScript, and modern web technologies.',
  keywords: [
    ...siteConfig.keywords,
    'web applications',
    'portfolio projects',
    'Genemod',
    'Orisuun',
    'laboratory management',
    'business networking',
    'maternity care platform',
  ],
  openGraph: {
    title: 'Projects - Farouk Adedamola',
    description:
      'Portfolio of scalable web applications and software solutions built with modern technologies.',
    url: `${siteConfig.url}/projects`,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Farouk Adedamola',
    description:
      'Portfolio of scalable web applications and software solutions built with modern technologies.',
  },
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

