import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Fetch all users
export const getUsers = () => api.get('/users');

// Fetch posts belonging to a specific user
export const getUserPosts = (userId) => api.get(`/posts?userId=${userId}`);

// Create a new user
export const createUser = (userData) => api.post('/users', userData);

// Update an existing user
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);

// Delete a user
export const deleteUser = (id) => api.delete(`/users/${id}`);
