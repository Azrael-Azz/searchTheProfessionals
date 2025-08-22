import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home/home.css';
import { getAllUsersApi, searchUsersApi } from '../../shared/config/api';
import type { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';

type IUser = {
  username: string;
  email?: string;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers();
  }, []);

const fetchAllUsers = () => {
  setLoading(true);
  try {
    getAllUsersApi()
      .then((res: AxiosResponse<IUser[]>) => {
        console.log("Fetched users response:", res.data);
        setUsers(res.data ?? []);
      })
      .catch((err: AxiosError) => {
        console.error("API Error:", err.response || err.message);
        toast.error('Failed to fetch users');
      })
      .finally(() => {
        setLoading(false);
      });
  } catch (err) {
    console.error("Unexpected Error in fetchAllUsers:", err);
    toast.error("Something went wrong");
    setLoading(false);
  }
};


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (loading) return;

  if (searchTerm.trim() === '') {
    fetchAllUsers();
    return;
  }

  setLoading(true);
  searchUsersApi(searchTerm)
    .then((res: AxiosResponse<{ users?: IUser[] }>) => {
      setUsers(res.data.users ?? []);
    })
    .catch((err: AxiosError) => {
      const message = (err.response?.data as string) ?? 'Search failed';
      toast.error(message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleProfileClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="home-wrapper">
      <form onSubmit={handleSearch} className="home-search-form">
        <h3>Search for Professionals</h3>
        <input
          onChange={handleChange}
          name="search"
          value={searchTerm}
          placeholder="Enter username..."
          type="text"
        />
        <button type="submit">Search</button>
      </form>

      <div className="user-list">
        <h4>All Users</h4>
        {loading ? (
          <p>Loading...</p>
        ) : users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="user-card"
              onClick={() => handleProfileClick(user.username)}
              style={{ cursor: 'pointer' }}
            >
              <h3>{user.username}</h3>
              <p>{user.email ?? '--'}</p>
              <p>ING Tech</p>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}