import axios from 'axios';

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://oneqlick-backend.vercel.app/api/v1',
  TIMEOUT: 10000,
} as const;

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      clearAuthToken();
    }
    return Promise.reject(error);
  }
);

// Helper functions for token management
export const getAuthToken = (): string | null => {
  // This would typically get token from AsyncStorage or secure storage
  return null; // Implement based on your auth strategy
};

export const setAuthToken = (token: string): void => {
  // This would typically store token in AsyncStorage or secure storage
  // Implement based on your auth strategy
};

export const clearAuthToken = (): void => {
  // This would typically clear token from storage
  // Implement based on your auth strategy
}; 