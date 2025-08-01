import { queryClient } from '../providers/QueryProvider';

/**
 * React Native compatible debug utilities for TanStack Query
 * Since ReactQueryDevtools doesn't work in React Native, 
 * these utilities help with debugging queries in development
 */

export const queryDebugUtils = {
  /**
   * Log all active queries
   */
  logActiveQueries: () => {
    if (__DEV__) {
      const queries = queryClient.getQueryCache().getAll();
      console.log('🔍 Active Queries:', queries.map(query => ({
        queryKey: query.queryKey,
        state: query.state.status,
        dataUpdatedAt: query.state.dataUpdatedAt,
        error: query.state.error?.message,
      })));
    }
  },

  /**
   * Log query cache data
   */
  logQueryData: (queryKey: unknown[]) => {
    if (__DEV__) {
      const data = queryClient.getQueryData(queryKey);
      console.log(`🗂️ Query Data [${JSON.stringify(queryKey)}]:`, data);
    }
  },

  /**
   * Log all mutations
   */
  logActiveMutations: () => {
    if (__DEV__) {
      const mutations = queryClient.getMutationCache().getAll();
      console.log('🔄 Active Mutations:', mutations.map(mutation => ({
        mutationKey: mutation.options.mutationKey,
        state: mutation.state.status,
        variables: mutation.state.variables,
        error: mutation.state.error?.message,
      })));
    }
  },

  /**
   * Clear all query cache
   */
  clearCache: () => {
    if (__DEV__) {
      queryClient.clear();
      console.log('🗑️ Query cache cleared');
    }
  },

  /**
   * Invalidate specific queries
   */
  invalidateQueries: (queryKey: unknown[]) => {
    if (__DEV__) {
      queryClient.invalidateQueries({ queryKey });
      console.log(`♻️ Invalidated queries: ${JSON.stringify(queryKey)}`);
    }
  },

  /**
   * Get query cache stats
   */
  getCacheStats: () => {
    if (__DEV__) {
      const queries = queryClient.getQueryCache().getAll();
      const mutations = queryClient.getMutationCache().getAll();
      
      const stats = {
        totalQueries: queries.length,
        successQueries: queries.filter(q => q.state.status === 'success').length,
        errorQueries: queries.filter(q => q.state.status === 'error').length,
        loadingQueries: queries.filter(q => q.state.status === 'pending').length,
        totalMutations: mutations.length,
        pendingMutations: mutations.filter(m => m.state.status === 'pending').length,
      };
      
      console.log('📊 Cache Stats:', stats);
      return stats;
    }
    return null;
  },
};

// Global debug object for easier access in development
if (__DEV__) {
  (global as any).queryDebug = queryDebugUtils;
  console.log('🛠️ Query debug utilities available at global.queryDebug');
} 