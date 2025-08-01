import React, { useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useCreateUser } from '../hooks/useUser';
import { CreateUserRequest, UserRole } from '../types/api';

const CreateUserExample: React.FC = () => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    email: '',
    phone: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'customer',
    profile_image: '',
  });

  const [errors, setErrors] = useState<Partial<CreateUserRequest>>({});
  const createUserMutation = useCreateUser();

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateUserRequest> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+91[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid Indian phone number format (+91XXXXXXXXXX)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.first_name) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name) {
      newErrors.last_name = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CreateUserRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await createUserMutation.mutateAsync(formData);
      // Success is handled in the hook's onSuccess callback
      // Reset form after successful creation
      setFormData({
        email: '',
        phone: '',
        password: '',
        first_name: '',
        last_name: '',
        role: 'customer',
        profile_image: '',
      });
    } catch (error) {
      // Error is handled in the hook's onError callback
      console.error('Form submission error:', error);
    }
  };

  const roleOptions: { label: string; value: UserRole }[] = [
    { label: 'Customer', value: 'customer' },
    { label: 'Restaurant Owner', value: 'restaurant_owner' },
    { label: 'Delivery Partner', value: 'delivery_partner' },
    { label: 'Admin', value: 'admin' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New User</Text>

      <View style={styles.form}>
        {/* First Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={[styles.input, errors.first_name && styles.inputError]}
            value={formData.first_name}
            onChangeText={(value) => handleInputChange('first_name', value)}
            placeholder="Enter first name"
            editable={!createUserMutation.isPending}
          />
          {errors.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}
        </View>

        {/* Last Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name *</Text>
          <TextInput
            style={[styles.input, errors.last_name && styles.inputError]}
            value={formData.last_name}
            onChangeText={(value) => handleInputChange('last_name', value)}
            placeholder="Enter last name"
            editable={!createUserMutation.isPending}
          />
          {errors.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder="Enter email address"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!createUserMutation.isPending}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* Phone */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            placeholder="+919876543210"
            keyboardType="phone-pad"
            editable={!createUserMutation.isPending}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            placeholder="Enter password (min 8 characters)"
            secureTextEntry
            editable={!createUserMutation.isPending}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>

        {/* Role Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Role</Text>
          <View style={styles.roleContainer}>
            {roleOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.roleOption,
                  formData.role === option.value && styles.roleOptionSelected,
                ]}
                onPress={() => handleInputChange('role', option.value)}
                disabled={createUserMutation.isPending}
              >
                <Text
                  style={[
                    styles.roleOptionText,
                    formData.role === option.value && styles.roleOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Profile Image (Optional) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Profile Image URL (Optional)</Text>
          <TextInput
            style={styles.input}
            value={formData.profile_image}
            onChangeText={(value) => handleInputChange('profile_image', value)}
            placeholder="Enter profile image URL"
            autoCapitalize="none"
            editable={!createUserMutation.isPending}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            createUserMutation.isPending && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={createUserMutation.isPending}
        >
          {createUserMutation.isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>Create User</Text>
          )}
        </TouchableOpacity>

        {/* API Response Display */}
        {createUserMutation.isSuccess && createUserMutation.data && (
          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>User Created Successfully!</Text>
            <Text style={styles.successText}>
              User ID: {createUserMutation.data.data.user_id}
            </Text>
            <Text style={styles.successText}>
              Email: {createUserMutation.data.data.email}
            </Text>
            <Text style={styles.successText}>
              Status: {createUserMutation.data.data.status}
            </Text>
          </View>
        )}

        {/* Error Display */}
        {createUserMutation.isError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Error Creating User</Text>
            <Text style={styles.errorText}>
              {createUserMutation.error?.message || 'An unexpected error occurred'}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    textAlign: 'center',
    paddingVertical: 20,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#E53E3E',
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 14,
    marginTop: 4,
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  roleOptionSelected: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  roleOptionText: {
    fontSize: 14,
    color: '#4A5568',
  },
  roleOptionTextSelected: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#667eea',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successContainer: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    borderLeft: 4,
    borderLeftColor: '#48BB78',
  },
  successTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F855A',
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: '#2F855A',
    marginBottom: 4,
  },
  errorContainer: {
    backgroundColor: '#FED7D7',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    borderLeft: 4,
    borderLeftColor: '#E53E3E',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C53030',
    marginBottom: 8,
  },
});

export default CreateUserExample; 