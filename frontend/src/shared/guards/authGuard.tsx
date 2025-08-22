import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';

interface HomeGuardProps {
  children: JSX.Element;
}

const AuthGuard = ({ children }: HomeGuardProps) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('currentUser');


  console.log('ping');

  //redirect to home if token and user available
  if (token && user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AuthGuard;