/**
 * Single source of truth for every piece of copy on the page.
 * Mirrors "FAROUK ADEDAMOLA RESUME.pdf" in /public/docs.
 */

export const profile = {
  name: 'Farouk Adedamola',
  first: 'Farouk',
  last: 'Adedamola',
  /* The three hats, in the order the hero claims them. */
  titles: ['Senior Frontend Engineer', 'AI Engineer', 'Product Engineer'],
  title: 'Senior Frontend, AI & Product Engineer',
  experience: '5 years',
  lede: {
    before:
      'Enterprise frontends, production AI, and products owned end to end — with the judgment to know ',
    accent: 'which problem you actually have.',
  },
  location: 'Lagos, Nigeria',
  locationLine: 'Lagos, Nigeria — remote',
  since: 'Est. 2021',
  email: 'eja.farouk.dev@gmail.com',
  phone: '+234 706 790 2081',
  phoneHref: '+2347067902081',
  github: 'https://github.com/Farouk-Adedamola',
  githubHandle: 'Farouk-Adedamola',
  linkedin: 'https://www.linkedin.com/in/farouk-adedamola/',
  linkedinHandle: 'farouk-adedamola',
  resumePath: '/docs/FAROUK ADEDAMOLA RESUME.pdf',
  education: 'B.Sc. Mathematics · University of Abuja, 2023',
} as const;

export type Proof = { label: string; body: string };

export const proof: Proof[] = [
  {
    label: 'Frontend at scale',
    body: 'Led frontend for a multi-tenant ERP serving 11 PLC, Ardova and Nigerian Breweries — performance up 40%',
  },
  {
    label: 'AI in production',
    body: 'RAG call handling live for NKIRU — support-agent workload down 30%',
  },
  {
    label: 'Product shipped',
    body: 'Rebuilt WAKASUB’s platform and payment engines — 5,000+ verified users, ₦10M+ per quarter',
  },
];

export type Role = {
  period: string;
  title: string;
  company: string;
  location: string;
  points: string[];
  tools: string[];
};

export const roles: Role[] = [
  {
    period: 'Dec 2025 — Present',
    title: 'AI Product Engineer',
    company: 'Sage Grey Technologies',
    location: 'Lagos · Remote',
    points: [
      'Designed and maintained a Retrieval-Augmented Generation system powering automated client call handling for NKIRU, pairing vector retrieval with LLM inference — cut support-agent workload by 30%.',
      'Architected an AI-first conversational chatbot for LottoNowNow using NLP and LLM-driven dialogue to automate FAQ handling and customer support workflows.',
      'Integrated the Anthropic Claude SDK into a document processing and ingestion pipeline, using prompt engineering and structured extraction to organise large knowledge bases for retrieval.',
      'Built an in-browser rich-text editing experience on Tiptap for structured content creation inside AI-assisted workflows.',
    ],
    tools: [
      'RAG',
      'Anthropic Claude SDK',
      'LLM inference',
      'Vector retrieval',
      'NLP',
      'Tiptap',
      'Next.js',
      'TypeScript',
      'Python',
    ],
  },
  {
    period: 'Nov 2024 — Dec 2025',
    title: 'Senior Frontend Engineer',
    company: 'Serve Consulting',
    location: 'Lagos · Remote',
    points: [
      'Led frontend engineering for a multi-tenant SaaS/ERP platform serving 11 PLC, Ardova PLC and Nigerian Breweries across oil & gas, FMCG and logistics.',
      'Architected React and TypeScript applications covering order processing, logistics, fleet management and delivery operations.',
      'Led React Native development for real-time order tracking, and integrated Google Maps geolocation, geocoding and routing for route planning and delivery scheduling.',
      'Designed role-based access control and multi-tenant authentication on Firebase, securing access across many organisations and user roles.',
      'Improved application performance by 40% through data-fetching, rendering and architecture work on web and mobile.',
    ],
    tools: [
      'React',
      'TypeScript',
      'React Native',
      'Next.js',
      'Firebase',
      'Google Maps API',
      'Multi-tenant RBAC',
      'Tailwind CSS',
    ],
  },
  {
    period: 'Jan 2022 — Aug 2024',
    title: 'Fullstack Engineer',
    company: 'Local Coders',
    location: 'Abuja · Remote',
    points: [
      'Led frontend engineering across healthcare, scientific lab management, AI, payments, business development and enterprise administration products.',
      'Delivered interfaces for a birth management system, a lab management tool, an AI product-description generator, business portals and administrative dashboards.',
      'Built AI-powered features on the Vercel AI SDK, including real-time streaming and large-scale automated product description generation.',
      'Integrated Stripe payments and REST/GraphQL APIs for registration, multi-step KYC and core financial workflows.',
      'Optimised GraphQL queries on a Gatsby.js laboratory platform, reducing server response time by 27%.',
    ],
    tools: [
      'Gatsby.js',
      'GraphQL',
      'Vercel AI SDK',
      'Stripe',
      'Node.js',
      'TypeScript',
      'Clean architecture',
    ],
  },
  {
    period: 'Jun 2021 — Dec 2021',
    title: 'Frontend Developer',
    company: 'Lanatus Systems',
    location: 'India · Remote',
    points: [
      'Designed and implemented React components, turning static designs into interactive interfaces.',
      'Refactored legacy React class components into functional components, improving performance and readability.',
    ],
    tools: ['React', 'JavaScript', 'CSS3'],
  },
];

export type Project = {
  name: string;
  domain?: string;
  href?: string;
  image?: string;
  /** Used instead of a screenshot when there is no public shot to show. */
  plate?: { top: string; big: string; bottom: string };
  blurb: string;
  kpi: string;
  tools: string[];
};

export const projects: Project[] = [
  {
    name: 'WAKASUB',
    domain: 'wakasub.com',
    href: 'https://wakasub.com',
    image: '/images/wakasub.png',
    blurb:
      'Nigerian VTU and digital payments platform — airtime, data, cable TV, electricity and gift cards. Migrated off Laravel/React onto Next.js, PostgreSQL and Supabase, and built the transaction, wallet, auth and rewards engines.',
    kpi: '5,000+ verified users · ₦10M+ per quarter',
    tools: [
      'Next.js',
      'React Native',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'Supabase',
      'Redis',
      'Capacitor',
    ],
  },
  {
    name: 'Hospitally',
    domain: 'hospitally.health',
    href: 'https://www.hospitally.health/',
    image: '/images/hospitally.png',
    blurb:
      'Healthcare directory for Nigeria that helps patients find verified hospitals — AI-powered natural language search, browsing by state, and a three-tier trust system separating community-listed, claimed and independently verified facilities.',
    kpi: '205+ treatment categories · 10+ states',
    tools: [],
  },
  {
    name: 'Genemod',
    domain: 'genemod.net',
    href: 'https://genemod.net',
    image: '/images/genemod.png',
    blurb:
      'Laboratory management platform for tracking samples and research results with real-time collaboration. Rebuilt the GraphQL query layer on Gatsby.js.',
    kpi: '−27% server response time',
    tools: ['Gatsby.js', 'TypeScript', 'GraphQL', 'Tailwind CSS'],
  },
  {
    name: 'Dayn Tracker',
    plate: {
      top: 'React Native · Supabase',
      big: 'Dayn',
      bottom: 'Debt tracking',
    },
    blurb:
      'Personal debt tracking for people who lend and borrow informally — who owes what, when it is due, and what it has cost so far.',
    kpi: 'Mobile · iOS & Android',
    tools: ['React Native', 'TypeScript', 'PostgreSQL', 'Supabase'],
  },
  {
    name: 'The Allies',
    domain: 'theallies.co',
    href: 'https://theallies.co',
    image: '/images/allies.png',
    blurb:
      'Pregnancy tracking and maternity care management with personalised health insights, built alongside a birth management system for clinical staff.',
    kpi: 'Healthcare · multi-role',
    tools: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS'],
  },
  {
    name: 'Squarebooks',
    plate: {
      top: 'React Native · Supabase',
      big: 'Squarebooks',
      bottom: 'Productivity',
    },
    blurb:
      'Personal productivity and task management, built around the way work actually arrives — in fragments, out of order, from four places at once.',
    kpi: 'Mobile · offline-first',
    tools: ['React Native', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  },
  {
    name: 'Orisuun',
    domain: 'orisuun.com',
    href: 'https://orisuun.com',
    image: '/images/orisuun.png',
    blurb:
      'Platform connecting Black-owned businesses with investors, mentors and professionals — multi-step KYC, Stripe payments and a matching layer.',
    kpi: 'Stripe · multi-step KYC',
    tools: ['Next.js', 'TypeScript', 'Stripe', 'Firebase'],
  },
];

/**
 * The three layers shown on the hero plane. Each is a real slice of the stack
 * paired with the work that proves it — a chip list on its own says nothing a
 * hundred other portfolios do not already say.
 */
export type StackLayer = {
  id: string;
  label: string;
  items: string[];
  proof: string;
};

export const stackLayers: StackLayer[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'React Native',
      'Gatsby',
      'Tailwind',
    ],
    proof: 'Multi-tenant ERP · 11 PLC, Ardova',
  },
  {
    id: 'platform',
    label: 'Platform',
    items: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'GraphQL'],
    proof: 'WAKASUB · 5,000+ users, ₦10M+/qtr',
  },
  {
    id: 'ai',
    label: 'AI',
    items: [
      'RAG pipelines',
      'Claude SDK',
      'Vector retrieval',
      'LLM inference',
      'Prompt engineering',
      'Doc ingestion',
    ],
    proof: 'NKIRU RAG call handling · −30% support load',
  },
];

export type Capability = { label: string; items: string[] };

export const capabilities: Capability[] = [
  {
    label: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'Python'],
  },
  {
    label: 'Frontend',
    items: [
      'React.js',
      'Next.js',
      'React Native',
      'Gatsby.js',
      'HTML5',
      'CSS3',
      'SCSS',
      'Tailwind CSS',
    ],
  },
  {
    label: 'Backend',
    items: [
      'Node.js',
      'NestJS',
      'Express',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'GraphQL',
      'REST',
      'Prisma',
    ],
  },
  {
    label: 'AI',
    items: [
      'LLM integration',
      'RAG',
      'Anthropic Claude SDK',
      'Vercel AI SDK',
      'Prompt engineering',
      'NLP',
      'Vector retrieval',
      'Document pipelines',
    ],
  },
];

export const sections = [
  { id: 'work', label: 'Work', note: `${roles.length} roles` },
  { id: 'projects', label: 'Projects', note: `${projects.length}` },
  { id: 'retro', label: 'Retro', note: 'Yearly' },
  { id: 'stack', label: 'Stack', note: 'Languages & tools' },
  { id: 'contact', label: 'Contact', note: 'Lagos, remote' },
] as const;
