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
      <HomePage initialPosts={posts} />
    </>
  );
}

// Simple test to verify token
async function testNotionToken() {
  const NOTION_TOKEN = process.env.NOTION_AUTH_TOKEN;

  try {
    const response = await fetch('https://api.notion.com/v1/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Token is valid!', data);
      return true;
    } else {
      console.log(
        '❌ Token is invalid:',
        response.status,
        await response.text()
      );
      return false;
    }
  } catch (error) {
    console.error('Error testing token:', error);
    return false;
  }
}

async function testDatabaseAccess(databaseId: string) {
  const NOTION_TOKEN = process.env.NOTION_AUTH_TOKEN;

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Database is accessible!', data.title);
      return true;
    } else {
      console.log(
        '❌ Database not accessible:',
        response.status,
        await response.text()
      );
      return false;
    }
  } catch (error) {
    console.error('Error accessing database:', error);
    return false;
  }
}
