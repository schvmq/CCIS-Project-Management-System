import axios from 'axios';

/**
 * Axios instance configured for the CCIS PMS API.
 *
 * - Base URL is set from the VITE_API_URL env variable or defaults to '/api'
 *   (which the Vite dev server proxies to http://localhost:5000).
 * - The request interceptor attaches the JWT token from localStorage.
 * - The response interceptor handles 401 (unauthorized) by clearing auth state.
 */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request
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

// Handle 401 responses globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
