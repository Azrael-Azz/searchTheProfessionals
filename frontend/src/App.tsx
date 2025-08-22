import { Route, Routes, Navigate } from 'react-router-dom';

import Login from './features/auth/login/loginPage';
import Register from './features/auth/register/registerPage';
import Home from './features/home/homePage';
import Profile from './features/profile/profile';
import NotFoundPage from './features/notFound/notFound';

// Guards
import AuthGuard from './shared/guards/authGuard';
import HomeGuard from './shared/guards/homeGuard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace />} />

      {/* Login route */}
      <Route path='/login' element={
        <AuthGuard>
          <Login />
        </AuthGuard>
      }
      />

      {/* Register route */}
      <Route path='/register' element={
        <AuthGuard>
          <Register />
        </AuthGuard>
      }
      />

      {/* Home route */}
      <Route path='/home' element={
        <HomeGuard>
          <Home />
        </HomeGuard>
      }
      />

      {/* User profile route */}
      <Route path="/profile/:username" element={<Profile />} />

      {/* Not Found route */}
      <Route path='/notFound' element={<NotFoundPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;