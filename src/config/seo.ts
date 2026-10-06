export const siteConfig = {
  name: 'Farouk Adedamola',
  title: 'Farouk Adedamola — Senior Frontend, AI & Product Engineer',
  description:
    'Senior frontend, AI and product engineer in Lagos, Nigeria. Enterprise frontends for 11 PLC and Ardova, RAG systems in production, and WAKASUB — a payments platform serving 5,000+ users.',
  url: process.env.SITE_URL || 'https://farouk.dev',
  ogImage: '/og-image.png',
  ogImageAlt:
    'Farouk Adedamola — Senior Frontend Engineer, AI Engineer and Product Engineer. Enterprise frontends, production AI, and the judgment to know which problem you actually have.',
  keywords: [
    'Farouk Adedamola',
    'Product Engineer',
    'Senior Frontend Engineer',
    'AI Product Engineer',
    'AI Engineer',
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
  jobTitle: ['Senior Frontend Engineer', 'AI Engineer', 'Product Engineer'],
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
