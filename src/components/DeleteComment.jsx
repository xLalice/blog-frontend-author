import React from 'react';
import axiosInstance from '../utils/axiosInstance';

const DeleteComment = ({ postId, commentId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}/comments/${commentId}`);
      onDelete(commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete this comment?</p>
      <div className="mt-2">
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2">Delete</button>
        <button onClick={() => onDelete(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
};

export default DeleteComment;
