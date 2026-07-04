import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { clearAuth, getStoredAuth, saveAuth } from '../services/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = getStoredAuth();

    if (!storedAuth?.token) {
      setLoading(false);
      return;
    }

    api
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data.data);
        setToken(storedAuth.token);
      })
      .catch(() => {
        clearAuth();
        setUser(null);
        setToken(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function signIn({ email, password, rememberMe, role }) {
    const { data } = await api.post('/auth/login', { email, password, role });
    saveAuth({ token: data.token, user: data.data }, rememberMe);
    setUser(data.data);
    setToken(data.token);
    return data.data;
  }

  async function signUp({ name, email, password, rememberMe }) {
    const { data } = await api.post('/auth/register', { name, email, password });
    saveAuth({ token: data.token, user: data.data }, rememberMe);
    setUser(data.data);
    setToken(data.token);
    return data.data;
  }

  function signOut() {
    clearAuth();
    setUser(null);
    setToken(null);
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}