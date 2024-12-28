'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

import CategoryList from '@/components/category-list';
import { Post } from '@/types/post';

export default function PostCard({
  post: { slug, title, date, categories, cover, blurUrl },
}: {
  post: Post;
}) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="relative mx-auto max-w-[25rem] overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 dark:bg-gray-900 dark:hover:shadow-white/10">
        {/* Image Container with Overlay */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 z-10 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <Image
            src={cover}
            alt={`Cover image for ${title}`}
            fill
            className="transition-transform duration-700 group-hover:scale-110"
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={blurUrl}
          />
          <div className="absolute right-4 top-4 z-20">
            <ArrowUpRight
              className="translate-y-2 transform text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              size={24}
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="flex h-52 flex-col border-t border-gray-100 p-6 dark:border-gray-800">
          <time className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {date}
          </time>
          <h3 className="mb-4 line-clamp-2 text-xl font-bold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </h3>
          <div className="mt-auto">
            <CategoryList categories={categories} />
          </div>
        </div>

        {/* Bottom Gradient Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 transform bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-500 group-hover:scale-x-100" />
      </article>
    </Link>
  );
}
