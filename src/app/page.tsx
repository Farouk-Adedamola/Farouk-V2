import HomePage from './HomePage';
import { Farouk } from '@/components/faroukPixel/farouk';
import { getAllPostsFromNotion } from '@/services/posts';

export const metadata = {
  title: 'Portfolio Site | Farouk Adedamola',
};

export default async function Page() {
  const allPosts = await getAllPostsFromNotion();

  const posts = allPosts
    .filter((post) => post.published)
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

  return (
    <>
      {/* <Farouk /> */}
      <HomePage initialPosts={posts} />
    </>
  );
}
