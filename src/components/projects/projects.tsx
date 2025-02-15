'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

// import Action from '@/components/Button/action';
// import { Button } from '@/components/Button/button';
import Text from '@/components/Text/text';
import { ProjectProps } from '@/utils/data';

type ProjectSectionProps = {
  data: ProjectProps[];
};

const ProjectsSection = ({ data }: ProjectSectionProps) => {
  const newData = data.slice(0, 2);
  const router = useRouter();

  return (
    <section className="section_layout w-full">
      <Text
        font="figtree"
        className="mb-8 !text-[30px] !font-medium lg:!text-[48px]"
      >
        Featured Projects{' '}
        <span className="inline-block h-4 w-4 rounded-full bg-emerald-light"></span>
      </Text>
      <div className="mb-12 grid grid-cols-1 gap-8">
        {newData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      <div className="flex justify-center">
        {/* <Action onClick={() => router.push('/projects')}>
          View More Projects
        </Action> */}
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
      className={` flex flex-col xl:flex-row xl:gap-4 ${
        isReverse ? 'xl:flex xl:flex-row-reverse' : ''
      }`}
    >
      <div className="relative aspect-[16/9] h-[200px] w-full rounded-tl-lg rounded-tr-lg border border-lightTheme-text xl:h-full xl:max-w-[300px] xl:rounded-lg">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="rounded-lg object-cover"
          priority
        />
      </div>
      <div className="w-full rounded-lg border border-dashed border-lightTheme-text p-4">
        <Text font="figtree" size="lg" className="mb-2 font-bold" header>
          {project.name}
        </Text>
        <Text
          description
          font="figtree"
          size="md"
          className="mb-4 font-normal text-customGray-base"
        >
          {project.description}
        </Text>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tools.map((tool, index) => (
            <span
              key={index}
              className="cursor-pointer rounded-full bg-darkTheme-primary px-3 py-1 font-figtree text-sm text-lightTheme-text transition-all duration-700 hover:bg-transparent "
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
