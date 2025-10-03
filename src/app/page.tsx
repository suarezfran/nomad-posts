import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-purple-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-cyan-400 rounded-full"></div>
        <div className="absolute bottom-32 left-10 w-2 h-2 bg-indigo-400 rounded-full"></div>
        <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-violet-400 rounded-full"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">

        {/* Main Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Nomad Posts
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
          Discover stories and experiences from digital nomads around the world
        </p>

        <Link
          href="/posts"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 text-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Explore Posts
        </Link>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link href="https://www.linkedin.com/in/fransuarez" className="text-gray-400 text-sm">
            Hope you like it - by <span className="text-blue-400 font-medium">Francisco Suarez</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
