import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { ClipLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
        setPosts(posts.map(post => post._id === postId ? { ...post, published: true } : post));
        axiosInstance.put(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}/publish`)
            .then(response => {
                console.log('Publish response:', response);
            })
            .catch(error => {
                console.error('Error publishing post:', error);
                setPosts(posts.map(post => post._id === postId ? { ...post, published: false } : post));
            });
    };

    const handleUnpublish = (postId) => {
        setPosts(posts.map(post => post._id === postId ? { ...post, published: false } : post));
        axiosInstance.put(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}/unpublish`)
            .then(response => {
                console.log('Unpublish response:', response);
            })
            .catch(error => {
                console.error('Error unpublishing post:', error);
                setPosts(posts.map(post => post._id === postId ? { ...post, published: true } : post));
            });
    };

    const deletePost = (postId) => {
        axiosInstance.delete(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}`)
            .then(response => {
                setPosts(posts.filter(post => post._id !== postId));
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    };

    const handleButtonClick = (e) => {
        e.stopPropagation();
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
                        <li onClick={() => navigate(`/posts/${post._id}`)} key={post._id} className="border-b border-gray-200 py-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold">{post.title}</h2>
                                <p className="text-gray-500">{post.published ? 'Published' : 'Unpublished'}</p>
                            </div>
                            <div>
                                {post.published ? (
                                    <button onClick={(e) => {handleButtonClick(e); handleUnpublish(post._id);}} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Unpublish</button>
                                ) : (
                                    <button onClick={(e) => {handleButtonClick(e); handlePublish(post._id);}} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Publish</button>
                                )}
                                <Link to={`/posts/${post._id}/edit`} onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2">Edit</Link>
                                <button onClick={(e) => {handleButtonClick(e); deletePost(post._id);}} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-2">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostsList;
