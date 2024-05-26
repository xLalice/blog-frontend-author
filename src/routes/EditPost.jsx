import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreatePost from '../routes/CreatePost';
import { ClipLoader } from 'react-spinners';

const EditPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const loading = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://blog-backend-api-production-2c23.up.railway.app/api/posts/${postId}`);
                const data = await response.json();
                setPost(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId]);

    if (!post) {
        return (
        <div className="flex justify-center items-center">
            <ClipLoader color={"#123abc"} loading={loading} size={100} />
        </div>)
    }

    return (
        <CreatePost
            postId={postId}
            initialTitle={post.title}
            initialContent={post.content}
            onSave={() => console.log('Post saved!')}
        />
    );
};

export default EditPost;
