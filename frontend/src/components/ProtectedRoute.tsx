import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export function ProtectedRoute({ requireAdmin = false }: { requireAdmin?: boolean }) {
  const { user } = useAppSelector((s) => s.auth);

  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && !user.roles.includes('Admin')) return <Navigate to="/" replace />;

  return <Outlet />;
}