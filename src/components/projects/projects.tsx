'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';

import Text from '@/components/Text/text';
import { Button } from '@/components/ui/button';
import { ProjectProps } from '@/utils/data';

type ProjectSectionProps = {
  data: ProjectProps[];
};

const ProjectsSection = ({ data }: ProjectSectionProps) => {
  const newData = data.slice(0, 3);
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsExpanded(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFirstHover = (index: number) => {
    if (!isMobile) {
      setHoveredIndex(index);
      if (!isExpanded) {
        setIsExpanded(true);
      }
    }
  };

  return (
    <section className="section_layout w-full">
      <Text
        font="figtree"
        className="mb-8 !text-[30px] !font-medium lg:!text-[48px]"
      >
        Featured Projects{' '}
        <span className="inline-block h-4 w-4 rounded-full bg-emerald-light"></span>
      </Text>

      <div className="relative mx-auto w-full pt-8">
        <div
          className={`relative w-full ${isMobile ? 'space-y-6' : 'h-[420px]'}`}
        >
          {isMobile ? (
            <div className="flex flex-col gap-6">
              {newData.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  total={newData.length}
                  isHovered={false}
                  isExpanded={true}
                  isMobile={true}
                  onHover={() => {}}
                  onLeave={() => {}}
                />
              ))}
            </div>
          ) : (
            <>
              {newData.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  total={newData.length}
                  isHovered={hoveredIndex === index}
                  isExpanded={isExpanded}
                  isMobile={false}
                  onHover={() => handleFirstHover(index)}
                  onLeave={() => setHoveredIndex(null)}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <Button
          variant="default"
          size="lg"
          className="flex min-w-fit cursor-pointer gap-2 bg-white font-bold text-black hover:bg-white hover:text-black"
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
  total,
  isHovered,
  isExpanded,
  isMobile,
  onHover,
  onLeave,
}: {
  project: ProjectProps;
  index: number;
  total: number;
  isHovered: boolean;
  isExpanded: boolean;
  isMobile: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.1,
        }}
        className="relative h-auto w-full"
      >
        <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-darkTheme-primary-dark to-darkTheme-primary p-5 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-emerald-light/30 md:p-6">
          <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-light/20 text-lg font-bold text-emerald-light backdrop-blur-sm md:h-12 md:w-12 md:text-2xl">
            {index + 1}
          </div>

          <div className="flex flex-col">
            <div className="mb-3">
              <Text
                font="figtree"
                size="md"
                className="mb-2 font-bold leading-tight text-white"
              >
                {project.name}
              </Text>
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-emerald-light transition-colors hover:text-emerald-light/80 md:text-sm"
              >
                <ExternalLinkIcon className="h-3 w-3 md:h-4 md:w-4" />
                View Project
              </Link>
            </div>

            <Text
              size="sm"
              font="figtree"
              className="mb-4 leading-relaxed text-gray-300"
            >
              {project.description}
            </Text>

            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-emerald-light/20 bg-emerald-light/10 px-2 py-0.5 text-xs font-medium text-emerald-light"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-light/0 via-emerald-light/50 to-emerald-light/0" />
        </div>
      </motion.div>
    );
  }

  const getCardStyle = () => {
    if (isExpanded) {
      const totalGap = (total - 1) * 16;
      const availableWidth = `calc(100% - ${totalGap}px)`;
      const cardWidth = `calc(${availableWidth} / ${total})`;
      const leftPosition = `calc((${cardWidth} + 16px) * ${index})`;

      return {
        left: leftPosition,
        top: 0,
        width: cardWidth,
        transform: 'none',
        rotate: 0,
        scale: 1,
        zIndex: isHovered ? total + 1 : total - index,
      };
    }

    const baseRotation = (index - (total - 1) / 2) * 3;
    const stackOffset = index * 8;
    const baseScale = 1 - index * 0.03;

    return {
      left: '50%',
      top: stackOffset,
      width: '100%',
      maxWidth: '600px',
      transform: 'translateX(-50%)',
      rotate: baseRotation,
      scale: baseScale,
      zIndex: total - index,
    };
  };

  const style = getCardStyle();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        left: style.left,
        top: style.top,
        width: style.width,
        maxWidth: style.maxWidth,
        transform: style.transform,
        rotate: style.rotate,
        scale: style.scale,
        zIndex: style.zIndex,
      }}
      transition={{
        duration: 0.6,
        delay: isExpanded ? index * 0.15 : 0,
        type: 'spring',
        stiffness: 180,
        damping: 22,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="absolute h-[420px] w-full !max-w-[unset] cursor-pointer"
      style={{
        transformOrigin: 'center center',
      }}
    >
      <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-darkTheme-primary-dark to-darkTheme-primary p-5 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-emerald-light/30 md:p-6">
        <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-light/20 text-2xl font-bold text-emerald-light backdrop-blur-sm">
          {index + 1}
        </div>

        <div className="flex h-full flex-col">
          <div className="mb-3">
            <Text
              font="figtree"
              size="md"
              className="mb-2 font-bold leading-tight text-white"
            >
              {project.name}
            </Text>
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-emerald-light transition-colors hover:text-emerald-light/80 md:text-sm"
            >
              <ExternalLinkIcon className="h-3 w-3 md:h-4 md:w-4" />
              View Project
            </Link>
          </div>

          <Text
            size="sm"
            font="figtree"
            className="mb-4 line-clamp-4 flex-grow leading-relaxed text-gray-300"
          >
            {project.description}
          </Text>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-emerald-light/20 bg-emerald-light/10 px-2 py-0.5 text-xs font-medium text-emerald-light"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 4 && (
              <span className="rounded-full border border-emerald-light/20 bg-emerald-light/10 px-2 py-0.5 text-xs font-medium text-emerald-light">
                +{project.tools.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-light/0 via-emerald-light/50 to-emerald-light/0" />
      </div>
    </motion.div>
  );
};
