import React from 'react';
import { Navigate } from 'react-router-dom';
import {
  createBrowserRouter
} from 'react-router-dom';
import App from '../App'
import  PostsList  from './PostsList';
import Login from './Login';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import PrivateRoute from './PrivateRoute';
import PostPage from './PostPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/posts" replace />
      },
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/posts',
            element: (
              <PrivateRoute>
                <PostsList />
              </PrivateRoute>
            )
          },
          {
            path: '/login',
            element: <Login />
          },
          {
            path: '/create-post',
            element: (
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            )
          },
          {
            path: '/posts/:postId/edit',
            element: (
              <PrivateRoute>
                <EditPost/>
              </PrivateRoute>
            )
          },
          {
            path: '/posts/:postId/',
            element: (
              <PrivateRoute>
                <PostPage />
              </PrivateRoute>
            )
          }
        ]
      },
    ]);



export default router;
