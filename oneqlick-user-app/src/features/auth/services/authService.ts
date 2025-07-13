import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SignUpData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Dummy user data for testing
const dummyUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    password: 'password123',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    password: 'password123',
  },
];

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signUp(data: SignUpData): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = dummyUsers.find(user => user.email === data.email);
        if (existingUser) {
          reject(new Error('User with this email already exists'));
          return;
        }

        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          name: data.name,
          email: data.email,
          phone: data.phone,
        };

        const response: AuthResponse = {
          user: newUser,
          token: `token_${Date.now()}`,
        };

        this.currentUser = newUser;
        this.saveUserToStorage(response);
        resolve(response);
      }, 1500); // Simulate API delay
    });
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = dummyUsers.find(
          u => u.email === data.email && u.password === data.password
        );

        if (!user) {
          reject(new Error('Invalid email or password'));
          return;
        }

        const response: AuthResponse = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
          token: `token_${Date.now()}`,
        };

        this.currentUser = response.user;
        this.saveUserToStorage(response);
        resolve(response);
      }, 1000); // Simulate API delay
    });
  }

  async signInWithGoogle(): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate Google OAuth success
        const response: AuthResponse = {
          user: {
            id: 'google_user_1',
            name: 'Google User',
            email: 'googleuser@example.com',
          },
          token: `google_token_${Date.now()}`,
        };

        this.currentUser = response.user;
        this.saveUserToStorage(response);
        resolve(response);
      }, 2000); // Simulate OAuth delay
    });
  }

  async signOut(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = null;
        this.clearUserFromStorage();
        resolve();
      }, 500);
    });
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    try {
      const userData = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      
      if (userData && token) {
        this.currentUser = JSON.parse(userData);
        return this.currentUser;
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }

    return null;
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  private async saveUserToStorage(authResponse: AuthResponse): Promise<void> {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(authResponse.user));
      await AsyncStorage.setItem('token', authResponse.token);
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  private async clearUserFromStorage(): Promise<void> {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error clearing user from storage:', error);
    }
  }
}

export const authService = AuthService.getInstance(); 