import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/types';
import { Logo } from '../../../components/Logo';
import { CustomButton } from '../../../components/CustomButton';
import { SocialLoginButton } from '../components/SocialLoginButton';
import { theme } from '../../../theme/theme';

type AuthOptionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthOptions'>;

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
        <View style={styles.logoContainer}>
          <Logo size={120} />
          <Text style={styles.title}>Join OneQlick</Text>
          <Text style={styles.subtitle}>
            Sign up or sign in to start ordering your favorite food
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Sign Up"
            onPress={handleSignUp}
            size="large"
            style={styles.button}
          />
          
          <CustomButton
            title="Sign In"
            onPress={handleSignIn}
            variant="outline"
            size="large"
            style={styles.button}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

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
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginBottom: theme.spacing.md,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.md,
  },
  socialButton: {
    marginBottom: theme.spacing.sm,
  },
}); 