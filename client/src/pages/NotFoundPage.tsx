import { Link } from 'react-router-dom';

/**
 * 404 Not Found page.
 */
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-6xl font-bold text-gray-300">404</p>
        <h1 className="mt-4 text-xl font-semibold text-gray-900">Page not found</h1>
        <p className="mt-2 text-sm text-gray-500">
          The page you're looking for doesn't exist or has been moved.
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
