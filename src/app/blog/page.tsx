import { Metadata } from 'next';

import CategoryFilter from '@/components/filter/category-filter';
import SearchBar from '@/components/filter/search-bar';
import PostsGrid from '@/components/posts/posts-grid';
import { siteConfig } from '@/config/seo';
import { getAllPostsFromNotion } from '@/services/posts';
import { toUniqueArray } from '@/utils/to-unique-array';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical articles, tutorials, and insights on frontend development, React, Next.js, TypeScript, web performance optimization, and modern software engineering practices.',
  keywords: [
    ...siteConfig.keywords,
    'blog',
    'technical articles',
    'web development tutorials',
    'React tutorials',
    'Next.js articles',
    'TypeScript guides',
    'frontend engineering blog',
  ],
  openGraph: {
    title: 'Blog - Farouk Adedamola',
    description:
      'Technical articles and insights on frontend development and software engineering.',
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Farouk Adedamola',
    description:
      'Technical articles and insights on frontend development and software engineering.',
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default async function BlogPage() {
  const allPosts = await getAllPostsFromNotion();
  console.log(allPosts);

  const allCategories = toUniqueArray(
    allPosts
      .filter((post) => post.published)
      .map((post) => post.categories)
      .flat()
  ).sort();

  return (
    <>
      <section className="mb-16 mt-0 space-y-8 md:mt-20">
        <SearchBar />
        <CategoryFilter allCategories={allCategories} />
      </section>
      <PostsGrid paginate allPosts={allPosts} />
    </>
  );
}
