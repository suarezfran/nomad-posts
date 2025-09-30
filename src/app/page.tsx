import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-8 animate-bounce">Nomad Posts</h1>
      <Link
        href="/posts"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
      >
        View Posts
      </Link>
      <p className="mt-8 text-gray-400 text-sm">Hope you like it - by Francisco Suarez</p>
    </main>
  );
}
