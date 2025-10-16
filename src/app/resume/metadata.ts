import { Metadata } from 'next';
import { siteConfig } from '@/config/seo';

export const resumeMetadata: Metadata = {
  title: 'Resume',
  description:
    'View and download the professional resume of Farouk Adedamola. 3+ years of experience in frontend development with expertise in React, Next.js, TypeScript, GraphQL, and modern web technologies.',
  keywords: [
    ...siteConfig.keywords,
    'resume',
    'CV',
    'curriculum vitae',
    'professional experience',
    'work history',
    'download resume',
  ],
  openGraph: {
    title: 'Resume - Farouk Adedamola',
    description:
      'Professional resume showcasing 3+ years of frontend engineering experience.',
    url: `${siteConfig.url}/resume`,
    siteName: siteConfig.name,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume - Farouk Adedamola',
    description:
      'Professional resume showcasing 3+ years of frontend engineering experience.',
  },
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
};

