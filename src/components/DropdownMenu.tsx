interface DropdownMenuProps {
  isOpen: boolean;
  onDelete: () => void;
}

export default function DropdownMenu({ isOpen, onDelete }: DropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
      <button
        onClick={onDelete}
        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
