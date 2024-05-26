import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import EditComment from '../components/EditComment';
import DeleteComment from '../components/DeleteComment';
import Tiptap from '../components/Tiptap';

export default function PostPage() {
    const { postId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [editCommentId, setEditCommentId] = useState(null);
    const [deleteCommentId, setDeleteCommentId] = useState(null);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchComments = async () => {
            try {
                const response = await axiosInstance.get(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}/comments`);
                if (isMounted) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}`);
                if (isMounted) {
                    setTitle(response.data.title);
                    setContent(response.data.content);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchComments();
        fetchPost();

        return () => {
            isMounted = false;
        };
    }, [postId]);

    const handleCommentUpdate = (updatedComment) => {
        setComments(comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment));
        setEditCommentId(null);
    };

    const handleCommentDelete = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
        setDeleteCommentId(null);
    };

    const handleAddComment = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axiosInstance.post(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}/comments`, {
                content: newComment,
                author: user.id,
                post: postId
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl text-center font-bold mb-4">{title}</h1>
            <Tiptap key={content} initialContent={content} editable={false} onChange={() => {}} />
            <h2 className="text-2xl font-semibold mt-8 mb-4">Comments</h2>
            <div>
                <textarea value={newComment} onChange={e => setNewComment(e.target.value)} className="w-full text-black border border-gray-300 rounded p-2 mb-2" placeholder="Add a comment"></textarea>
                <button onClick={handleAddComment} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add Comment</button>
            </div>
            <ul className="space-y-4">
                {comments.map(comment => (
                    <li key={comment._id} className="border-b border-gray-200 py-4">
                        {editCommentId === comment.id ? (
                            <EditComment
                                postId={postId}
                                commentId={comment._id}
                                initialContent={comment.content}
                                onUpdate={handleCommentUpdate}
                                onCancel={() => setEditCommentId(null)}
                            />
                        ) : (
                            <>
                                <p>{comment.content}</p>
                                <button onClick={() => setEditCommentId(comment.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => setDeleteCommentId(comment.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                            </>
                        )}
                        {deleteCommentId === comment.id && (
                            <DeleteComment
                                postId={postId}
                                commentId={comment._id}
                                onDelete={handleCommentDelete}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
