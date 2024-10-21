import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn'); // Check if the user is logged in

  return isLoggedIn ? element : <Navigate to="/login" />; // Redirect if not logged in
};

export default ProtectedRoute;
