import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Design system constants
const COLORS = {
  primary: '#667eea',
  secondary: '#f093fb',
  accent: '#4facfe',
  success: '#43e97b',
  warning: '#fa709a',
  error: '#ff6b6b',
  surface: '#ffffff',
  surfaceLight: '#f8fafc',
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    tertiary: '#94a3b8',
    white: '#ffffff',
  },
  shadow: '#000000',
  border: '#e2e8f0',
  successLight: '#dcfce7',
  warningLight: '#fef3c7',
};

const TYPOGRAPHY = {
  h1: { fontSize: 28, lineHeight: 36 },
  h2: { fontSize: 24, lineHeight: 32 },
  h3: { fontSize: 20, lineHeight: 28 },
  h4: { fontSize: 18, lineHeight: 26 },
  h5: { fontSize: 16, lineHeight: 24 },
  bodyLarge: { fontSize: 16, lineHeight: 24 },
  bodyMedium: { fontSize: 14, lineHeight: 20 },
  bodySmall: { fontSize: 12, lineHeight: 16 },
  small: { fontSize: 11, lineHeight: 16 },
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export default function PaymentScreen() {
  const [paymentType, setPaymentType] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [walletType, setWalletType] = useState('paytm');
  const [isLoading, setIsLoading] = useState(false);

  const paymentTypes = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
    { id: 'upi', name: 'UPI', icon: 'phone-portrait-outline' },
    { id: 'wallet', name: 'Digital Wallet', icon: 'wallet-outline' },
  ];

  const walletTypes = [
    { id: 'paytm', name: 'Paytm', icon: 'wallet-outline' },
    { id: 'phonepe', name: 'PhonePe', icon: 'phone-portrait-outline' },
    { id: 'gpay', name: 'Google Pay', icon: 'logo-google' },
    { id: 'amazonpay', name: 'Amazon Pay', icon: 'logo-amazon' },
  ];

  const handleSavePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success',
        'Payment method added successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add payment method. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (paymentType === 'card') {
      if (!cardNumber || !cardHolderName || !expiryDate || !cvv) {
        Alert.alert('Validation Error', 'Please fill in all card details.');
        return false;
      }
      if (cardNumber.length < 16) {
        Alert.alert('Validation Error', 'Please enter a valid card number.');
        return false;
      }
      if (cvv.length < 3) {
        Alert.alert('Validation Error', 'Please enter a valid CVV.');
        return false;
      }
    } else if (paymentType === 'upi') {
      if (!upiId) {
        Alert.alert('Validation Error', 'Please enter UPI ID.');
        return false;
      }
    }
    return true;
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const renderCardForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.inputLabel}>Card Number</Text>
      <TextInput
        style={styles.textInput}
        placeholder="1234 5678 9012 3456"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(formatCardNumber(text))}
        keyboardType="numeric"
        maxLength={19}
      />
      
      <Text style={styles.inputLabel}>Cardholder Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="John Doe"
        value={cardHolderName}
        onChangeText={setCardHolderName}
        autoCapitalize="words"
      />
      
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputLabel}>Expiry Date</Text>
          <TextInput
            style={styles.textInput}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={styles.textInput}
            placeholder="123"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
          />
        </View>
      </View>
    </View>
  );

  const renderUpiForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.inputLabel}>UPI ID</Text>
      <TextInput
        style={styles.textInput}
        placeholder="username@upi"
        value={upiId}
        onChangeText={setUpiId}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.helperText}>
        Enter your UPI ID (e.g., username@upi, username@okicici)
      </Text>
    </View>
  );

  const renderWalletForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.inputLabel}>Select Wallet</Text>
      <View style={styles.walletGrid}>
        {walletTypes.map((wallet) => (
          <TouchableOpacity
            key={wallet.id}
            style={[
              styles.walletOption,
              walletType === wallet.id && styles.walletOptionSelected
            ]}
            onPress={() => setWalletType(wallet.id)}
          >
            <Ionicons 
              name={wallet.icon as any} 
              size={24} 
              color={walletType === wallet.id ? COLORS.primary : COLORS.text.secondary} 
            />
            <Text style={[
              styles.walletOptionText,
              walletType === wallet.id && styles.walletOptionTextSelected
            ]}>
              {wallet.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Add Payment Method
        </Text>
      </LinearGradient>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Payment Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method Type</Text>
            <View style={styles.paymentTypeGrid}>
              {paymentTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.paymentTypeOption,
                    paymentType === type.id && styles.paymentTypeOptionSelected
                  ]}
                  onPress={() => setPaymentType(type.id)}
                >
                  <Ionicons 
                    name={type.icon as any} 
                    size={24} 
                    color={paymentType === type.id ? COLORS.primary : COLORS.text.secondary} 
                  />
                  <Text style={[
                    styles.paymentTypeText,
                    paymentType === type.id && styles.paymentTypeTextSelected
                  ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Dynamic Form */}
          {paymentType === 'card' && renderCardForm()}
          {paymentType === 'upi' && renderUpiForm()}
          {paymentType === 'wallet' && renderWalletForm()}

          {/* Save Button */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                isLoading && styles.saveButtonDisabled
              ]}
              onPress={handleSavePayment}
              disabled={isLoading}
            >
              <Text style={styles.saveButtonText}>
                {isLoading ? 'Adding...' : 'Add Payment Method'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
  },
  header: {
    padding: SPACING.lg,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    color: COLORS.text.white,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: COLORS.surface,
    margin: SPACING.lg,
    borderRadius: 16,
    padding: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.lg,
  },
  paymentTypeGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  paymentTypeOption: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  paymentTypeOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.successLight,
  },
  paymentTypeText: {
    color: COLORS.text.secondary,
    fontSize: 14,
    fontWeight: '500',
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  paymentTypeTextSelected: {
    color: COLORS.primary,
  },
  formSection: {
    backgroundColor: COLORS.surface,
    margin: SPACING.lg,
    borderRadius: 16,
    padding: SPACING.lg,
  },
  inputLabel: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: SPACING.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    color: COLORS.text.primary,
    fontSize: 14,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.lg,
  },
  helperText: {
    color: COLORS.text.tertiary,
    fontSize: 12,
    marginTop: -SPACING.md,
    marginBottom: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  halfWidth: {
    flex: 1,
  },
  walletGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  walletOption: {
    width: '48%',
    alignItems: 'center',
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  walletOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.successLight,
  },
  walletOptionText: {
    color: COLORS.text.secondary,
    fontSize: 14,
    fontWeight: '500',
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  walletOptionTextSelected: {
    color: COLORS.primary,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  saveButtonText: {
    color: COLORS.text.white,
    fontSize: 18,
    fontWeight: '600',
  },
}); 