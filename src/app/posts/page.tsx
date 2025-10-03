import PostsLayout from '@/components/PostsLayout';
import prisma from '@/lib/prisma';
import { Post } from '@/types';

const POSTS_PER_PAGE = 10;

async function getPosts(userId?: string): Promise<{ posts: Post[]; hasMore: boolean; nextCursor: number | null }> {
  const posts = await prisma.post.findMany({
    take: POSTS_PER_PAGE + 1,
    where: userId ? { userId: parseInt(userId, 10) } : undefined,
    include: {
      user: true
    },
    orderBy: {
      id: 'asc'
    }
  });

  const hasMore = posts.length > POSTS_PER_PAGE;
  const displayPosts = hasMore ? posts.slice(0, POSTS_PER_PAGE) : posts;
  const nextCursor = hasMore && displayPosts.length > 0
    ? displayPosts[displayPosts.length - 1].id
    : null;

  return { posts: displayPosts, hasMore, nextCursor };
}

async function getInitialUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId, 10) },
    select: {
      id: true,
      name: true,
      username: true
    }
  });

  if (!user) return null;

  return {
    value: user.id,
    label: `${user.name}${user.username ? ` (@${user.username})` : ""}`,
  };
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string }>;
}) {
  const { userId } = await searchParams;
  const { posts, hasMore, nextCursor } = await getPosts(userId);
  const initialUser = userId ? await getInitialUser(userId) : null;

  return (
    <PostsLayout
      initialPosts={posts}
      hasMore={hasMore}
      initialCursor={nextCursor}
      initialUser={initialUser}
    />
  );
}