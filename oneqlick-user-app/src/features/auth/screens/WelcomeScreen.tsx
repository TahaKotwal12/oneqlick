import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/types';
import { Logo } from '../../../components/Logo';
import { CustomButton } from '../../../components/CustomButton';
import { theme } from '../../../theme/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('AuthOptions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Logo size={150} />
          <Text style={styles.title}>Welcome to OneQlick</Text>
          <Text style={styles.subtitle}>
            Your one-stop solution for food delivery. Order from your favorite restaurants and get it delivered to your doorstep.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Get Started"
            onPress={handleGetStarted}
            size="large"
            style={styles.button}
          />
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
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.spacing.md,
  },
  buttonContainer: {
    paddingBottom: theme.spacing.lg,
  },
  button: {
    width: '100%',
  },
}); 