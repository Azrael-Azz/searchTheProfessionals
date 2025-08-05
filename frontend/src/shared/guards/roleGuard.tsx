import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';

interface RoleGuardProps {
  allowedRoles: string[];
  children: JSX.Element;
}

const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('currentUser');

  if (!token || !userString) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userString);
    if (allowedRoles.includes(user.role)) {
      return children;
    } else {
      return <Navigate to="/notFound" replace />;
    }
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
};

export default RoleGuard;