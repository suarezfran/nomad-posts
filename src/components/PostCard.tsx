import { Post } from '@/types';
import { useState } from 'react';
import ThreeDotsButton from './ThreeDotsButton';
import DropdownMenu from './DropdownMenu';
import ConfirmationModal from './ConfirmationModal';

interface PostCardProps {
  post: Post;
  onDelete: (postId: number) => void;
}

// Function to generate consistent random colors based on user name
const getUserAvatarColor = (userName: string) => {
  const colors = [
    'from-red-500 to-pink-600',
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-yellow-500 to-orange-600',
    'from-purple-500 to-indigo-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600',
    'from-teal-500 to-cyan-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
    'from-emerald-500 to-green-600',
    'from-violet-500 to-purple-600',
    'from-amber-500 to-yellow-600',
    'from-lime-500 to-green-600',
    'from-sky-500 to-blue-600',
    'from-rose-500 to-pink-600'
  ];
  
  // Generate a hash from the user name to ensure consistency
  let hash = 0;
  for (let i = 0; i < userName.length; i++) {
    const char = userName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo to get a consistent index
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
};

export default function PostCard({ post, onDelete }: PostCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteClick = () => {
    setShowMenu(false);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(post.id);
    setShowConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const avatarColor = getUserAvatarColor(post.user.name);

  return (
    <article className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-200">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className={`w-12 h-12 bg-gradient-to-r ${avatarColor} rounded-2xl flex items-center justify-center text-white font-semibold text-lg shadow-sm`} role="img" aria-label={`Avatar for ${post.user.name}`}>
            {post.user.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <address className="font-semibold text-gray-800 not-italic text-lg">{post.user.name}</address>
          </div>
        </div>
        
        <div className="relative">
          <ThreeDotsButton 
            onClick={() => setShowMenu(!showMenu)} 
          />
          <DropdownMenu 
            isOpen={showMenu} 
            onDelete={handleDeleteClick} 
          />
        </div>
      </header>
      
      <h2 className="text-xl font-bold mb-4 text-gray-900 leading-tight">{post.title}</h2>
      
      <p className="text-gray-600 leading-relaxed text-base">{post.body}</p>
      
      <ConfirmationModal
        isOpen={showConfirmModal}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </article>
  );
}
