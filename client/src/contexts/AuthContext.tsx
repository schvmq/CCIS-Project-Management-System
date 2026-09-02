import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, AuthState } from '../types';

/**
 * Authentication context.
 * Provides auth state and actions to the entire application.
 */

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * DEV-ONLY: Temporary mock user for Day 1 frontend preview without backend authentication.
 * TODO: Remove when authentication endpoints are connected in Week 1.
 */
const DEV_MOCK_USER: User = {
  id: 'dev-user-01',
  email: 'faculty@university.edu',
  firstName: 'Juan',
  lastName: 'Dela Cruz',
  roles: ['faculty'],
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    try {
      const token = localStorage.getItem('token');
      const userJson = localStorage.getItem('user');
      if (token && userJson) {
        const user: User = JSON.parse(userJson);
        return {
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        };
      }
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    // DEV-ONLY: Default to mock authenticated user in dev mode for UI inspection
    if (import.meta.env.DEV) {
      return {
        user: DEV_MOCK_USER,
        token: 'dev-mock-token',
        isAuthenticated: true,
        isLoading: false,
      };
    }

    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    };
  });

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// oxlint-disable-next-line react/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
