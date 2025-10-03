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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-48 py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Posts
          </h1>
          <p className="text-gray-600 mb-6">Discover stories and experiences from our community</p>
          <nav>
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </nav>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <UserFilter onFilter={handleFilter} disabled={filterLoading} />
        </div>

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
