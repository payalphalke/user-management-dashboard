import { useState, useEffect } from 'react';
import * as userApi from '../services/userApi';
import Loader from './Loader';

export default function UserDetails({ user, onClose }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true; // guards against setting state after unmount
    setLoading(true);
    setError(null);

    userApi
      .getUserPosts(user.id)
      .then((res) => {
        if (active) setPosts(res.data);
      })
      .catch(() => {
        if (active) setError('Failed to load posts for this user.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user.id]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box modal-large" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2>{user.name}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>
        <p>
          <strong>Company:</strong> {user.company?.name}
        </p>
        {user.address && (
          <p>
            <strong>Address:</strong> {user.address.street}, {user.address.city}
          </p>
        )}

        <h3>Posts</h3>
        {loading && <Loader text="Loading posts..." />}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && posts.length === 0 && <p>No posts found for this user.</p>}
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
