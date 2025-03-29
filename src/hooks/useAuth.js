import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthActions = () => {
  const { login, logout } = useAuth();
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return { handleLogin, logout };
};