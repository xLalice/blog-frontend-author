import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../utils/axiosInstance';
import Tiptap from '../components/Tiptap';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ postId, initialTitle = '', initialContent = '', onSave }) => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({ 
        defaultValues: { title: initialTitle, content: initialContent },
        mode: 'onChange'
    });
    const navigate = useNavigate();
    
    useEffect(() => {
        reset({ title: initialTitle, content: initialContent });
    }, [initialTitle, initialContent, reset]);

    const onSubmit = async (data) => {
        const user = JSON.parse(localStorage.getItem('user'));
        data.author = user.id;

        if (postId) {
            axiosInstance.put(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}`, data)
                .then(response => {
                    console.log('Post updated successfully:', response.data);
                    if (onSave) onSave();
                    navigate('/posts');
                })
                .catch(error => {
                    console.error('Error updating post:', error);
                });
        } else {
            axiosInstance.post('https://blog-backend-api-production-2c23.up.railway.app/api/posts', data)
                .then(response => {
                    console.log('Post created successfully:', response.data);
                    navigate('/posts');
                })
                .catch(error => {
                    console.error('Error creating post:', error);
                });
        }
    };

    
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">{postId ? 'Edit' : 'Create'} Post</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-white font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        {...register('title', { required: true })}
                        className="bg-transparent w-full text-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                    {errors.title && <p className="text-red-500">Title is required.</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block font-semibold mb-2">Content</label>
                    <Tiptap onChange={html => setValue('content', html)} initialContent={initialContent} />
                    {errors.content && <p className="text-red-500">Content is required.</p>}
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        {postId ? 'Update Post' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>

    );
};

export default CreatePost;
