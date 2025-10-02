import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../state/auth';

export const ProtectedRoute: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(auth.getToken());

  React.useEffect(() => auth.subscribe(setToken), []);

  if (!token) {
    return <Navigate to='/login' replace />;
  }
  return <Outlet />;
};
