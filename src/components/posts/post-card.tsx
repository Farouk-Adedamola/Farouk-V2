'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

import Text from '../Text/text';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import CategoryList from '@/components/category-list';
import { Post } from '@/types/post';

export default function PostCard({
  post: { slug, title, date, categories },
}: {
  post: Post;
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative mx-auto block w-full"
    >
      <article className="  overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 dark:hover:shadow-lg dark:hover:shadow-white/5">
        {/* <div className="relative max-h-[280px] w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute right-4 top-4 z-20">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:bg-white/20">
              <ArrowUpRight
                className="text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                size={18}
              />
            </span>
          </div>
        </div> */}

        <div className="relative space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <time className="w-full whitespace-nowrap font-figtree text-sm font-medium text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
              {date}
            </time>
            <CategoryList categories={categories} />
          </div>

          <Text
            font="figtree"
            size="md"
            className="truncate  font-bold leading-tight tracking-tight text-gray-100 transition-colors duration-300 group-hover:text-white"
          >
            {title}
          </Text>
        </div>
      </article>
    </Link>
  );
}
