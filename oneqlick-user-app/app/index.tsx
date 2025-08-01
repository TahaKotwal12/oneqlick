import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    const checkOnboardingAndNavigate = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
        console.log('Index - Onboarding status:', onboardingCompleted);
        
        if (onboardingCompleted === 'true') {
          console.log('Index - Navigating to welcome screen');
          router.replace('/(auth)/welcome' as any);
        } else {
          console.log('Index - Navigating to splash');
          router.replace('/(auth)/splash' as any);
        }
      } catch (error) {
        console.error('Index - Error checking onboarding status:', error);
        router.replace('/(auth)/splash' as any);
      }
    };

    checkOnboardingAndNavigate();
  }, []);
  
  return null;
} 