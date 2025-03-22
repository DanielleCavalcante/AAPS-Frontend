import { useAuth } from '../contexts/AuthContext';

export const useAuthActions = () => {
  const { login, logout } = useAuth();
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // Redirecionamento ou tratamento adicional
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  return { handleLogin, logout };
};