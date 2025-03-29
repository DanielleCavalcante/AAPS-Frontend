import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const PrivateRoute = ({ requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.token) {
    return <Navigate to="/login" replace />;
  }

  if (new Date(user.expiration) <= new Date()) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("expiration");
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }
  
  return <Outlet />;
};
