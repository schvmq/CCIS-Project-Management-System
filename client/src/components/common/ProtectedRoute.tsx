import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Optional: restrict to specific roles */
  allowedRoles?: string[];
}

/**
 * Route guard component.
 * Redirects unauthenticated users to /login.
 * Optionally restricts access to specific roles.
 */
export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user) {
    const hasRole = user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}
