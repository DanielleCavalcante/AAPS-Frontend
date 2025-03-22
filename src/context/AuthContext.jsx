import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/api';
import Spinner from '../components/common/Spinner';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        // Verifica se o token ainda é válido
        try {
          await api.get('/ValidarToken');
          setUser(userData);
          api.defaults.headers.Authorization = `Bearer ${userData.token}`;
        } catch (error) {
          localStorage.removeItem('user');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const login = async (userName, senha) => {
    try {
      const response = await apiLogin({ userName, senha });
      const { token, voluntario } = response;

      const userData = {
        token,
        role: voluntario?.acesso
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      navigate('/home');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    delete api.defaults.headers.Authorization;
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      isAdmin: user?.role === 'Admin',
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);