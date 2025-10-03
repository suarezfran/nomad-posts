interface LoadingButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function LoadingButton({ onClick, loading }: LoadingButtonProps) {
  return (
    <div className="text-center py-12">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Loading...
          </>
        ) : (
          <>
            Load More Posts
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
