import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { ClipLoader } from 'react-spinners';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://blog-backend-api-production-2c23.up.railway.app/api/posts')
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setLoading(false);
            });
    }, []);

    const handlePublish = (postId) => {
        console.log('Publishing post with ID:', postId);
        axiosInstance.put(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}/publish`)
            .then(response => {
                console.log('Publish response:', response);
                setPosts(posts.map(post => post.id === postId ? { ...post, published: true } : post));
            })
            .catch(error => {
                console.error('Error publishing post:', error);
            });
    };

    const handleUnpublish = (postId) => {
        console.log('Unpublishing post with ID:', postId);
        axiosInstance.put(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}/unpublish`)
            .then(response => {
                console.log('Unpublish response:', response);
                setPosts(posts.map(post => post.id === postId ? { ...post, published: false } : post));
            })
            .catch(error => {
                console.error('Error unpublishing post:', error);
            });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">List of Posts</h1>
            {loading ? (
                <div className="flex justify-center items-center">
                    <ClipLoader color={"#123abc"} loading={loading} size={50} />
                </div>
            ) : (
                <ul>
                    {posts.map(post => (
                        <li key={post.id} className="border-b border-gray-200 py-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold">{post.title}</h2>
                                <p className="text-gray-500">{post.published ? 'Published' : 'Unpublished'}</p>
                            </div>
                            <div>
                                {post.published ? (
                                    <button onClick={() => handleUnpublish(post._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Unpublish</button>
                                ) : (
                                    <button onClick={() => handlePublish(post._id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Publish</button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostsList;
