import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../provider/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { userAuth } = useAuthContext();
  const location = useLocation();

  if (!userAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
