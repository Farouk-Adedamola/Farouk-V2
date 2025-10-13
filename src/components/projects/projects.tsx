'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';

import Text from '@/components/Text/text';
import { Button } from '@/components/ui/button';
import { ProjectProps } from '@/utils/data';

type ProjectSectionProps = {
  data: ProjectProps[];
};

const ProjectsSection = ({ data }: ProjectSectionProps) => {
  const newData = data.slice(0, 2);
  const router = useRouter();

  return (
    <section className="section_layout">
      <Text
        font="figtree"
        className="mb-8 !text-[30px] !font-medium lg:!text-[48px]"
      >
        Featured Projects{' '}
        <span className="inline-block h-4 w-4 rounded-full bg-emerald-light"></span>
      </Text>

      <div className="grid grid-cols-1 gap-8 pt-4 lg:grid-cols-2 lg:gap-12 lg:pt-5">
        {newData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          variant="default"
          size="lg"
          className="flex min-w-fit gap-2 bg-white font-bold text-black hover:bg-white hover:text-black cursor-pointer"
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
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="group backdrop-blur-sm"
  >
    <div className="group flex flex-col justify-between rounded-lg bg-darkTheme-primary-dark p-6 transition-all duration-500 hover:bg-darkTheme-primary lg:h-[222px]">
      <div className=" flex items-baseline justify-between">
        <Text
          font="figtree"
          size="md"
          className="flex items-center gap-2 font-semibold text-white "
        >
          {project.name}
          <Link
            href={project.liveUrl}
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <ExternalLinkIcon className="h-4 w-4 text-gray-400 hover:text-emerald-light" />
          </Link>
        </Text>
      </div>

      <div className="min-h-[100px] overflow-hidden">
        <Text
          size="sm"
          font="figtree"
          className="line-clamp-3 font-normal text-gray-400"
        >
          {project.description}
        </Text>
      </div>
      <div className="flex flex-wrap gap-2 self-end">
        {project.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full bg-[#1a2337] px-3 py-1 text-sm text-[#4fd1c5]"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);
