interface LoadingButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function LoadingButton({ onClick, loading }: LoadingButtonProps) {
  return (
    <div className="text-center py-8">
      <button
        onClick={onClick}
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
  );
}
