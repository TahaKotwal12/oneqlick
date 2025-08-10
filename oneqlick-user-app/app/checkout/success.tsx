import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
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

// Dummy order data
const ORDER_DETAILS = {
  orderId: 'ONQ123456789',
  restaurantName: 'Spice Garden Restaurant',
  estimatedDelivery: '25-35 minutes',
  items: [
    { name: 'Butter Chicken', quantity: 2, price: 280 },
    { name: 'Dal Makhani', quantity: 1, price: 120 },
    { name: 'Naan', quantity: 3, price: 25 },
  ],
  total: 770,
  deliveryAddress: 'House No. 123, Street 5, Village Panchayat, Amritsar, Punjab - 143001',
};

export default function SuccessScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleTrackOrder = () => {
    // Navigate to order tracking
    router.push('/(tabs)/orders');
  };

  const handleBackToHome = () => {
    router.push('/(tabs)/');
  };

  const handleViewOrders = () => {
    router.push('/(tabs)/orders');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <LinearGradient
        colors={[COLORS.success, COLORS.accent]}
        style={styles.header}
      >
        <Animated.View
          style={[
            styles.successIconContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Ionicons name="checkmark-circle" size={80} color={COLORS.text.white} />
        </Animated.View>
        
        <Animated.Text
          style={[
            styles.successTitle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          Order Placed Successfully!
        </Animated.Text>
        
        <Animated.Text
          style={[
            styles.successSubtitle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          Your order has been confirmed and is being prepared
        </Animated.Text>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Details */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Order Details</Text>
          
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Order ID</Text>
            <Text style={styles.orderInfoValue}>{ORDER_DETAILS.orderId}</Text>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Restaurant</Text>
            <Text style={styles.orderInfoValue}>{ORDER_DETAILS.restaurantName}</Text>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Estimated Delivery</Text>
            <Text style={styles.orderInfoValue}>{ORDER_DETAILS.estimatedDelivery}</Text>
          </View>
        </Animated.View>

        {/* Order Items */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Order Items</Text>
          
          {ORDER_DETAILS.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.orderItemLeft}>
                <Text style={styles.orderItemName}>{item.name}</Text>
                <Text style={styles.orderItemQty}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.orderItemPrice}>₹{item.price * item.quantity}</Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{ORDER_DETAILS.total}</Text>
          </View>
        </Animated.View>

        {/* Delivery Address */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={20} color={COLORS.primary} style={styles.addressIcon} />
            <Text style={styles.addressText}>{ORDER_DETAILS.deliveryAddress}</Text>
          </View>
        </Animated.View>

        {/* Next Steps */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>What's Next?</Text>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepIcon}>
              <Ionicons name="restaurant" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Restaurant is preparing your order</Text>
              <Text style={styles.stepDescription}>
                The kitchen team is working on your delicious meal
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepIcon}>
              <Ionicons name="bicycle" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Delivery partner will pick up</Text>
              <Text style={styles.stepDescription}>
                A delivery partner will collect your order and bring it to you
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepIcon}>
              <Ionicons name="home" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Enjoy your meal!</Text>
              <Text style={styles.stepDescription}>
                Your order will be delivered to your doorstep
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleTrackOrder}
          >
            <Ionicons name="location" size={20} color={COLORS.text.white} style={styles.buttonIcon} />
            <Text style={styles.primaryButtonText}>Track Order</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleViewOrders}
          >
            <Ionicons name="list" size={20} color={COLORS.primary} style={styles.buttonIcon} />
            <Text style={styles.secondaryButtonText}>View All Orders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.tertiaryButton}
            onPress={handleBackToHome}
          >
            <Text style={styles.tertiaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
  },
  header: {
    padding: SPACING.xxxl,
    alignItems: 'center',
    paddingBottom: SPACING.xxl,
  },
  successIconContainer: {
    marginBottom: SPACING.lg,
  },
  successTitle: {
    color: COLORS.text.white,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  successSubtitle: {
    color: COLORS.text.white,
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
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
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  orderInfoLabel: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  orderInfoValue: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '500',
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
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIcon: {
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  addressText: {
    color: COLORS.text.secondary,
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  stepDescription: {
    color: COLORS.text.secondary,
    fontSize: 12,
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  primaryButtonText: {
    color: COLORS.text.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  tertiaryButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  tertiaryButtonText: {
    color: COLORS.text.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  buttonIcon: {
    marginRight: SPACING.sm,
  },
}); 