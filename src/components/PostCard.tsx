interface PostCardProps {
  post: {
    id: number;
    title: string;
    body: string;
    user: {
      name: string;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border border-gray-200 rounded-lg p-6">
      <header className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium" role="img" aria-label={`Avatar for ${post.user.name}`}>
          {post.user.name.charAt(0)}
        </div>
        <div className="ml-3">
          <address className="font-medium text-black not-italic">{post.user.name}</address>
        </div>
      </header>
      
      <h2 className="text-lg font-semibold mb-3 text-black">{post.title}</h2>
      
      <p className="text-gray-700 leading-relaxed text-black">{post.body}</p>
    </article>
  );
}
