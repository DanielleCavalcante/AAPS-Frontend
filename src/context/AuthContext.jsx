import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/loginService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const expiration = localStorage.getItem("expiration");

    if (token && role && expiration) {
      const expirationDate = new Date(expiration);

      if (expirationDate > new Date()) {
        setUser({ token, role, expiration });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("expiration");
        setUser(null);
        navigate("/");
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogin = async (credentials) => {
    try {
      const { token, role, expiration } = await loginService(credentials);

      if (token && role && expiration) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("expiration", expiration);

        setUser({ token, role, expiration });
        navigate("/home");
      } else {
        throw new Error("Dados inválidos do login.");
      }
    } catch (error) {
      console.error("Erro no login", error);
      throw new Error("Usuário ou senha incorretos");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("expiration");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;