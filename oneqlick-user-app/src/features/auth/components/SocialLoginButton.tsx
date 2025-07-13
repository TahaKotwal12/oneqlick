import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../../theme/theme';

interface SocialLoginButtonProps {
  provider: 'google' | 'apple' | 'facebook';
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onPress,
  disabled = false,
  style,
}) => {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          text: 'Continue with Google',
          backgroundColor: '#4285F4',
          icon: '🔍',
        };
      case 'apple':
        return {
          text: 'Continue with Apple',
          backgroundColor: '#000000',
          icon: '🍎',
        };
      case 'facebook':
        return {
          text: 'Continue with Facebook',
          backgroundColor: '#1877F2',
          icon: '📘',
        };
      default:
        return {
          text: 'Continue',
          backgroundColor: theme.colors.primary,
          icon: '🔗',
        };
    }
  };

  const config = getProviderConfig();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: config.backgroundColor },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{config.icon}</Text>
      <Text style={styles.text}>{config.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.sm,
    minHeight: 48,
    ...theme.shadows.small,
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  text: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
}); 