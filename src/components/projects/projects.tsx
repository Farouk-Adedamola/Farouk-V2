'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';

// import Action from '@/components/Button/action';
// import { Button } from '@/components/Button/button';
import Text from '@/components/Text/text';
// import { Button } from '@/components/ui/Button/button';
import { Button } from '@/components/ui/button';
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
        <Button
          variant="default"
          size="lg"
          className="flex min-w-fit gap-2 bg-white font-bold text-black hover:bg-white hover:text-black"
          onClick={() => router.push('/projects')}
        >
          <span className="font-figtree text-[18px] font-bold">
            View More Projects
          </span>
          <ArrowRightIcon className="ml-2 h-4 w-4" />
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
      className={` flex flex-col lg:flex-row lg:gap-4 ${
        isReverse ? 'lg:flex lg:flex-row-reverse' : ''
      }`}
    >
      <div className="relative aspect-[16/9] h-[200px] w-full rounded-tl-lg rounded-tr-lg border border-lightTheme-text lg:h-full lg:max-w-[300px] lg:rounded-lg">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="rounded-tl-lg rounded-tr-lg object-cover lg:rounded-lg"
          priority
        />
      </div>
      <div className="w-full rounded-bl-lg rounded-br-lg border border-dashed border-lightTheme-text p-4 lg:rounded-lg">
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
