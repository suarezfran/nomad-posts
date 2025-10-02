import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const POSTS_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor');

    // Fetch one extra post to determine if there are more
    const posts = await prisma.post.findMany({
      take: POSTS_PER_PAGE + 1,
      ...(cursor && {
        cursor: {
          id: parseInt(cursor)
        },
        skip: 1 // Skip the cursor itself
      }),
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

    return NextResponse.json({
      posts: displayPosts,
      hasMore,
      nextCursor
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
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
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
