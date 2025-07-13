import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/types';
import { Logo } from '../../../components/Logo';
import { CustomButton } from '../../../components/CustomButton';
import { SocialLoginButton } from '../components/SocialLoginButton';
import { theme } from '../../../theme/theme';

type AuthOptionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthOptions'>;

const { width } = Dimensions.get('window');

export const AuthOptionsScreen: React.FC = () => {
  const navigation = useNavigation<AuthOptionsScreenNavigationProp>();

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log('Google sign in pressed');
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple OAuth
    console.log('Apple sign in pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Logo size={80} />
          </View>
          <Text style={styles.title}>Join OneQlick</Text>
          <Text style={styles.subtitle}>
            Sign up or sign in to start ordering your favorite food
          </Text>
        </View>

        {/* Main Buttons Section */}
        <View style={styles.mainButtons}>
          <CustomButton
            title="Create Account"
            onPress={handleSignUp}
            size="large"
            style={styles.primaryButton}
          />
          
          <CustomButton
            title="Sign In"
            onPress={handleSignIn}
            variant="outline"
            size="large"
            style={styles.secondaryButton}
          />
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        {/* Social Login Section */}
        <View style={styles.socialSection}>
          <SocialLoginButton
            provider="google"
            onPress={handleGoogleSignIn}
            style={styles.socialButton}
          />

          <SocialLoginButton
            provider="apple"
            onPress={handleAppleSignIn}
            style={styles.socialButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
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
    marginBottom: theme.spacing.xxl,
    paddingTop: theme.spacing.lg,
  },
  logoContainer: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.spacing.md,
  },
  mainButtons: {
    marginBottom: theme.spacing.xl,
  },
  primaryButton: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  secondaryButton: {
    marginBottom: theme.spacing.lg,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.lg,
  },
  socialSection: {
    marginBottom: theme.spacing.xl,
  },
  socialButton: {
    marginBottom: theme.spacing.md,
  },
  footer: {
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: theme.spacing.lg,
  },
}); 