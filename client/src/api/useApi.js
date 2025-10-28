import { useState, useCallback } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
});

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config, optimisticUpdateCb) => {
    setLoading(true);
    setError(null);
    try {
      // optimistic UI support: call optimisticUpdateCb() before the request if provided
      if (optimisticUpdateCb) optimisticUpdateCb();
      const res = await api.request(config);
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || err.message);
      throw err;
    }
  }, []);

  return { request, loading, error, api };
}
