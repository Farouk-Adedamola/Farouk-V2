export const siteConfig = {
  name: 'Farouk Adedamola',
  title: 'Farouk Adedamola — Product Engineer',
  description:
    'Product engineer in Lagos, Nigeria. Five years of frontend depth across multi-tenant ERP for 11 PLC and Ardova, RAG and LLM systems in production, and WAKASUB — a payments platform serving 5,000+ users.',
  url: process.env.SITE_URL || 'https://farouk.dev',
  ogImage: '/og-image.png',
  ogImageAlt:
    'Farouk Adedamola — Product Engineer. Frontend depth, AI systems, and the judgment to know which problem you actually have.',
  keywords: [
    'Farouk Adedamola',
    'Product Engineer',
    'Senior Frontend Engineer',
    'AI Product Engineer',
    'Frontend Engineer Lagos',
    'React Engineer',
    'Next.js Engineer',
    'TypeScript Engineer',
    'React Native Engineer',
    'RAG Engineer',
    'LLM Integration',
    'Anthropic Claude SDK',
    'Vercel AI SDK',
    'GraphQL',
    'Remote Software Engineer',
    'Nigeria Software Engineer',
  ],
  author: {
    name: 'Farouk Adedamola',
    email: 'eja.farouk.dev@gmail.com',
    twitter: '@Farouk_fish',
    github: 'https://github.com/Farouk-Adedamola',
    linkedin: 'https://www.linkedin.com/in/farouk-adedamola/',
  },
  links: {
    twitter: 'https://x.com/Farouk_fish',
    github: 'https://github.com/Farouk-Adedamola',
    linkedin: 'https://www.linkedin.com/in/farouk-adedamola/',
  },
};

/* Crawlers need an absolute URL. Next resolves relative share images against
   whatever host served the request, so this is spelled out. */
export const ogImageUrl = `${siteConfig.url}${siteConfig.ogImage}`;

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  image: ogImageUrl,
  email: siteConfig.author.email,
  jobTitle: 'Product Engineer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.github,
    siteConfig.links.linkedin,
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Sage Grey Technologies',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Abuja',
  },
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'React Native',
    'Node.js',
    'GraphQL',
    'PostgreSQL',
    'Retrieval-Augmented Generation',
    'Large Language Models',
    'Frontend Architecture',
  ],
  description: siteConfig.description,
};
