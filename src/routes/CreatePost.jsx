import React from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../utils/axiosInstance';
import Tiptap from '../components/Tiptap';

const CreatePostForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ 
        defaultValues: { title: '', content: '' },
        mode: 'onChange'
    });

    const onSubmit = async (data) => {
        const token = sessionStorage.getItem('token');
        const username = sessionStorage.getItem('user.username');
        data.author = username;
        console.log("Data: ", data);
        console.log("Token: ", `Bearer ${token}`);
        axiosInstance.post('https://blog-backend-api-production-2c23.up.railway.app/api/posts', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Post created successfully:', response.data);
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
                <div className="mb-4 b">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        {...register('title', { required: true })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                    {errors.title && <p className="text-red-500">Title is required.</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content</label>
                    <Tiptap onChange={html => setValue('content', html)} />
                    {errors.content && <p className="text-red-500">Content is required.</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">Author</label>
                    <input
                        type="text"
                        id="author"
                        {...register('author', { required: true })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                    {errors.author && <p className="text-red-500">Author is required.</p>}
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePostForm;
