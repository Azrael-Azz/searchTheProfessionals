import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';

interface RegisterGuardProps {
  children: JSX.Element;
}

const RegisterGuard = ({ children }: RegisterGuardProps) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('currentUser');

  if (token && user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default RegisterGuard;