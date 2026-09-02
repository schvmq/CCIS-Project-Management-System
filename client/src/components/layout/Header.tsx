import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div>
        {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
      </div>
      <div className="flex items-center gap-3">
        {user?.roles && user.roles.length > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 capitalize">
            {user.roles.join(', ')}
          </span>
        )}
      </div>
    </header>
  );
}
