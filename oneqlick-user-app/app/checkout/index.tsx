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
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
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

// Dummy data
const ORDER_SUMMARY = {
  items: [
    { id: '1', name: 'Butter Chicken', quantity: 2, price: 280 },
    { id: '2', name: 'Dal Makhani', quantity: 1, price: 120 },
    { id: '3', name: 'Naan', quantity: 3, price: 25 },
  ],
  subtotal: 695,
  deliveryFee: 40,
  taxes: 35,
  total: 770,
};

const DELIVERY_ADDRESS = {
  name: 'Rahul Kumar',
  address: 'House No. 123, Street 5, Village Panchayat',
  city: 'Amritsar',
  state: 'Punjab',
  pincode: '143001',
  phone: '+91 98765 43210',
};

const PAYMENT_METHODS = [
  { id: 'cod', name: 'Cash on Delivery', icon: 'cash-outline', type: 'cod' },
  { id: 'upi', name: 'UPI', icon: 'phone-portrait-outline', type: 'upi' },
  { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline', type: 'card' },
  { id: 'wallet', name: 'Digital Wallets', icon: 'wallet-outline', type: 'wallet' },
];

export default function CheckoutScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [restaurantInstructions, setRestaurantInstructions] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const [contactPreferences, setContactPreferences] = useState({
    callBeforeDelivery: true,
    smsUpdates: true,
    whatsappUpdates: false,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const tipOptions = [
    { amount: 0, label: 'No Tip' },
    { amount: 20, label: '₹20' },
    { amount: 50, label: '₹50' },
    { amount: 100, label: '₹100' },
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleTipSelect = (amount: number) => {
    setTipAmount(amount);
  };

  const handlePlaceOrder = async () => {
    if (!termsAccepted) {
      Alert.alert('Terms & Conditions', 'Please accept the terms and conditions to continue.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success screen
      router.push('/checkout/success');
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeAddress = () => {
    Alert.alert('Change Address', 'Address change functionality will be implemented here.');
  };

  const handleAddPaymentMethod = () => {
    router.push('/checkout/payment');
  };

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
          Checkout
        </Text>
      </LinearGradient>

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Delivery Address Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
              <TouchableOpacity onPress={handleChangeAddress}>
                <Text style={styles.changeButton}>Change</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.addressContainer}>
              <View style={styles.addressHeader}>
                <Ionicons name="location" size={20} color={COLORS.primary} style={styles.addressIcon} />
                <Text style={styles.addressName}>
                  {DELIVERY_ADDRESS.name}
                </Text>
              </View>
              <Text style={styles.addressText}>
                {DELIVERY_ADDRESS.address}
              </Text>
              <Text style={styles.addressText}>
                {DELIVERY_ADDRESS.city}, {DELIVERY_ADDRESS.state} - {DELIVERY_ADDRESS.pincode}
              </Text>
              <Text style={styles.addressPhone}>
                {DELIVERY_ADDRESS.phone}
              </Text>
            </View>

            <View style={{ marginBottom: SPACING.lg }}>
              <Text style={styles.inputLabel}>
                Special Delivery Instructions
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Call before delivery, Leave at gate"
                value={specialInstructions}
                onChangeText={setSpecialInstructions}
                multiline
                numberOfLines={2}
              />
            </View>
          </View>

          {/* Payment Method Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <TouchableOpacity onPress={handleAddPaymentMethod}>
                <Text style={styles.changeButton}>Add New</Text>
              </TouchableOpacity>
            </View>
            
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPaymentMethod === method.id ? { borderColor: COLORS.primary, backgroundColor: COLORS.successLight } : { borderColor: COLORS.border }
                ]}
                onPress={() => handlePaymentMethodSelect(method.id)}
              >
                <View style={styles.paymentMethodLeft}>
                  <View style={[styles.paymentIcon, { backgroundColor: COLORS.surfaceLight }]}>
                    <Ionicons name={method.icon as any} size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.paymentName}>{method.name}</Text>
                </View>
                <View style={[styles.radioButton, { borderColor: COLORS.border }]}>
                  {selectedPaymentMethod === method.id && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Order Summary Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            
            {ORDER_SUMMARY.items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <View style={styles.orderItemLeft}>
                  <Text style={styles.orderItemName}>{item.name}</Text>
                  <Text style={styles.orderItemQty}>Qty: {item.quantity}</Text>
                </View>
                <Text style={styles.orderItemPrice}>₹{item.price * item.quantity}</Text>
              </View>
            ))}
            
            <View style={styles.divider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{ORDER_SUMMARY.subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>₹{ORDER_SUMMARY.deliveryFee}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxes</Text>
              <Text style={styles.summaryValue}>₹{ORDER_SUMMARY.taxes}</Text>
            </View>
            {tipAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tip</Text>
                <Text style={styles.summaryValue}>₹{tipAmount}</Text>
              </View>
            )}
            
            <View style={styles.divider} />
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{ORDER_SUMMARY.total + tipAmount}</Text>
            </View>
          </View>

          {/* Additional Options Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Options</Text>
            
            <View style={{ marginBottom: SPACING.lg }}>
              <Text style={styles.inputLabel}>
                Special Instructions for Restaurant
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Less spicy, Extra onions"
                value={restaurantInstructions}
                onChangeText={setRestaurantInstructions}
                multiline
                numberOfLines={2}
              />
            </View>

            <View style={{ marginBottom: SPACING.lg }}>
              <Text style={styles.inputLabel}>
                Tip for Delivery Partner
              </Text>
              <View style={styles.tipContainer}>
                {tipOptions.map((tip) => (
                  <TouchableOpacity
                    key={tip.amount}
                    style={[
                      styles.tipButton,
                      tipAmount === tip.amount ? { borderColor: COLORS.primary, backgroundColor: COLORS.primary } : { borderColor: COLORS.border }
                    ]}
                    onPress={() => handleTipSelect(tip.amount)}
                  >
                    <Text style={[styles.tipButtonText, { color: tipAmount === tip.amount ? COLORS.text.white : COLORS.text.secondary }]}>
                      {tip.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={{ marginBottom: SPACING.lg }}>
              <Text style={styles.inputLabel}>
                Contact Preferences
              </Text>
              
              <View style={styles.contactRow}>
                <Text style={styles.contactLabel}>Call before delivery</Text>
                <Switch
                  value={contactPreferences.callBeforeDelivery}
                  onValueChange={(value) => setContactPreferences(prev => ({ ...prev, callBeforeDelivery: value }))}
                  trackColor={{ false: COLORS.border, true: COLORS.primary }}
                  thumbColor={COLORS.surface}
                />
              </View>
              
              <View style={styles.contactRow}>
                <Text style={styles.contactLabel}>SMS updates</Text>
                <Switch
                  value={contactPreferences.smsUpdates}
                  onValueChange={(value) => setContactPreferences(prev => ({ ...prev, smsUpdates: value }))}
                  trackColor={{ false: COLORS.border, true: COLORS.primary }}
                  thumbColor={COLORS.surface}
                />
              </View>
              
              <View style={styles.contactRow}>
                <Text style={styles.contactLabel}>WhatsApp updates</Text>
                <Switch
                  value={contactPreferences.whatsappUpdates}
                  onValueChange={(value) => setContactPreferences(prev => ({ ...prev, whatsappUpdates: value }))}
                  trackColor={{ false: COLORS.border, true: COLORS.primary }}
                  thumbColor={COLORS.surface}
                />
              </View>
            </View>
          </View>
          
          {/* Terms and Place Order */}
          <View style={styles.section}>
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={[styles.checkbox, { borderColor: COLORS.border }]}
                onPress={() => setTermsAccepted(!termsAccepted)}
              >
                {termsAccepted && (
                  <Ionicons name="checkmark" size={16} color={COLORS.primary} />
                )}
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsLink}>Terms & Conditions</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.placeOrderButton,
                !termsAccepted || isLoading ? { backgroundColor: COLORS.border } : { backgroundColor: COLORS.primary }
              ]}
              onPress={handlePlaceOrder}
              disabled={!termsAccepted || isLoading}
            >
              <Text style={styles.placeOrderButtonText}>
                {isLoading ? 'Placing Order...' : `Place Order • ₹${ORDER_SUMMARY.total + tipAmount}`}
              </Text>
            </TouchableOpacity>

            <View style={styles.deliveryInfo}>
              <Ionicons name="time-outline" size={16} color={COLORS.text.secondary} />
              <Text style={styles.deliveryInfoText}>
                Estimated delivery: 25-35 minutes
              </Text>
            </View>
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
  section: {
    backgroundColor: COLORS.surface,
    margin: SPACING.lg,
    borderRadius: 16,
    padding: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.text.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  changeButton: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  addressContainer: {
    backgroundColor: COLORS.surfaceLight,
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.lg,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  addressIcon: {
    marginRight: SPACING.sm,
  },
  addressName: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  addressText: {
    color: COLORS.text.secondary,
    fontSize: 14,
    marginBottom: 4,
  },
  addressPhone: {
    color: COLORS.text.tertiary,
    fontSize: 12,
    marginTop: 4,
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
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  paymentName: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  orderItemLeft: {
    flex: 1,
  },
  orderItemName: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  orderItemQty: {
    color: COLORS.text.tertiary,
    fontSize: 12,
  },
  orderItemPrice: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  summaryValue: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: COLORS.text.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  tipContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  tipButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderRadius: 8,
  },
  tipButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  contactLabel: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    color: COLORS.text.secondary,
    fontSize: 12,
    lineHeight: 18,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  placeOrderButton: {
    paddingVertical: SPACING.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  placeOrderButtonText: {
    color: COLORS.text.white,
    fontSize: 18,
    fontWeight: '600',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryInfoText: {
    color: COLORS.text.secondary,
    fontSize: 12,
    marginLeft: 4,
  },
  bottomSpacing: {
    marginBottom: SPACING.xxl,
  },
}); 