import HomePage from './HomePage';
import { getAllPostsFromNotion } from '@/services/posts';

export const metadata = {
  title: 'Portfolio Site | Farouk Adedamola',
};

export default async function Page() {
  const posts = await getAllPostsFromNotion();

  return <HomePage initialPosts={posts} />;
}
