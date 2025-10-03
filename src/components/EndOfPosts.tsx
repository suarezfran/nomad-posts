export default function EndOfPosts() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">All caught up!</h3>
      <p className="text-gray-500">You&aposve reached the end of the posts</p>
    </div>
  );
}
