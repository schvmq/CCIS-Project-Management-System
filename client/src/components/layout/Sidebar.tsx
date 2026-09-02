import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  // Future navigation items:
  // { name: 'Projects', href: '/projects', icon: '📁' },
  // { name: 'Tasks', href: '/tasks', icon: '✅' },
  // { name: 'Milestones', href: '/milestones', icon: '🎯' },
  // { name: 'Consultation', href: '/consultation', icon: '📅' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Logo / Branding */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-lg font-bold text-primary-700 tracking-tight">CCIS PMS</h1>
        <p className="text-xs text-gray-500 mt-1">Project Management System</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.href)
                ? 'bg-primary-50 text-primary-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* User info & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-bold">
            {user?.firstName?.charAt(0) ?? '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email ?? 'Not logged in'}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="mt-3 w-full text-left text-xs font-medium text-gray-500 hover:text-danger-500 transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
