import React, { useState, useEffect } from 'react';
import { useApi } from '../api/useApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request } = useApi();
  const [form, setForm] = useState({ title: '', content: '', categories: [] });

  useEffect(() => {
    if (id) {
      request({ url: `/posts/${id}`, method: 'GET' }).then(data => setForm(data)).catch(() => {});
    }
  }, [id, request]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id) {
        await request({ url: `/posts/${id}`, method: 'PUT', data: form });
      } else {
        await request({ url: '/posts', method: 'POST', data: form });
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Title" />
      <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Content" />
      <button type="submit">Save</button>
    </form>
  );
}
