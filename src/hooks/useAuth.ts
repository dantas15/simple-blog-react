import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { User, UserForm } from '../interfaces/User';

import api from '../services/api';

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export function useAuth() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>('');
  const [userName, setUserName] = useState<string | null>('');
  const [userEmail, setUserEmail] = useState<string | null>('');
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      setAuthenticated(true);

      setUserId(localStorage.getItem('userId'));
      setUserName(localStorage.getItem('userName'));
      setUserEmail(localStorage.getItem('userEmail'));
      setUserIsAdmin(localStorage.getItem('userIsAdmin') ? true : false);
    }

    setLoading(false);
  }, []);

  async function handleLogin({ email, password }: UserForm) {
    try {
      const { data } = await api.post<LoginResponse>('/login', {
        email,
        password,
      });

      setUserId(data.user.id);
      setUserName(data.user.name);
      setUserEmail(data.user.email);
      setUserIsAdmin(data.user.is_admin ? true : false);

      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem(
        'userIsAdmin',
        data.user.is_admin ? 'true' : 'false',
      );

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.access_token}`;

      setAuthenticated(true);
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  }

  function handleLogout() {
    setUserId(null);
    setUserName(null);
    setUserEmail(null);
    setUserIsAdmin(false);

    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userIsAdmin');

    api.defaults.headers.common['Authorization'] = '';

    navigate('/');
  }

  return {
    authenticated,
    loading,
    handleLogin,
    handleLogout,
    userId,
    userName,
    userEmail,
    userIsAdmin,
  };
}
