// 'use client';
// import { useEffect, useState } from 'react';
// import React from 'react';
// import { ExperienceSection } from '@/components/Experience/experience';
// // import Footer from '@/components/Footer/footer';
// import Hero from '@/components/hero/hero';
// import PostsGrid from '@/components/posts/posts-grid';
// import ProjectsSection from '@/components/projects/projects';
// import { getAllPostsFromNotion } from '@/services/posts';
// import { Post } from '@/types/post';
// import { AllJobExperience, Projectdata } from '@/utils/data';
// export const metadata = {
//   title: 'Portfolio Site | Farouk Adedamola',
// };
// export default function HomePage() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   useEffect(() => {
//     console.log(
//       "%c👋 Hello! Welcome to Farouk's Portfolio",
//       'color: #10b981; font-size: 20px; font-weight: bold;'
//     );
//     console.log(
//       '%cFeel free to explore the code!',
//       'color: #6ee7b7; font-size: 16px;'
//     );
//     const fetchPosts = async () => {
//       try {
//         const blogPosts = await getAllPostsFromNotion();
//         setPosts(blogPosts);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };
//     fetchPosts();
//   }, []);
//   return (
//     <h1 className="mx-auto mt-8 flex max-w-[1440px] flex-col justify-center">
//       <Hero />
//       <ExperienceSection data={AllJobExperience} />
//       <ProjectsSection data={Projectdata} />
//       <PostsGrid allPosts={posts.slice(0, 2)} />
//       {/* <Footer /> */}
//     </h1>
//   );
// }
// app/page.tsx
import HomePage from './HomePage';
import { getAllPostsFromNotion } from '@/services/posts';

export const metadata = {
  title: 'Portfolio Site | Farouk Adedamola',
};

export default async function Page() {
  const posts = await getAllPostsFromNotion();

  return <HomePage initialPosts={posts} />;
}
