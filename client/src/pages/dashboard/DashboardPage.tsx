import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';

/**
 * Dashboard page — the main landing page after login.
 * Placeholder UI for Day 1 frontend foundation verification.
 */
export default function DashboardPage() {
  const { user } = useAuth();

  const metrics = [
    { label: 'Active Projects', value: '—', icon: '📁' },
    { label: 'Pending Tasks', value: '—', icon: '✅' },
    { label: 'Upcoming Milestones', value: '—', icon: '🎯' },
    { label: 'Consultations', value: '—', icon: '📅' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome{user ? `, ${user.firstName}` : ''}. Your project overview will appear here.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((card) => (
          <Card key={card.label} className="hover:border-gray-300 transition-colors">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <span className="text-2xl">{card.icon}</span>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">{card.value}</p>
          </Card>
        ))}
      </div>

      {/* Setup Verification Notice */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-primary-800">✓ Frontend Foundation Ready</h2>
        <p className="mt-1 text-sm text-primary-700">
          The application shell and routing architecture are set up and running. Core system features will be
          built during the upcoming development phases (Weeks 1–4).
        </p>
      </div>
    </div>
  );
}
