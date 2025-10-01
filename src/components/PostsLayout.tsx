'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import PostCard from './PostCard';

interface Post {
  id: number;
  title: string;
  body: string;
  user: {
    name: string;
  };
}

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

  // Reset state when initialPosts change (page reload)
  useEffect(() => {
    setPosts(initialPosts);
    setHasMore(initialHasMore);
    setCursor(initialCursor);
  }, [initialPosts, initialHasMore, initialCursor]);

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

        {posts.length === 0 && (
          <section className="text-center py-12" aria-label="No posts message">
            <p className="text-gray-500">No posts found</p>
          </section>
        )}

        {hasMore && (
          <div className="text-center py-8">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Load More Posts'}
              {!loading && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">You've reached the end of the posts</p>
          </div>
        )}
      </div>
    </main>
  );
}
