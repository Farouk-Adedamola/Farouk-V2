'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { ArrowRightIcon } from 'lucide-react';

import Text from '../Text/text';
import { Button } from '../ui/button';
// import Action from '@/components/button/action';
// import { Button } from '@/components/Button/button';
import Paginate from '@/components/paginate';
import PostCard from '@/components/posts/post-card';
import usePosts from '@/hooks/use-posts';
import { Post } from '@/types/post';

export default function PostsGrid({
  allPosts,
  paginate,
  moreBtn,
}: {
  allPosts: Post[];
  paginate?: boolean;
  moreBtn?: boolean;
}) {
  const { posts, totalPages } = usePosts(allPosts);
  const rootRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  return (
    <section
      ref={rootRef}
      className={`flex w-full scroll-mt-12 flex-col items-center ${
        moreBtn && 'section_layout'
      } `}
    >
      {moreBtn && (
        <div className="self-start">
          <Text
            font="figtree"
            className="mb-8 !text-[30px] font-medium lg:!text-[48px]"
          >
            Selected Posts{' '}
            <span className="inline-block h-4 w-4 rounded-full bg-emerald-light"></span>
          </Text>
        </div>
      )}

      {posts.length ? (
        <ul
          id="posts-grid"
          className={`mb-[64px] grid w-full grid-cols-1 items-start justify-start gap-x-8  gap-y-8 md:grid-cols-2 xl:grid-cols-3 ${
            moreBtn ? '!gap-y-8' : 'gap-y-16'
          }`}
        >
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-center text-lg">No matching posts found</p>
      )}
      {moreBtn && (
        <Button
          variant="default"
          size="lg"
          className="flex min-w-fit gap-2 bg-white font-bold text-black hover:bg-white hover:text-black"
          onClick={() => router.push('/blog')}
        >
          <span className="font-figtree text-[18px] font-bold">
            View More Posts
          </span>
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
      {paginate && (
        <Paginate totalPages={totalPages} elementToScroll={rootRef.current} />
      )}
    </section>
  );
}
