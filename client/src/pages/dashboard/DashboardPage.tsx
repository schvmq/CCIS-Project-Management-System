import { useAuth } from '../../contexts/AuthContext';

/**
 * Dashboard page — the main landing page after login.
 * TODO: Build the actual dashboard UI (Week 2+).
 */
export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">
        Welcome{user ? `, ${user.firstName}` : ''}. Your project overview will appear here.
      </p>

      {/* Placeholder cards — will be replaced with real data */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Projects', value: '—', icon: '📁' },
          { label: 'Pending Tasks', value: '—', icon: '✅' },
          { label: 'Upcoming Milestones', value: '—', icon: '🎯' },
          { label: 'Consultations', value: '—', icon: '📅' },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <span className="text-2xl">{card.icon}</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Setup verification notice */}
      <div className="mt-8 bg-primary-50 border border-primary-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-primary-800">✓ Frontend Foundation Ready</h2>
        <p className="mt-1 text-sm text-primary-700">
          The application shell is set up and running. Features will be built during the
          development schedule (Weeks 1–4).
        </p>
      </div>
    </div>
  );
}
