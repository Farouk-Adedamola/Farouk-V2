export type ExperienceProps = {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  tools: string[];
};

export type ExperienceTypeProps = {
  jobs: ExperienceProps[];
  internships: ExperienceProps[];
};

export const AllJobExperience: ExperienceTypeProps = {
  jobs: [
    {
      title: 'Frontend Engineer',
      company: 'Local-Coders Westernwells',
      duration: 'June 2023 — Present',
      location: 'Remote',
      description: [
        'Spearheaded the development of user interfaces for various projects, including birth management system, scientific research assistance site, business development portals and administrative dashboards',
        'Enhanced API efficiency by introducing optimized queries using GraphQL, reducing server response time by 40%',
        'Refactored project modules using clean architecture principles, ensuring scalability and maintainability',
        'Led performance optimizations across projects, achieving up to 35% faster page load times',
        'Delivered high-quality, reusable code adhering to Google JavaScript best practices',
      ],
      tools: [
        'React.js',
        'Next.js',
        'TypeScript',
        'Node.js',
        'Tailwind CSS',
        'GraphQL',
        'Git',
      ],
    },
    {
      title: 'Frontend Engineer',
      company: 'Wakatech Services',
      duration: 'January 2023 - June 2023',
      location: 'Remote',
      description: [
        'Led development of responsive web applications',
        'Implemented modern frontend architectures',
        'Participated in agile development processes',
        'Built interactive UI components using React and TypeScript',
        'Integrated REST APIs and managed state using Redux',
      ],
      tools: [
        'React',
        'Next.js',
        'TypeScript',
        'Redux',
        'Styled-Components',
        'REST APIs',
      ],
    },
  ],
  internships: [
    {
      title: 'Frontend Engineer Intern',
      company: 'Lanatus Systems',
      duration: 'June 2022 - October 2022',
      location: 'Remote',
      description: [
        'Designed and implemented React components, transforming static designs into interactive user interfaces',
        'Collaborated in brainstorming sessions to propose innovative design techniques and solutions',
        'Refactored legacy React class components into functional components, improving performance and readability',
        'Documented the codebase for better developer onboarding and clarity in future development',
      ],
      tools: ['React.js', 'JavaScript', 'CSS3', 'HTML5', 'Git', 'Jira'],
    },
    {
      title: 'Frontend Engineer Intern',
      company: 'HNG',
      duration: 'October 2022 - December 2022',
      location: 'Remote',
      description: [
        'Collaborated with intern teams to deliver a web application through all project stages',
        'Worked on UI development, meeting deadlines, and adhering to Agile methodologies',
        'Implemented responsive designs and collaborated with senior developers',
      ],
      tools: ['React.js', 'Tailwind CSS', 'JavaScript', 'Git', 'Agile'],
    },
    {
      title: 'Software Developer Intern',
      company: 'Terra HQ',
      duration: 'January 2022 - June 2022',
      location: 'Remote',
      description: [
        'Worked collaboratively within a team to develop web applications using vanilla Javascript',
        'Built interactive front-end components, integrating APIs to support backend operations',
        'Participated in Agile sprints to deliver key project milestones on time',
        'Developed and maintained web applications, collaborated on UI/UX improvements',
      ],
      tools: ['React', 'Tailwind CSS', 'JavaScript', 'REST APIs', 'Git'],
    },
  ],
};

export type ProjectProps = {
  id: string;
  name: string;
  description: string;
  tools: string[];
  liveUrl: string;
  imageUrl?: string | any;
};

export const Projectdata: ProjectProps[] = [
  {
    id: '1',
    name: 'E-Commerce Dashboard',
    description:
      'A comprehensive dashboard for managing online store operations, featuring real-time analytics, inventory management, and sales tracking.',
    tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    liveUrl: 'https://ecommerce-dashboard.demo',
    imageUrl: '/api/placeholder/600/400',
  },
  {
    id: '2',
    name: 'AI Content Generator',
    description:
      'An AI-powered platform that helps create high-quality content using advanced language models and intelligent formatting.',
    tools: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    liveUrl: 'https://ai-content-gen.demo',
    imageUrl: '/api/placeholder/600/400',
  },
  {
    id: '1',
    name: 'E-Commerce Dashboard',
    description:
      'A comprehensive dashboard for managing online store operations, featuring real-time analytics, inventory management, and sales tracking.',
    tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    liveUrl: 'https://ecommerce-dashboard.demo',
    imageUrl: '/api/placeholder/600/400',
  },
  {
    id: '2',
    name: 'AI Content Generator',
    description:
      'An AI-powered platform that helps create high-quality content using advanced language models and intelligent formatting.',
    tools: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    liveUrl: 'https://ai-content-gen.demo',
    imageUrl: '/api/placeholder/600/400',
  },
];
