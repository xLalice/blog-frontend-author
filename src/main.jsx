import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routes/Routes'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './provider/AuthProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
