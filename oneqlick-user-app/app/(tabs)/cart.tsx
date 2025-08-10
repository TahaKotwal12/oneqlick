import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

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

// Dummy data for cart items
const CART_DATA = [
  {
    id: '1',
    restaurantName: 'Punjabi Dhaba',
    itemName: 'Butter Chicken',
    price: 280,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100&q=80',
    description: 'Creamy tomato-based curry with tender chicken',
    preparationTime: '20-25 min',
  },
  {
    id: '2',
    restaurantName: 'Punjabi Dhaba',
    itemName: 'Dal Makhani',
    price: 120,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&q=80',
    description: 'Black lentils cooked with cream and butter',
    preparationTime: '15-20 min',
  },
  {
    id: '3',
    restaurantName: 'Punjabi Dhaba',
    itemName: 'Naan',
    price: 25,
    quantity: 3,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&q=80',
    description: 'Soft leavened flatbread',
    preparationTime: '10-15 min',
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(CART_DATA);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      Alert.alert(
        'Remove Item',
        'Do you want to remove this item from cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: () => removeItem(id) },
        ]
      );
      return;
    }

    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    return getSubtotal() > 500 ? 0 : 40;
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee();
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        <View style={styles.itemImage}>
          <Text style={styles.itemImageText}>{item.itemName.charAt(0)}</Text>
        </View>
      </View>
      
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.itemName}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Ionicons name="close" size={20} color={COLORS.text.tertiary} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        
        <View style={styles.itemFooter}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Ionicons name="remove" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Ionicons name="add" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
        </View>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
        
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Cart</Text>
          </View>
        </LinearGradient>

        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={80} color={COLORS.text.tertiary} />
          <Text style={styles.emptyStateTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptyStateSubtitle}>
            Add delicious food items to get started
          </Text>
          <TouchableOpacity style={styles.emptyStateButton}>
            <Text style={styles.emptyStateButtonText}>Explore Restaurants</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Cart</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="trash-outline" size={24} color={COLORS.text.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      {/* Price Summary */}
      <View style={styles.priceSummary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{getSubtotal()}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>
            {getDeliveryFee() === 0 ? 'Free' : `₹${getDeliveryFee()}`}
          </Text>
        </View>
        
        {getDeliveryFee() > 0 && (
          <View style={styles.freeDeliveryInfo}>
            <Ionicons name="information-circle" size={16} color={COLORS.success} />
            <Text style={styles.freeDeliveryText}>
              Add ₹{500 - getSubtotal()} more for free delivery
            </Text>
          </View>
        )}
        
        <View style={styles.divider} />
        
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{getTotal()}</Text>
        </View>
      </View>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => Alert.alert('Checkout', 'Proceeding to checkout...')}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.checkoutGradient}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <Text style={styles.checkoutSubtext}>₹{getTotal()} • {cartItems.length} items</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.h1,
    fontWeight: '700',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartList: {
    padding: SPACING.lg,
    paddingBottom: 200, // Space for price summary and checkout button
  },
  cartItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    flexDirection: 'row',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  itemImageContainer: {
    marginRight: SPACING.md,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImageText: {
    color: COLORS.text.white,
    fontSize: 24,
    fontWeight: '700',
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemName: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.h5,
    fontWeight: '600',
    flex: 1,
    marginRight: SPACING.sm,
  },
  restaurantName: {
    color: COLORS.text.secondary,
    ...TYPOGRAPHY.bodyMedium,
    marginBottom: 4,
  },
  itemDescription: {
    color: COLORS.text.tertiary,
    ...TYPOGRAPHY.bodySmall,
    marginBottom: SPACING.md,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 20,
    paddingHorizontal: SPACING.xs,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.xs,
  },
  quantityText: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  itemPrice: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.h5,
    fontWeight: '700',
  },
  priceSummary: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  summaryLabel: {
    color: COLORS.text.secondary,
    ...TYPOGRAPHY.bodyMedium,
  },
  summaryValue: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
  },
  freeDeliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    padding: SPACING.sm,
    borderRadius: 8,
    marginBottom: SPACING.md,
    gap: 6,
  },
  freeDeliveryText: {
    color: COLORS.text.secondary,
    ...TYPOGRAPHY.bodySmall,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  totalLabel: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.h4,
    fontWeight: '600',
  },
  totalValue: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.h3,
    fontWeight: '700',
  },
  checkoutContainer: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  checkoutButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  checkoutGradient: {
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.h4,
    fontWeight: '700',
    marginBottom: 4,
  },
  checkoutSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    ...TYPOGRAPHY.bodyMedium,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  emptyStateTitle: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.h3,
    fontWeight: '600',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptyStateSubtitle: {
    color: COLORS.text.secondary,
    ...TYPOGRAPHY.bodyMedium,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  emptyStateButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 25,
  },
  emptyStateButtonText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
  },
}); 