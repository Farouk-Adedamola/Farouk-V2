'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

import Text from '../Text/text';
import CategoryList from '@/components/category-list';
import { Post } from '@/types/post';

export default function PostCard({
  post: { slug, title, date, categories, cover, blurUrl },
}: {
  post: Post;
}) {
  return (
    <Link href={`/blog/${slug}`} className="group block w-full">
      <article className="relative mx-auto max-w-[25rem] overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 dark:hover:shadow-lg dark:hover:shadow-white/5">
        <div className="relative h-[280px] overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Image
            src={cover}
            alt={`Cover image for ${title}`}
            fill
            className="transition-all duration-500 group-hover:scale-105"
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={blurUrl}
          />
          <div className="absolute right-4 top-4 z-20">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:bg-white/20">
              <ArrowUpRight
                className="text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                size={18}
              />
            </span>
          </div>
        </div>

        <div className="relative space-y-4 p-6">
          <div className="flex items-center gap-4">
            <time className="font-figtree text-sm font-medium text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
              {date}
            </time>
            <CategoryList categories={categories} />
          </div>

          <Text
            font="figtree"
            size="md"
            className="line-clamp-2  font-bold leading-tight tracking-tight text-gray-100 transition-colors duration-300 group-hover:text-white"
          >
            {title}
          </Text>

          <div className="absolute bottom-0 left-0 h-[2px] w-full">
            <div className="h-full w-full scale-x-0 transform bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </div>
        </div>
      </article>
    </Link>
  );
}
