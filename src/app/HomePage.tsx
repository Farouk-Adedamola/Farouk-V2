// HomePage.tsx
import { useEffect, useState } from 'react';
import React from 'react';

import { ExperienceSection } from '@/components/Experience/experience';
import Hero from '@/components/hero/hero';
import PostsGrid from '@/components/posts/posts-grid';
import ProjectsSection from '@/components/projects/projects';
import { Post } from '@/types/post';
import { AllJobExperience, Projectdata } from '@/utils/data';

// Remove the metadata export since this is a client component
// export const metadata = {
//   title: 'Portfolio Site | Farouk Adedamola',
// };

interface HomePageProps {
  initialPosts: Post[];
}

export default function HomePage({ initialPosts }: HomePageProps) {
  return (
    <h1 className="mx-auto mt-8 flex max-w-[1440px] flex-col justify-center">
      <Hero />
      <ExperienceSection data={AllJobExperience} />
      <ProjectsSection data={Projectdata} />
      <PostsGrid allPosts={initialPosts.slice(0, 2)} />
      {/* <Footer /> */}
    </h1>
  );
}
