import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Vérification si un token existe dans le localStorage
  const isAuthenticated = localStorage.getItem('token');
  
  // Si authentifié, on rend les enfants, sinon on redirige vers la page de login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
