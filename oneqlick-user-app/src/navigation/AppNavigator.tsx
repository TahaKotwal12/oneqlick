import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Import screens
import { WelcomeScreen } from '../features/auth/screens/WelcomeScreen';
import { AuthOptionsScreen } from '../features/auth/screens/AuthOptionsScreen';
import { SignUpScreen } from '../features/auth/screens/SignUpScreen';
import { SignInScreen } from '../features/auth/screens/SignInScreen';
import { ForgotPasswordScreen } from '../features/auth/screens/ForgotPasswordScreen';
import { DashboardScreen } from '../features/auth/screens/DashboardScreen';

// Import restaurant screens
import { RestaurantListScreen } from '../features/restaurant/screens/RestaurantListScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="AuthOptions" component={AuthOptionsScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        
        {/* Restaurant Feature */}
        <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 