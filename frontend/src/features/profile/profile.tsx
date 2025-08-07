import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

interface User {
  username: string;
  email: string;
  bio?: string;
  role?: string;
  createdAt?: string;
}

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/user/profile/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (error) return <div className="profile-error">{error}</div>;
  if (!user) return <div className="profile-error">User not found.</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>{user.username}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        {user.role && <p><strong>Role:</strong> {user.role}</p>}
        {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
        {user.createdAt && (
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
