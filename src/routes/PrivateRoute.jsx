import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({ requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};