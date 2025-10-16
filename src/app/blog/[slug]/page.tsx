import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import NotionPage from '@/components/notion-page';
import RelatedPosts from '@/components/posts/related-posts';
import { siteConfig } from '@/config/seo';
import { getRecordMap } from '@/libs/notion';
import { getAllPostsFromNotion } from '@/services/posts';
import { Post } from '@/types/post';

export default async function PostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const allPosts = await getAllPostsFromNotion();

  const post = allPosts.find((p) => p.slug === slug);
  if (!post) {
    return notFound();
  }

  if (!post.published) {
    return (
      <article
        data-revalidated-at={new Date().getTime()}
        className="mx-auto mt-40 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold">Post Not Found</h2>
        <Link href="/blog">
          <span className="mr-2">&larr;</span>
          <span>Go to list page</span>
        </Link>
      </article>
    );
  }

  const relatedPosts: Post[] = allPosts.filter(
    (p) =>
      p.slug !== slug &&
      p.published &&
      p.categories.some((v) => post.categories.includes(v))
  );

  const recordMap = await getRecordMap(post.id);

  return (
    <>
      <article
        data-revalidated-at={new Date().getTime()}
        className="mt-4 flex !w-full flex-col items-center md:mt-20"
      >
        <NotionPage post={post} recordMap={recordMap} />
      </article>
      <RelatedPosts posts={relatedPosts} />
    </>
  );
}

export async function generateStaticParams() {
  const allPosts = await getAllPostsFromNotion();

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const allPosts = await getAllPostsFromNotion();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const postUrl = `${siteConfig.url}/blog/${slug}`;
  const publishedDate = new Date(post.date).toISOString();
  const modifiedDate = new Date(post.lastEditedAt).toISOString();
  const description = `Read ${post.title} by ${
    siteConfig.author.name
  }. Technical article about ${post.categories.join(', ')}.`;

  return {
    title: post.title,
    description: description,
    keywords: [
      ...siteConfig.keywords,
      ...post.categories,
      post.title,
      'blog post',
      'technical article',
    ],
    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.url,
      },
    ],
    openGraph: {
      title: post.title,
      description: description,
      url: postUrl,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: [siteConfig.author.name],
      tags: post.categories,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      creator: siteConfig.author.twitter,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}
