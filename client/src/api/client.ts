import axios from 'axios';

/**
 * Base Axios instance configured for the CCIS PMS API.
 *
 * Configuration:
 * - baseURL: VITE_API_URL environment variable, defaulting to '/api' (proxied by Vite dev server).
 * - timeout: 15 seconds to prevent hanging requests.
 * - Request Interceptor: Automatically attaches the Bearer JWT token from localStorage.
 * - Response Interceptor: Handles 401 (unauthorized) globally by clearing session state.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to outgoing requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global responses and unauthorized state
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
