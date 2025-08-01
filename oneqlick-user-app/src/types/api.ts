// API Response Types
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  message_id: string;
  data: T;
}

// User Types
export type UserRole = 'customer' | 'admin' | 'delivery_partner' | 'restaurant_owner';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  user_id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  status: UserStatus;
  profile_image?: string;
  email_verified: boolean;
  phone_verified: boolean;
  created_at: string;
  updated_at: string;
}

// Create User Request
export interface CreateUserRequest {
  email: string;
  phone: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  profile_image?: string;
}

// API Error Types
export interface ApiError {
  code: number;
  message: string;
  message_id: string;
  errors?: Record<string, string[]>;
} 