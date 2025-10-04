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
    <section className=" flex flex-col">
      <Text font="figtree" className="mb-4 text-3xl font-bold text-white">
        Related Posts
      </Text>
      <ul className="flex flex-wrap items-center justify-center gap-4">
        {posts.slice(0, numPosts).map((post) => (
          <div
            key={post.slug}
            className="w-full scale-[0.8] transition-all duration-300 hover:scale-[0.85] lg:w-[300px]"
          >
            {/* <li> */}
            <PostCard post={post} />
            {/* </li> */}
          </div>
        ))}
      </ul>
      {numPosts < posts.length && (
        <Button
          variant="default"
          size="lg"
          onClick={handleLoadMore}
          className="bg-white mt-10 self-center rounded-3xl border border-lightTheme-text px-8 py-2 text-black opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100"
          type="button"
        >
          Load More
        </Button>
      )}
    </section>
  );
}
