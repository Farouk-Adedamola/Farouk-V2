'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  return (
    // <Link
    //   href={`/blog/${slug}`}
    //   className="group relative mx-auto block !w-full"
    // >
    // <article className=" !w-full overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 dark:hover:shadow-lg dark:hover:shadow-white/5">
    <div
      onClick={() => router.push(`/blog/${slug}`)}
      className="relative !w-full cursor-pointer space-y-4 overflow-hidden
    rounded-xl bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 dark:hover:shadow-lg dark:hover:shadow-white/5
    "
    >
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
    // </article>
    // </Link>
  );
}
