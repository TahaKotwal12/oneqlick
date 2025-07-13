import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Icon, Icons } from '../../../components/Icon';
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
          icon: Icons.google,
          iconColor: theme.colors.background,
        };
      case 'apple':
        return {
          text: 'Continue with Apple',
          backgroundColor: '#000000',
          icon: Icons.apple,
          iconColor: theme.colors.background,
        };
      case 'facebook':
        return {
          text: 'Continue with Facebook',
          backgroundColor: '#1877F2',
          icon: Icons.facebook,
          iconColor: theme.colors.background,
        };
      default:
        return {
          text: 'Continue',
          backgroundColor: theme.colors.primary,
          icon: Icons.person,
          iconColor: theme.colors.background,
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
      <Icon 
        name={config.icon} 
        size={20} 
        color={config.iconColor} 
        style={styles.icon}
      />
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
    borderRadius: theme.borderRadius.lg,
    marginVertical: theme.spacing.sm,
    minHeight: 52,
    ...theme.shadows.medium,
  },
  icon: {
    marginRight: theme.spacing.md,
  },
  text: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  disabled: {
    opacity: 0.6,
  },
}); 