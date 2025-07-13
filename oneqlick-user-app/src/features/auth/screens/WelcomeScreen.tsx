import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/types';
import { Logo } from '../../../components/Logo';
import { CustomButton } from '../../../components/CustomButton';
import { Icon, Icons } from '../../../components/Icon';
import { theme } from '../../../theme/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const { width, height } = Dimensions.get('window');

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('AuthOptions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      {/* Background Gradient Effect */}
      <View style={styles.backgroundGradient}>
        <View style={styles.gradientTop} />
        <View style={styles.gradientBottom} />
      </View>

      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Logo size={120} />
            <View style={styles.logoGlow} />
          </View>
          
          <Text style={styles.title}>Welcome to OneQlick</Text>
          <Text style={styles.subtitle}>
            Your one-stop solution for food delivery
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <View style={styles.iconContainer}>
              <Icon name={Icons.delivery} size={32} color={theme.colors.background} />
            </View>
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.iconContainer}>
              <Icon name={Icons.restaurant} size={32} color={theme.colors.background} />
            </View>
            <Text style={styles.featureText}>Fresh Food</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.iconContainer}>
              <Icon name={Icons.payment} size={32} color={theme.colors.background} />
            </View>
            <Text style={styles.featureText}>Secure Payment</Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <CustomButton
            title="Get Started"
            onPress={handleGetStarted}
            size="large"
            style={styles.ctaButton}
          />
          
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientTop: {
    height: height * 0.6,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  gradientBottom: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: theme.spacing.lg,
  },
  logoGlow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 80,
    zIndex: -1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: theme.colors.background,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400' as const,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: theme.spacing.lg,
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.md,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: theme.colors.background,
    textAlign: 'center',
  },
  ctaSection: {
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  termsText: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: theme.spacing.lg,
  },
}); 