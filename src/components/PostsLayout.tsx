'use client';

import Link from 'next/link';
import { useState } from 'react';
import PostCard from './PostCard';
import NoPostsFound from './NoPostsFound';
import EndOfPosts from './EndOfPosts';
import LoadingButton from './LoadingButton';
import { Post } from '@/types';

interface PostsLayoutProps {
  initialPosts: Post[];
  hasMore: boolean;
  initialCursor: number | null;
}

export default function PostsLayout({ initialPosts, hasMore: initialHasMore, initialCursor }: PostsLayoutProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [cursor, setCursor] = useState<number | null>(initialCursor);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading || !cursor) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/posts?cursor=${cursor}`);
      const data = await response.json();
      
      setPosts(prev => [...prev, ...data.posts]);
      setHasMore(data.hasMore);
      setCursor(data.nextCursor);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4 text-black">Posts</h1>
          <nav>
            <Link href="/" className="text-blue-500 hover:underline">
              ← Back to Home
            </Link>
          </nav>
        </header>

        <section className="space-y-6" aria-label="Posts list">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>

        {posts.length === 0 && <NoPostsFound />}

        {hasMore && <LoadingButton onClick={loadMore} loading={loading} />}

        {!hasMore && posts.length > 0 && <EndOfPosts />}
      </div>
    </main>
  );
}
