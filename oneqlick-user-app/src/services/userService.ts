import { apiClient } from '../config/api';
import { ApiResponse, CreateUserRequest, User } from '../types/api';

export class UserService {
  /**
   * Create a new user
   * @param userData - User data for creation
   * @returns Promise with created user data
   */
  static async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    const response = await apiClient.post<ApiResponse<User>>('/users', userData);
    return response.data;
  }

  /**
   * Get user by ID
   * @param userId - User UUID
   * @returns Promise with user data
   */
  static async getUserById(userId: string): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${userId}`);
    return response.data;
  }

  /**
   * Update user
   * @param userId - User UUID
   * @param userData - Partial user data for update
   * @returns Promise with updated user data
   */
  static async updateUser(
    userId: string, 
    userData: Partial<Omit<CreateUserRequest, 'password'>>
  ): Promise<ApiResponse<User>> {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${userId}`, userData);
    return response.data;
  }

  /**
   * Delete user
   * @param userId - User UUID
   * @returns Promise with deletion confirmation
   */
  static async deleteUser(userId: string): Promise<ApiResponse<{ deleted: boolean }>> {
    const response = await apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/users/${userId}`);
    return response.data;
  }
} 