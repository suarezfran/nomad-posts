import PostsLayout from '@/components/PostsLayout';
import prisma from '@/lib/prisma';
import { getPosts } from '@/lib/posts';

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
  const { posts, hasMore, nextCursor } = await getPosts({
    userId: userId ? parseInt(userId, 10) : undefined,
  });
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