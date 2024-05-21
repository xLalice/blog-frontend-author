import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../provider/AuthProvider';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const { userAuth, setUserAuth } = useAuthContext();
  const location = useLocation();

  const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) return true;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 3600; 
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        setUserAuth(false); 
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token'); 
      setUserAuth(null); 
      return true;
    }
  };

  if (!userAuth || isTokenExpired()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
