import { Route, Routes, Navigate } from 'react-router-dom';

import Login from './features/auth/login/loginPage';
import Register from './features/auth/register/registerPage';
import Home from './features/home/homepage';
import Profile from './features/profile/profile';
import NotFoundPage from './features/notFound/notFound';

// Guards
import AuthGuard from './shared/guards/authGuard';
import RegisterGuard from './shared/guards/registerGuard';
import HomeGuard from './shared/guards/homeGuard';
import RoleGuard from './shared/guards/roleGuard';

function App() {
  return (
    <Routes>
      {/* Redirect base path to login */}
      <Route path='/' element={<Navigate to="/login" replace />} />

      {/* Login route */}
      <Route
        path='/login'
        element={
          <AuthGuard>
            <Login />
          </AuthGuard>
        }
      />

      {/* Register route */}
      <Route
        path='/register'
        element={
          <RegisterGuard>
            <Register />
          </RegisterGuard>
        }
      />

      {/* Home route */}
      <Route
        path='/home'
        element={
          <HomeGuard>
            <Home />
          </HomeGuard>
        }
      />

      {/* Dynamic user profile route */}
      <Route
        path='/profile/:username'
        element={
          <RoleGuard allowedRoles={['admin', 'consumer']}>
            <Profile />
          </RoleGuard>
        }
      />

      {/* Not Found route fallback */}
      <Route path='/notFound' element={<NotFoundPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;