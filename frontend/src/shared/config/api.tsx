import axiosInstance from "./axiosInstance";

// Authentication APIs
export const loginApi = (data: { username: string; password: string }) => {
  return axiosInstance.post('/auth/login', data);
};

export const registerApi = (data: { email: string; username: string; password: string }) => {
  return axiosInstance.post('/auth/register', data);
};

// User APIs
export const getAllUsersApi = () => {
  return axiosInstance.get('/users');
};

export const searchUsersApi = (query: string) => {
  return axiosInstance.get(`/users/search?query=${query}`);
};

export const getUserProfileApi = (username: string) => {
  return axiosInstance.get(`/users/profile/${username}`);
};