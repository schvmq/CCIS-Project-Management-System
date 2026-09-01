import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Main application layout with sidebar and header.
 * Used as the layout wrapper for all authenticated pages.
 */
export default function AppLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    // Future navigation items:
    // { name: 'Projects', href: '/projects', icon: '📁' },
    // { name: 'Tasks', href: '/tasks', icon: '✅' },
    // { name: 'Milestones', href: '/milestones', icon: '🎯' },
    // { name: 'Consultation', href: '/consultation', icon: '📅' },
  ];

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo / Title */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-bold text-primary-700">CCIS PMS</h1>
          <p className="text-xs text-gray-500 mt-1">Project Management System</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-medium">
              {user?.firstName?.charAt(0) ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user ? `${user.firstName} ${user.lastName}` : 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email ?? ''}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-3 w-full text-left text-sm text-gray-500 hover:text-danger-500 transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div>
            {/* Breadcrumb or page title will go here */}
          </div>
          <div className="flex items-center gap-4">
            {/* Notification bell, search, etc. will go here */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
