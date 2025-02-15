import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Text from '@/components/Text/text';
import { Projectdata } from '@/utils/data';

export const metadata = {
  title: 'Projects',
  description: 'This is projects page.',
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <Text font="figtree" className="mb-4 text-4xl font-bold">
          Featured Projects
        </Text>
        <Text className="text-gray-400">
          A collection of projects I&apos;ve worked on
        </Text>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {Projectdata.map((project) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-xl bg-gray-900/50 p-4 transition-all hover:bg-gray-900/70"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={project.imageUrl}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <Text font="figtree" className="text-xl font-bold">
                  {project.name}
                </Text>
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Visit Site
                </Link>
              </div>

              <Text className="text-gray-400">{project.description}</Text>

              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
