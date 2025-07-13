import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/types';
import { CustomButton } from '../../../components/CustomButton';
import { CustomInput } from '../../../components/CustomInput';
import { useAuth } from '../hooks/useAuth';
import { theme } from '../../../theme/theme';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const { signIn, isLoading } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await signIn({
        email: formData.email.trim(),
        password: formData.password,
      });
      
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Sign In Failed', error instanceof Error ? error.message : 'Invalid email or password');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue ordering your favorite food
          </Text>
        </View>

        <View style={styles.form}>
          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            error={errors.email}
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
            error={errors.password}
          />

          <CustomButton
            title="Forgot Password?"
            onPress={handleForgotPassword}
            variant="outline"
            size="small"
            style={styles.forgotPasswordButton}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Sign In"
            onPress={handleSignIn}
            loading={isLoading}
            size="large"
            style={styles.signInButton}
          />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <CustomButton
              title="Sign Up"
              onPress={handleSignUp}
              variant="outline"
              size="small"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: theme.spacing.sm,
  },
  buttonContainer: {
    marginTop: theme.spacing.lg,
  },
  signInButton: {
    marginBottom: theme.spacing.lg,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
}); 