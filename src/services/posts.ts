import { getRecordMap, mapImageUrl } from '@/libs/notion';
import { Post } from '@/types/post';

export async function getAllPostsFromNotion() {
  const allPosts: Post[] = [];
  
  const databaseId = process.env.NOTION_DATABASE_ID;
  console.log('🔍 Database ID being used:', databaseId);
  console.log('🔍 Database ID length:', databaseId?.length);
  console.log('🔍 Token exists:', !!process.env.NOTION_AUTH_TOKEN);
  
  if (!databaseId) {
    console.error('❌ NOTION_DATABASE_ID is not set!');
    return allPosts;
  }
  
  try {
    const recordMap = await getRecordMap(databaseId);
    console.log('✅ Successfully fetched recordMap');
    console.log('📦 RecordMap keys:', Object.keys(recordMap));
    
    const { block, collection } = recordMap;
    
    console.log('📦 Block count:', Object.keys(block || {}).length);
    console.log('📦 Collection count:', Object.keys(collection || {}).length);
    
    if (!collection || Object.keys(collection).length === 0) {
      console.error('❌ No collection found in recordMap');
      console.log('📦 Full recordMap structure:', JSON.stringify(recordMap, null, 2));
      return allPosts;
    }
    
    const schema = Object.values(collection)[0].value.schema;
    const propertyMap: Record<string, string> = {};
    
    console.log('📋 Schema properties:', Object.keys(schema).map(key => schema[key].name));

    Object.keys(schema).forEach((key) => {
      propertyMap[schema[key].name] = key;
    });

    let pageCount = 0;
    Object.keys(block).forEach((pageId) => {
      const blockValue = block[pageId].value;
      console.log(`📄 Block ${pageId}: type=${blockValue.type}`);
      
      if (
        blockValue.type === 'page' &&
        (blockValue.properties as any)?.[propertyMap['Slug']]
      ) {
        pageCount++;
        console.log(`✅ Found valid page ${pageCount}: ${pageId}`);
        const { properties, last_edited_time } = blockValue;

        const contents = block[pageId].value.content || [];
        const dates = contents.map((content) => {
          return block[content]?.value?.last_edited_time;
        });
        dates.push(last_edited_time);
        dates.sort((a, b) => b - a);
        const lastEditedAt = dates[0];

        const id = pageId;
        const props = properties as any;
        const slug = props[propertyMap['Slug']][0][0];
        const title = props[propertyMap['Page']][0][0];
        const categories = props[propertyMap['Category']][0][0].split(',');
        const date = props[propertyMap['Date']][0][1][0][1]['start_date'];
        const published = props[propertyMap['Published']][0][0] === 'Yes';

        allPosts.push({
          id,
          title,
          slug,
          categories,
          date,
          published,
          lastEditedAt,
        });
      }
    });

    console.log(`✅ Total valid pages found: ${pageCount}`);
    console.log(`✅ Total posts added: ${allPosts.length}`);
    
    if (allPosts.length > 0) {
      console.log('📝 Sample post:', allPosts[0]);
    }
  } catch (error) {
    console.error('❌ Error fetching posts from Notion:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }

  return allPosts;
}
