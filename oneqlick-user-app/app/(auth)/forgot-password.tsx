import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPasswordScreen() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateInput = () => {
    if (!emailOrPhone.trim()) {
      setError('Please enter your email or phone number');
      return false;
    }

    const isEmail = validateEmail(emailOrPhone);
    const isPhone = validatePhone(emailOrPhone);

    if (!isEmail && !isPhone) {
      setError('Please enter a valid email or phone number');
      return false;
    }

    setError('');
    return true;
  };

  const handleSendResetLink = async () => {
    if (!validateInput()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call to send reset link
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      Alert.alert(
        'Reset Link Sent', 
        'We&apos;ve sent a password reset link to your email/phone. Please check your inbox.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (value: string) => {
    setEmailOrPhone(value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
    // Reset success state when user starts typing again
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1E3A8A', '#3B82F6', '#60A5FA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>Reset your password</Text>
          
          <Text style={styles.instructions}>
            Enter your email address or phone number and we&apos;ll send you a link to reset your password.
          </Text>

          {/* Success Message */}
          {isSuccess && (
            <View style={styles.successContainer}>
              <Text style={styles.successIcon}>✅</Text>
              <Text style={styles.successTitle}>Reset link sent!</Text>
              <Text style={styles.successMessage}>
                We&apos;ve sent a password reset link to your email/phone. Please check your inbox and follow the instructions.
              </Text>
            </View>
          )}

          {/* Form */}
          {!isSuccess && (
            <View style={styles.formContainer}>
              {/* Email/Phone Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email or Phone Number</Text>
                <TextInput
                  style={[
                    styles.input,
                    error && styles.inputError
                  ]}
                  placeholder="Enter your email or phone number"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={emailOrPhone}
                  onChangeText={handleInputChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                />
                {error ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : null}
              </View>

              {/* Send Reset Link Button */}
              <TouchableOpacity 
                style={[
                  styles.sendButton,
                  isLoading && styles.sendButtonDisabled
                ]}
                onPress={handleSendResetLink}
                disabled={isLoading}
              >
                <Text style={styles.sendButtonText}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Back to Login Link */}
          <View style={styles.backToLoginContainer}>
            <Text style={styles.backToLoginText}>Remember your password? </Text>
            <TouchableOpacity onPress={handleBackToLogin}>
              <Text style={styles.backToLoginLink}>Back to Login</Text>
            </TouchableOpacity>
          </View>

          {/* Additional Instructions */}
          <View style={styles.additionalInstructions}>
            <Text style={styles.additionalInstructionsTitle}>Need help?</Text>
            <Text style={styles.additionalInstructionsText}>
              • Check your spam folder if you don&apos;t see the email{'\n'}
              • Make sure you&apos;re using the email/phone associated with your account{'\n'}
              • Contact support if you continue to have issues
            </Text>
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  successContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  successIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 20,
  },
  formContainer: {
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 30,
  },
  inputLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'white',
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 8,
  },
  sendButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  sendButtonText: {
    color: '#1E3A8A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  backToLoginText: {
    color: 'white',
    fontSize: 16,
  },
  backToLoginLink: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  additionalInstructions: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  additionalInstructionsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  additionalInstructionsText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 20,
  },
}); 