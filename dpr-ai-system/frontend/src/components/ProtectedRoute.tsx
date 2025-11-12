import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // Import our auth hook

interface ProtectedRouteProps {
  // You can add props here if you need to check for specific roles, e.g., roles: ['Admin']
}

export const ProtectedRoute = ({}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth(); // Get the authentication status from our context
  const location = useLocation();

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the /login page
    // We pass the current location so we can redirect them back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the child component (e.g., Dashboard, Projects)
  // <Outlet /> is a placeholder for the child route defined in App.tsx
  return <Outlet />;
};

export default ProtectedRoute;