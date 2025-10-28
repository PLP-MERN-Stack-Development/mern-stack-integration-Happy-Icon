import React, { useEffect, useState, useContext } from 'react';
import { useApi } from '../api/useApi';
import { Link } from 'react-router-dom';

export default function PostList() {
  const { request, loading, error } = useApi();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    request({ url: '/posts', method: 'GET' })
      .then(data => { if (!cancelled) setPosts(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [request]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(p => (
          <li key={p._id}><Link to={`/posts/${p._id}`}>{p.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}
