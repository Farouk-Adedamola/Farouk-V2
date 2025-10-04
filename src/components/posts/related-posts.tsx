'use client';

import { useState } from 'react';

import Text from '../Text/text';
import { Button } from '../ui/button';
import PostCard from '@/components/posts/post-card';
import { Post } from '@/types/post';

const INITIAL_NUM_POSTS = 6;
const ADDITIONAL_NUM_POSTS = 6;

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  const [numPosts, setNumPosts] = useState(INITIAL_NUM_POSTS);

  const handleLoadMore = () => {
    setNumPosts((prevNumPosts) => prevNumPosts + ADDITIONAL_NUM_POSTS);
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className=" flex !w-full flex-col">
      <Text font="figtree" className="mb-4 text-3xl font-bold text-white">
        Related Posts
      </Text>
      <div className=" grid !w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.slice(0, numPosts).map((post) => (
          <div key={post.slug} className="w-full transition-all duration-300  ">
            <PostCard post={post} />
          </div>
        ))}
      </div>
      {numPosts < posts.length && (
        <Button
          variant="default"
          size="lg"
          onClick={handleLoadMore}
          className="mt-10 self-center rounded-3xl border border-lightTheme-text bg-white px-8 py-2 text-black opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100"
          type="button"
        >
          Load More
        </Button>
      )}
    </section>
  );
}
