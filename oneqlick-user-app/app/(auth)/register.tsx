import { useCreateUser } from '@/src/hooks/useUser';
import { CreateUserRequest } from '@/src/types/api';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Alert, Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const [formData, setFormData] = useState<CreateUserRequest>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '+91',
    password: '',
    role: 'customer',
    profile_image: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const createUserMutation = useCreateUser();

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
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 'none', color: '#ccc' };
    if (password.length < 6) return { strength: 'weak', color: '#ff4757' };
    if (password.length < 8) return { strength: 'fair', color: '#ffa502' };
    
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    
    if (score >= 3 && password.length >= 12) return { strength: 'strong', color: '#2ed573' };
    if (score >= 2 && password.length >= 10) return { strength: 'good', color: '#1e90ff' };
    return { strength: 'fair', color: '#ffa502' };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone || formData.phone === '+91') {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid Indian phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CreateUserRequest | 'confirmPassword' | 'gender' | 'dateOfBirth', value: string) => {
    if (field === 'confirmPassword') {
      setConfirmPassword(value);
    } else if (field === 'gender') {
      setGender(value);
    } else if (field === 'dateOfBirth') {
      setDateOfBirth(value);
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const result = await createUserMutation.mutateAsync(formData);
      
      Alert.alert(
        'Registration Successful!',
        `Welcome ${result.data.first_name}! Your account has been created successfully.`,
        [
          {
            text: 'Continue',
            onPress: () => {
              // Navigate to login or home screen
              router.replace('/(auth)/signin');
            },
          },
        ]
      );
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle specific API errors
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        const newErrors: Record<string, string> = {};
        
        Object.keys(apiErrors).forEach(key => {
          if (apiErrors[key] && apiErrors[key].length > 0) {
            newErrors[key] = apiErrors[key][0];
          }
        });
        
        setErrors(newErrors);
      }
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Complete your profile</Text>
            <Text style={styles.subtitle}>Create your OneQlick account</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Fields */}
            <View style={styles.nameRow}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={[styles.input, errors.firstName && styles.inputError]}
                  value={formData.first_name}
                  onChangeText={(value) => handleInputChange('first_name', value)}
                  placeholder="Enter first name"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  editable={!createUserMutation.isPending}
                />
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={[styles.input, errors.lastName && styles.inputError]}
                  value={formData.last_name}
                  onChangeText={(value) => handleInputChange('last_name', value)}
                  placeholder="Enter last name"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  editable={!createUserMutation.isPending}
                />
                {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!createUserMutation.isPending}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Phone */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="+919876543210"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                keyboardType="phone-pad"
                editable={!createUserMutation.isPending}
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.passwordInput, errors.password && styles.inputError]}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  placeholder="Create password"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  secureTextEntry={!showPassword}
                  editable={!createUserMutation.isPending}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
              {formData.password.length > 0 && (
                <View style={styles.passwordStrength}>
                  <View style={[styles.strengthBar, { backgroundColor: passwordStrength.color }]} />
                  <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                    {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                  </Text>
                </View>
              )}
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.passwordInput, errors.confirmPassword && styles.inputError]}
                  value={confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  placeholder="Confirm password"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  secureTextEntry={!showConfirmPassword}
                  editable={!createUserMutation.isPending}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Text style={styles.eyeText}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            {/* Optional Fields */}
            <View style={styles.optionalSection}>
              <Text style={styles.optionalTitle}>Optional Information</Text>
              
              {/* Gender */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender (Optional)</Text>
                <View style={styles.genderContainer}>
                  {['Male', 'Female', 'Other'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.genderOption,
                        gender === option && styles.genderOptionSelected,
                      ]}
                      onPress={() => handleInputChange('gender', option)}
                      disabled={createUserMutation.isPending}
                    >
                      <Text
                        style={[
                          styles.genderText,
                          gender === option && styles.genderTextSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Date of Birth */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date of Birth (Optional)</Text>
                <TextInput
                  style={styles.input}
                  value={dateOfBirth}
                  onChangeText={(value) => handleInputChange('dateOfBirth', value)}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  editable={!createUserMutation.isPending}
                />
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                createUserMutation.isPending && styles.registerButtonDisabled,
              ]}
              onPress={handleRegister}
              disabled={createUserMutation.isPending}
            >
              {createUserMutation.isPending ? (
                <View style={styles.loadingContainer}>
                  <View style={styles.spinner} />
                  <Text style={styles.registerButtonText}>Creating Account...</Text>
                </View>
              ) : (
                <Text style={styles.registerButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signin')}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: 'white',
  },
  inputError: {
    borderColor: '#ff4757',
  },
  errorText: {
    color: '#ff4757',
    fontSize: 14,
    marginTop: 4,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingRight: 50,
    fontSize: 16,
    color: 'white',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  eyeText: {
    fontSize: 20,
  },
  passwordStrength: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  strengthBar: {
    width: 60,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
  },
  optionalSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  genderOptionSelected: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  genderText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  genderTextSelected: {
    color: '#1E3A8A',
  },
  registerButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  registerButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  registerButtonText: {
    color: '#1E3A8A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#1E3A8A',
    borderTopColor: 'transparent',
    borderRadius: 10,
    marginRight: 10,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  signInLink: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
}); 