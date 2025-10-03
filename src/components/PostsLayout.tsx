'use client';

import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import PostCard from './PostCard';
import NoPostsFound from './NoPostsFound';
import EndOfPosts from './EndOfPosts';
import LoadingButton from './LoadingButton';
import FilteringLoader from './FilteringLoader';
import toast from 'react-hot-toast';
import { Post } from '@/types';

const UserFilter = dynamic(() => import('./UserFilter'), {
  ssr: false
});

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
  const [filterLoading, setFilterLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const loadMore = async () => {
    if (loading || !cursor) return;
    
    setLoading(true);
    try {
      const url = currentUserId 
        ? `/api/posts?cursor=${cursor}&userId=${currentUserId}`
        : `/api/posts?cursor=${cursor}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load posts');
      }
      
      const data = await response.json();
      setPosts(prev => [...prev, ...data.posts]);
      setHasMore(data.hasMore);
      setCursor(data.nextCursor);
    } catch (error) {
      console.error('Error loading more posts:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (userId: number | null) => {
    if (filterLoading) return;
    
    setFilterLoading(true);
    setCurrentUserId(userId);
    
    try {
      const url = userId ? `/api/posts?userId=${userId}` : '/api/posts';
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load posts');
      }
      
      const data = await response.json();
      setPosts(data.posts);
      setHasMore(data.hasMore);
      setCursor(data.nextCursor);
    } catch (error) {
      console.error('Error filtering posts:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to filter posts');
    } finally {
      setFilterLoading(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts?id=${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the post from the local state
        setPosts(prev => prev.filter(post => post.id !== postId));
        toast.success('Post deleted successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to delete post:', response.status, errorData);
        toast.error(errorData.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete post');
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

        <UserFilter onFilter={handleFilter} disabled={filterLoading} />

        <section className="space-y-6" aria-label="Posts list">
          {filterLoading ? (
            <FilteringLoader />
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
            ))
          )}
        </section>

        {posts.length === 0 && !filterLoading && <NoPostsFound />}

        {hasMore && !filterLoading && <LoadingButton onClick={loadMore} loading={loading} />}

        {!hasMore && posts.length > 0 && !filterLoading && <EndOfPosts />}
      </div>
    </main>
  );
}
