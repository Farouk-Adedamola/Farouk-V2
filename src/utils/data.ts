export type ExperienceProps = {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  tools: string[];
};

export type ExperienceTypeProps = {
  jobs: ExperienceProps[];
  internships: ExperienceProps[];
};

export const AllJobExperience: ExperienceTypeProps = {
  jobs: [
    {
      title: 'Software Developer',
      company: 'Local-Coders Westernwells',
      duration: '2024 — PRESENT',
      location: 'Remote',
      description:
        'Building and maintaining web applications, collaborating with cross-functional teams to implement new features and best practices in web development.',
      tools: [
        'JavaScript',
        'TypeScript',
        'React',
        'Node.js',
        'TailwindCSS',
        'Git',
      ],
    },
    {
      title: 'Software Developer',
      company: 'Wakatech Services',
      duration: 'January, 2023 - June, 2023',
      location: 'Remote',
      description:
        'Led development of responsive web applications, implemented modern frontend architectures and participated in agile development processes.',
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
      title: 'Software Engineer Intern',
      company: 'Lanatus systems',
      duration: 'June, 2023 - September, 2023',
      location: 'Remote',
      description:
        'Contributed to frontend development projects, worked on UI components and implemented responsive designs.',
      tools: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Git', 'Jira'],
    },
    {
      title: 'Frontend Engineer Intern',
      company: 'Terra HQ',
      duration: 'January, 2023 - April, 2023',
      location: 'Remote',
      description:
        'Developed and maintained web applications, collaborated on UI/UX improvements and participated in code reviews.',
      tools: ['React', 'TailwindCSS', 'JavaScript', 'REST APIs', 'Git'],
    },
    {
      title: 'Frontend Engineer Intern',
      company: 'HNG',
      duration: 'October, 2022 - December, 2022',
      location: 'Remote',
      description:
        'Worked on frontend development tasks, implemented responsive designs and collaborated with senior developers.',
      tools: ['React', 'CSS3', 'JavaScript', 'Git', 'Agile'],
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
