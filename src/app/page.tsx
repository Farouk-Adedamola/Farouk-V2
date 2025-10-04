import HomePage from './HomePage';
import { getAllPostsFromNotion } from '@/services/posts';

export const metadata = {
  title: 'Portfolio Site | Farouk Adedamola',
};

export default async function Page() {
  const allPosts = await getAllPostsFromNotion();

  const posts = allPosts.filter((post) => post.published);

  return <HomePage initialPosts={posts} />;
}
