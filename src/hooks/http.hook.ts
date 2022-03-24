import { useState, useCallback } from 'react';

interface UseHttpType {
  loading: boolean;
  request: (
    url: string,
    method?: string,
    body?: any,
    header?: Record<string, unknown>
  ) => any;
  error: null | Error;
  clearError: () => void;
}

export const useHttp = (): UseHttpType => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так');
        }
        setLoading(false);

        return data;
      } catch (e: any) {
        setLoading(false);
        setError(e.message);
        throw e; // пробрасываем в компонент
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { loading, request, error, clearError };
};
