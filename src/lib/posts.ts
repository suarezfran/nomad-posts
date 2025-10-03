import prisma from '@/lib/prisma';
import { Post } from '@/types';

const POSTS_PER_PAGE = 10;

interface GetPostsParams {
  userId?: number;
  cursor?: number;
}

interface GetPostsResult {
  posts: Post[];
  hasMore: boolean;
  nextCursor: number | null;
}

export async function getPosts({ userId, cursor }: GetPostsParams = {}): Promise<GetPostsResult> {
  const whereClause = userId ? { userId } : {};

  const posts = await prisma.post.findMany({
    take: POSTS_PER_PAGE + 1,
    where: whereClause,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
    include: {
      user: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  const hasMore = posts.length > POSTS_PER_PAGE;
  const displayPosts = hasMore ? posts.slice(0, POSTS_PER_PAGE) : posts;
  const nextCursor = hasMore && displayPosts.length > 0
    ? displayPosts[displayPosts.length - 1].id
    : null;

  return { posts: displayPosts, hasMore, nextCursor };
}

