import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';

interface HomeGuardProps {
  children: JSX.Element;
}

const HomeGuard = ({ children }: HomeGuardProps) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('currentUser');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default HomeGuard;