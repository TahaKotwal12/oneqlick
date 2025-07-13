import { useState, useEffect } from 'react';
import { authService, User, SignUpData, SignInData } from '../services/authService';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await authService.getCurrentUser();
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: !!user,
      });
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  const signUp = async (data: SignUpData) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await authService.signUp(data);
      setAuthState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
      });
      return response;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const signIn = async (data: SignInData) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await authService.signIn(data);
      setAuthState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
      });
      return response;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await authService.signInWithGoogle();
      setAuthState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
      });
      return response;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.signOut();
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  return {
    ...authState,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };
}; 