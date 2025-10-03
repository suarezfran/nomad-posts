export default function FilteringLoader() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
      <p className="text-lg font-medium text-gray-700">Filtering posts...</p>
    </div>
  );
}
