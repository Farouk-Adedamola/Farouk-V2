'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import Text from '@/components/Text/text';
import { Projectdata } from '@/utils/data';

export default function ProjectsPage() {
  return (
    <div className="section_layout mx-auto w-full max-w-[1280px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <Text
          font="figtree"
          className="mb-4 !text-[36px] font-bold md:!text-[48px]"
        >
          All Projects{' '}
          <span className="inline-block h-4 w-4 rounded-full bg-emerald-light"></span>
        </Text>
        <Text font="figtree" size="sm" className="text-gray-400">
          A collection of projects I&apos;ve built and contributed to
        </Text>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Projectdata.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
            className="group relative"
          >
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-darkTheme-primary-dark to-darkTheme-primary shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-emerald-light/30 hover:shadow-2xl">
              <div className="absolute -right-1 -top-1 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-light/20 text-lg font-bold text-emerald-light backdrop-blur-sm">
                {index + 1}
              </div>

              {project.imageUrl && (
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkTheme-primary-dark/90 to-transparent opacity-60" />
                </div>
              )}

              <div className="flex flex-col p-5">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <Text
                    font="figtree"
                    size="md"
                    className="font-bold leading-tight text-white"
                  >
                    {project.name}
                  </Text>
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex-shrink-0 rounded-full bg-emerald-light/10 p-2 transition-all hover:bg-emerald-light"
                  >
                    <ArrowUpRight className="h-4 w-4 text-emerald-light transition-colors group-hover/link:text-black" />
                  </Link>
                </div>

                <Text
                  size="sm"
                  font="figtree"
                  className="mb-4 line-clamp-3 leading-relaxed text-gray-300"
                >
                  {project.description}
                </Text>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {project.tools.slice(0, 5).map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-emerald-light/20 bg-emerald-light/10 px-2.5 py-1 text-xs font-medium text-emerald-light"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 5 && (
                    <span className="rounded-full border border-emerald-light/20 bg-emerald-light/10 px-2.5 py-1 text-xs font-medium text-emerald-light">
                      +{project.tools.length - 5}
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-light/0 via-emerald-light/50 to-emerald-light/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
