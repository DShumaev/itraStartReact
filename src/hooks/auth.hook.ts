import { useState, useEffect, useCallback } from 'react';

const storageName = 'userData';

declare const alert: (_: string) => void;

declare global {
  interface Window {
    QUOTA_EXCEEDED_ERR: any;
  }
}

type StringOrNull = string | null;
type NumberOrNull = number | null;

interface UseAuthType {
  login: (jwtToken: string, id: number) => void;
  logout: () => void;
  token: StringOrNull;
  userId: NumberOrNull;
}

export const useAuth = (): UseAuthType => {
  const [token, setToken] = useState<StringOrNull>(null);
  const [userId, setUserId] = useState<NumberOrNull>(null);

  const login = useCallback((jwtToken: StringOrNull, id: NumberOrNull) => {
    setToken(jwtToken); // сразу дергает отрисовку App, не дожидаясь setUser
    setUserId(id); // еще раз дергает отрисовку App

    try {
      localStorage.setItem(
        storageName,
        JSON.stringify({ userId: id, token: jwtToken })
      );
    } catch (e) {
      if (e === window.QUOTA_EXCEEDED_ERR) {
        alert('Local Storage data limit is exceeded');
      }
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  const updateState = (): void => {
    const storageValue = localStorage.getItem(storageName);
    if (typeof storageValue !== 'string') {
      return;
    }
    const data = JSON.parse(storageValue); // load auth state after page has been reloaded

    if (data && data.token && data.userId) {
      login(data.token, data.userId);
    }
  };

  useEffect(() => updateState());

  return { login, logout, token, userId };
};
