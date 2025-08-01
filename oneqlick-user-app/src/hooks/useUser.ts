import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { UserService } from '../services/userService';
import { ApiError, ApiResponse, CreateUserRequest, User } from '../types/api';

// Query Keys
export const USER_QUERY_KEYS = {
  all: ['users'] as const,
  user: (id: string) => [...USER_QUERY_KEYS.all, id] as const,
} as const;

/**
 * Hook to create a new user
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, CreateUserRequest>({
    mutationFn: UserService.createUser,
    onSuccess: (data) => {
      // Invalidate and refetch user queries
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
      
      Alert.alert(
        'Success',
        'User created successfully!',
        [{ text: 'OK' }]
      );
    },
    onError: (error) => {
      console.error('Create user error:', error);
      
      const errorMessage = error.message || 'Failed to create user. Please try again.';
      Alert.alert(
        'Error',
        errorMessage,
        [{ text: 'OK' }]
      );
    },
  });
};

/**
 * Hook to get user by ID
 */
export const useUser = (userId: string, enabled: boolean = true) => {
  return useQuery<ApiResponse<User>, ApiError>({
    queryKey: USER_QUERY_KEYS.user(userId),
    queryFn: () => UserService.getUserById(userId),
    enabled: enabled && !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on 404 errors
      if (error.code === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

/**
 * Hook to update user
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<User>,
    ApiError,
    { userId: string; userData: Partial<Omit<CreateUserRequest, 'password'>> }
  >({
    mutationFn: ({ userId, userData }) => UserService.updateUser(userId, userData),
    onSuccess: (data, variables) => {
      // Update the specific user query
      queryClient.setQueryData(
        USER_QUERY_KEYS.user(variables.userId),
        data
      );
      
      // Invalidate all user queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
      
      Alert.alert(
        'Success',
        'User updated successfully!',
        [{ text: 'OK' }]
      );
    },
    onError: (error) => {
      console.error('Update user error:', error);
      
      const errorMessage = error.message || 'Failed to update user. Please try again.';
      Alert.alert(
        'Error',
        errorMessage,
        [{ text: 'OK' }]
      );
    },
  });
};

/**
 * Hook to delete user
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<{ deleted: boolean }>,
    ApiError,
    string
  >({
    mutationFn: UserService.deleteUser,
    onSuccess: (data, userId) => {
      // Remove the specific user query
      queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.user(userId) });
      
      // Invalidate all user queries
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
      
      Alert.alert(
        'Success',
        'User deleted successfully!',
        [{ text: 'OK' }]
      );
    },
    onError: (error) => {
      console.error('Delete user error:', error);
      
      const errorMessage = error.message || 'Failed to delete user. Please try again.';
      Alert.alert(
        'Error',
        errorMessage,
        [{ text: 'OK' }]
      );
    },
  });
};

/**
 * Hook to get loading states for user operations
 */
export const useUserLoadingStates = (userId?: string) => {
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const userQuery = useUser(userId || '', !!userId);

  return {
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
    isLoading: userQuery.isLoading,
    isFetching: userQuery.isFetching,
    isAnyLoading: 
      createUserMutation.isPending || 
      updateUserMutation.isPending || 
      deleteUserMutation.isPending || 
      userQuery.isLoading,
  };
}; 