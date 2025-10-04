// my approach 

//objects broken into smaller parts all in samme declaration file to avoid overly nesting properties sample ApiResponse["posts"]["title"]
export interface Posts {
  id: string;
  slug: string;
  title: string;
  categories: string[];
  date: string;
  published: boolean;
  lastEditedAt: number;
}

export interface ApiResponse {
  posts: Posts;
  totalPages: number;
  totalPosts: number;
  currentPage: number;
  perPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// sample in component types
// import Posts from from declaration file
export const Posts = ({ posts }: { posts: Posts }) => {
  return (
    <div>
      <PostsGrid title={posts.title} date={posts.date} />
      <p>{posts.date}</p>
      <p>{posts.lastEditedAt}</p>
    </div>
  );
};

// access props in component 
export const PostsGrid = ({
  title,
  date,
}: {
  // access title from Posts
  title: Posts['title'];
  // date can be either of type date or lastEditedAt
  date: Posts['date' | 'lastEditedAt'];
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
    </div>
  );
};
