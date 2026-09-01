import { Link } from 'react-router-dom';

/**
 * Unauthorized access page.
 * Shown when a user tries to access a route their role doesn't permit.
 */
export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-6xl font-bold text-gray-300">403</p>
        <h1 className="mt-4 text-xl font-semibold text-gray-900">Access denied</h1>
        <p className="mt-2 text-sm text-gray-500">
          You don't have permission to access this page.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
