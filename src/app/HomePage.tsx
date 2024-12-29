import { useEffect, useState } from 'react';
import React from 'react';

import { ExperienceSection } from '@/components/Experience/experience';
import Hero from '@/components/hero/hero';
import PostsGrid from '@/components/posts/posts-grid';
import ProjectsSection from '@/components/projects/projects';
import { Post } from '@/types/post';
import { AllJobExperience, Projectdata } from '@/utils/data';

interface HomePageProps {
  initialPosts: Post[];
}

export default function HomePage({ initialPosts }: HomePageProps) {
  return (
    <h1 className=" flex max-w-[1280px] flex-col items-center justify-center">
      <Hero />
      <ExperienceSection data={AllJobExperience} />
      <ProjectsSection data={Projectdata} />
      <PostsGrid moreBtn allPosts={initialPosts.slice(0, 3)} />
    </h1>
  );
}
