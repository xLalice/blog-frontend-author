import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const EditComment = ({ postId, commentId, initialContent, onUpdate, onCancel }) => {
  const [content, setContent] = useState(initialContent);

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}/comments/${commentId}`, { content });
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      <div className="mt-2">
        <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">Update</button>
        <button onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
};

export default EditComment;
