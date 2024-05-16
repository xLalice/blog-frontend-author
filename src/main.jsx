import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Login from './routes/Login.jsx'
import CreatePost from './routes/CreatePost'
import PostsList from './routes/PostsList.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <PostsList />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: '/create-post',
        element: <CreatePost />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
