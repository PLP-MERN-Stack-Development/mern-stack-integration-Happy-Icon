import React, { useEffect, useState } from 'react';
import { useApi } from '../api/useApi';
import { useParams } from 'react-router-dom';

export default function PostView() {
  const { id } = useParams();
  const { request, loading, error } = useApi();
  const [post, setPost] = useState(null);

  useEffect(() => {
    request({ url: `/posts/${id}`, method: 'GET' })
      .then(setPost)
      .catch(() => {});
  }, [id, request]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!post) return <div>No post</div>;

  return (
    <article>
      <h1>{post.title}</h1>
      {post.featuredImage && <img alt={post.title} src={post.featuredImage} />}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
