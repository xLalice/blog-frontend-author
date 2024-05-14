import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostsList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`https://blog-backend-api-production-2c23.up.railway.app/api/posts`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handlePublish = (postId) => {
        axios.put(`/api/posts/${postId}/publish`)
            .then(response => {
            })
            .catch(error => {
                console.error('Error publishing post:', error);
            });
    };

    const handleUnpublish = (postId) => {
        axios.put(`/api/posts/${postId}/unpublish`)
            .then(response => {
            })
            .catch(error => {
                console.error('Error unpublishing post:', error);
            });
    };

    console.log(posts);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">List of Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id} className="border-b border-gray-200 py-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-gray-500">{post.published ? 'Published' : 'Unpublished'}</p>
                        </div>
                        <div>
                            {post.published ? (
                                <button onClick={() => handleUnpublish(post.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Unpublish</button>
                            ) : (
                                <button onClick={() => handlePublish(post.id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Publish</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;
