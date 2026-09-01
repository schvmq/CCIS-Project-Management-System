/**
 * Shared TypeScript type definitions for the CCIS PMS frontend.
 * Add types here that are used across multiple components/pages.
 */

// ---- User & Auth ----

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// ---- API Responses ----

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: ApiFieldError[];
}

export interface ApiFieldError {
  field: string;
  message: string;
}

// ---- Roles ----
// These will be finalized once the ERD/schema is confirmed.

export type UserRole = 'admin' | 'faculty' | 'student' | 'auditor';
