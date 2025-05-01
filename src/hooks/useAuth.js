import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import { useError } from './useError';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthActions = () => {
  const { login, logout } = useAuth();
  const { erro, tratarErro, limparErro } = useError();
  
  const handleLogin = async (credentials) => {
    try {
      limparErro();
      await login(credentials);
    } catch (error) {
      tratarErro(error);
      throw error;
    }
  };

  return { handleLogin, logout, erro, limparErro };
};