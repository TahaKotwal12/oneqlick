import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Import debug utilities (only active in __DEV__)
import '../utils/queryDebug';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time before data is considered stale
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Time before inactive queries are garbage collected
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      // Retry failed requests
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 409, 429
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          if ([408, 409, 429].includes(error.response.status)) {
            return failureCount < 3;
          }
          return false;
        }
        // Retry other errors up to 3 times
        return failureCount < 3;
      },
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 409, 429
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          if ([408, 409, 429].includes(error.response.status)) {
            return failureCount < 2;
          }
          return false;
        }
        // Retry other errors up to 2 times
        return failureCount < 2;
      },
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export { queryClient };
