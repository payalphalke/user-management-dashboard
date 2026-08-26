import { useState, useEffect, useCallback } from 'react';
import * as userApi from '../services/userApi';

// Encapsulates fetching + CRUD state for users so the page component
// only has to deal with UI concerns.
export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userApi.getUsers();
      setUsers(res.data);
    } catch (err) {
      setError('Failed to load users. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // JSONPlaceholder is a fake API: POST always "succeeds" but always returns id: 11
  // and doesn't actually persist anything. We generate a local unique id so multiple
  // created users don't collide in the UI.
  const addUser = async (userData) => {
    const res = await userApi.createUser(userData);
    const newUser = { ...userData, ...res.data, id: Date.now() };
    setUsers((prev) => [newUser, ...prev]);
    return newUser;
  };

  const editUser = async (id, userData) => {
    const res = await userApi.updateUser(id, userData);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...userData, ...res.data, id } : u))
    );
    return res.data;
  };

  const removeUser = async (id) => {
    await userApi.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return { users, loading, error, fetchUsers, addUser, editUser, removeUser };
}
