import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getPosts } from '@/lib/posts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor');
    const userId = searchParams.get('userId');

    const { posts, hasMore, nextCursor } = await getPosts({
      userId: userId ? parseInt(userId, 10) : undefined,
      cursor: cursor ? parseInt(cursor, 10) : undefined,
    });

    return NextResponse.json({
      posts,
      hasMore,
      nextCursor
    });
  } catch (error) {
    console.error('Error loading posts:', error);
    return NextResponse.json(
      { error: 'Failed loading posts' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    await prisma.post.delete({
      where: {
        id: parseInt(postId)
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}