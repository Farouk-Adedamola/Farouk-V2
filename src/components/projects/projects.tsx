import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import Button from '../Button/button';
import Text from '../Text/text';
import { ProjectProps } from '@/utils/data';

type ProjectSectionProps = {
  data: ProjectProps[];
};

const ProjectsSection = ({ data }: ProjectSectionProps) => {
  const newData = data.slice(0, 2);
  const router = useRouter();

  return (
    <section className="section_layout">
      <Text font="figtree" weight="bold" size="xs" className="mb-8">
        Featured Projects{' '}
        <span className="inline-block h-4 w-4 rounded-full bg-emerald-light"></span>
      </Text>
      <div className="mb-12 grid grid-cols-1 gap-8">
        {newData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button onClick={() => router.push('/projects')}>
          View More Projects
        </Button>
      </div>
    </section>
  );
};

export default ProjectsSection;

const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectProps;
  index: number;
}) => {
  const isReverse = index % 2 === 1;

  return (
    <div
      className={` flex flex-col desktop-screen:flex-row desktop-screen:gap-4 ${
        isReverse ? 'desktop-screen:flex desktop-screen:flex-row-reverse' : ''
      }`}
    >
      <div className="relative h-full w-full rounded-lg border border-lightTheme-text desktop-screen:max-w-[300px]">
        <Image
          src={project.imageUrl}
          alt={project.name}
          layout="fill"
          className="h-full w-[300px] object-cover"
        />
      </div>
      <div className="rounded-lg border border-lightTheme-text p-4">
        <Text font="figtree" weight="bold" size="lg" className="mb-2" header>
          {project.name}
        </Text>
        <Text
          description
          weight="normal"
          font="figtree"
          size="md"
          className="mb-4 text-customGray-base"
        >
          {project.description}
        </Text>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tools.map((tool, index) => (
            <span
              key={index}
              className="cursor-pointer rounded-full bg-darkTheme-primary px-3 py-1 font-figtree text-sm text-lightTheme-text transition-all duration-300 hover:bg-transparent "
            >
              {tool}
            </span>
          ))}
        </div>
        <Link
          href={project.liveUrl}
          className="inline-flex items-center text-emerald-light hover:text-emerald-deep"
        >
          View Live Site →
        </Link>
      </div>
    </div>
  );
};
