import Link from 'next/link';
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
  posts: Post[];
}

export default function PostsLayout({ posts }: PostsLayoutProps) {
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
      </div>
    </main>
  );
}
