/**
 * Yearly retro — one entry per year.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ HIGHLIGHTS are factual, taken from the CV in /public/docs.           │
 * │ LEARNT and IMPROVING are DRAFTS. They are a starting shape, not your │
 * │ words — rewrite them before this goes live. Nobody can write your    │
 * │ reflection for you, and a recruiter can tell.                        │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * To add next year: append an entry. The rail, the counts and the section
 * heading all derive from this array, so nothing else needs touching.
 * Drop images in /public/images and run `python3 scripts/blur.py`.
 */

export type RetroImage = {
  src: string;
  alt: string;
};

export type RetroYear = {
  year: number;
  /** A short theme for the year — this is the line people remember. */
  theme: string;
  highlights: string[];
  learnt: string[];
  improving: string[];
  images?: RetroImage[];
};

export const retros: RetroYear[] = [
  {
    year: 2026,
    theme: 'Shipping AI that people actually call',
    highlights: [
      'Took the NKIRU RAG system from prototype to handling real client calls, cutting support-agent workload by 30%.',
      'Shipped an AI-first conversational assistant for LottoNowNow that absorbs FAQ and support traffic.',
      'Rebuilt this site from the ground up — one page, self-hosted type, no CMS.',
    ],
    learnt: [
      'Retrieval quality is a data problem long before it is a model problem. Most of my wins came from how documents were chunked and labelled, not from prompt wording.',
      'An LLM feature without an evaluation loop is a demo, not a product.',
    ],
    improving: [
      'Writing down what I ship, while I ship it, instead of reconstructing it months later.',
      'Saying no to work that does not compound.',
    ],
  },
  {
    year: 2025,
    theme: 'Enterprise scale, and the weight that comes with it',
    highlights: [
      'Led frontend for a multi-tenant ERP serving 11 PLC, Ardova and Nigerian Breweries.',
      'Designed role-based access and multi-tenant auth across many organisations on Firebase.',
      'Cut application load times by 40% across web and React Native.',
      'Scaled WAKASUB past 5,000 verified users and ₦10M+ in quarterly volume.',
    ],
    learnt: [
      'Multi-tenancy is an access-control problem wearing a UI costume. Every screen is a permissions question first.',
      'Performance work that is not measured is just refactoring with better marketing.',
    ],
    improving: [
      'Pushing back earlier when a requirement will not survive contact with real users.',
      'Writing tests for the parts I am most confident about, which is where I am most often wrong.',
    ],
  },
  {
    year: 2024,
    theme: 'From building screens to owning systems',
    highlights: [
      'Moved into senior frontend work at Serve Consulting in November.',
      'Shipped AI product features on the Vercel AI SDK, including real-time streaming generation.',
      'Migrated WAKASUB off Laravel/React onto Next.js, PostgreSQL and Supabase.',
    ],
    learnt: [
      'A migration nobody notices is the highest compliment the work can get.',
      'Clean architecture earns its keep on the third feature, not the first.',
    ],
    improving: [
      'Estimating honestly instead of optimistically.',
      'Reading more code written by people better than me.',
    ],
  },
  {
    year: 2023,
    theme: 'Depth over breadth',
    highlights: [
      'Optimised the GraphQL layer on a Gatsby.js lab platform, cutting response time by 27%.',
      'Integrated Stripe, multi-step KYC and the financial workflows behind them.',
      'Finished a B.Sc. in Mathematics at the University of Abuja.',
    ],
    learnt: [
      'Most slow frontends are slow because of what they ask for, not how they render it.',
      'Mathematics did not teach me to code. It taught me to sit with a problem I cannot yet solve.',
    ],
    improving: [
      'Explaining technical trade-offs to people who do not write code.',
      'Finishing things before starting the next one.',
    ],
  },
  {
    year: 2022,
    theme: 'Range — healthcare, labs, payments, dashboards',
    highlights: [
      'Joined Local Coders and shipped across healthcare, lab management, payments and admin products.',
      'Delivered interfaces for a birth management system and an AI product-description generator.',
    ],
    learnt: [
      'Working across unrelated domains in one year taught me more about interface design than any single product could.',
      'The hardest part of a dashboard is deciding what not to show.',
    ],
    improving: [
      'Asking more questions before writing the first component.',
    ],
  },
  {
    year: 2021,
    theme: 'Starting',
    highlights: [
      'First engineering role, at Lanatus Systems, turning static designs into React interfaces.',
      'Refactored a legacy class-component codebase into functional components.',
    ],
    learnt: [
      'Reading a codebase you did not write is a separate skill from writing one.',
    ],
    improving: [
      'Everything, mostly.',
    ],
  },
];

export const retroRange = `${retros[retros.length - 1].year}–${retros[0].year}`;
