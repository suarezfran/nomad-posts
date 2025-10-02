import { Post } from '@/types';
import { useState } from 'react';
import ThreeDotsButton from './ThreeDotsButton';
import DropdownMenu from './DropdownMenu';
import ConfirmationModal from './ConfirmationModal';

interface PostCardProps {
  post: Post;
  onDelete: (postId: number) => void;
}

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

  return (
    <article className="border border-gray-200 rounded-lg p-6">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium" role="img" aria-label={`Avatar for ${post.user.name}`}>
            {post.user.name.charAt(0)}
          </div>
          <div className="ml-3">
            <address className="font-medium text-black not-italic">{post.user.name}</address>
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
      
      <h2 className="text-lg font-semibold mb-3 text-black">{post.title}</h2>
      
      <p className="text-gray-700 leading-relaxed text-black">{post.body}</p>
      
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
