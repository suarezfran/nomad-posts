import PostsLayout from '@/components/PostsLayout';
import prisma from '@/lib/prisma';

interface Post {
  id: number;
  title: string;
  body: string;
  user: {
    name: string;
  };
}

const POSTS_PER_PAGE = 10;

async function getPosts(): Promise<{ posts: Post[]; hasMore: boolean; nextCursor: number | null }> {
  // Fetch one extra post to determine if there are more
  const posts = await prisma.post.findMany({
    take: POSTS_PER_PAGE + 1,
    include: {
      user: true
    },
    orderBy: {
      id: 'asc'
    }
  });

  // If we got more than POSTS_PER_PAGE, there are more posts available
  const hasMore = posts.length > POSTS_PER_PAGE;
  
  // Return only POSTS_PER_PAGE posts (remove the extra one)
  const displayPosts = hasMore ? posts.slice(0, POSTS_PER_PAGE) : posts;
  
  // Next cursor is the ID of the last post we're displaying
  const nextCursor = hasMore && displayPosts.length > 0 
    ? displayPosts[displayPosts.length - 1].id 
    : null;

  return { posts: displayPosts, hasMore, nextCursor };
}

export default async function PostsPage() {
  const { posts, hasMore, nextCursor } = await getPosts();

  return (
    <PostsLayout 
      initialPosts={posts}
      hasMore={hasMore}
      initialCursor={nextCursor}
    />
  );
}
