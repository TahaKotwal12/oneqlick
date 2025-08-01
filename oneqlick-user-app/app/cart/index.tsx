import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Colors
const COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#10B981',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    white: '#FFFFFF',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  border: '#E5E7EB',
  veg: '#10B981',
  nonVeg: '#EF4444',
};

// Dummy cart data
const cartData = {
  restaurant: {
    id: '1',
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&q=80',
    deliveryTime: '25-30 min',
    deliveryFee: 40,
  },
  items: [
    {
      id: '1',
      name: 'Margherita Pizza',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&q=80',
      price: 349,
      originalPrice: 399,
      quantity: 2,
      isVeg: true,
      variant: 'Medium (10")',
      addOns: ['Extra Cheese', 'Black Olives'],
      instructions: 'Extra crispy base',
      restaurant: 'Pizza Palace',
    },
    {
      id: '2',
      name: 'Garlic Bread',
      image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=150&q=80',
      price: 149,
      originalPrice: 179,
      quantity: 1,
      isVeg: true,
      variant: 'Regular',
      addOns: [],
      instructions: '',
      restaurant: 'Pizza Palace',
    },
    {
      id: '3',
      name: 'Chicken Wings',
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=150&q=80',
      price: 299,
      originalPrice: 349,
      quantity: 1,
      isVeg: false,
      variant: 'Spicy (6 pieces)',
      addOns: ['Extra Sauce'],
      instructions: 'Medium spice level',
      restaurant: 'Pizza Palace',
    },
  ],
  deliveryAddress: {
    type: 'Home',
    address: '123, MG Road, Koramangala, Bangalore',
    landmark: 'Near Metro Station',
  },
  appliedCoupon: null,
};

// Available coupons
const availableCoupons = [
  {
    id: 'WELCOME50',
    code: 'WELCOME50',
    title: '50% Off',
    description: 'Get 50% off on orders above ₹299',
    discount: 50,
    minOrder: 299,
    maxDiscount: 150,
  },
  {
    id: 'FREEDEL',
    code: 'FREEDEL',
    title: 'Free Delivery',
    description: 'Free delivery on all orders',
    discount: 0,
    minOrder: 0,
    maxDiscount: 0,
    freeDelivery: true,
  },
  {
    id: 'SAVE100',
    code: 'SAVE100',
    title: '₹100 Off',
    description: 'Flat ₹100 off on orders above ₹500',
    discount: 100,
    minOrder: 500,
    maxDiscount: 100,
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(cartData.items);
  const [appliedCoupon, setAppliedCoupon] = useState(cartData.appliedCoupon);
  const [couponCode, setCouponCode] = useState('');
  const [showCoupons, setShowCoupons] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(cartData.deliveryAddress);

  // Calculate prices
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = appliedCoupon?.freeDelivery ? 0 : cartData.restaurant.deliveryFee;
  const taxes = Math.round(subtotal * 0.05); // 5% tax
  const platformFee = 5;
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount > 0) {
      discount = Math.min(
        (subtotal * appliedCoupon.discount) / 100,
        appliedCoupon.maxDiscount
      );
    }
  }
  
  const total = subtotal + deliveryFee + taxes + platformFee - discount;

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setCartItems(prev => prev.filter(item => item.id !== itemId));
          }
        }
      ]
    );
  };

  const applyCoupon = (coupon: any) => {
    if (subtotal < coupon.minOrder) {
      Alert.alert(
        'Invalid Coupon',
        `Minimum order value should be ₹${coupon.minOrder} to apply this coupon.`
      );
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCode(coupon.code);
    setShowCoupons(false);
    Alert.alert('Success!', `Coupon ${coupon.code} applied successfully.`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const handleManualCouponApply = () => {
    if (!couponCode.trim()) return;

    const coupon = availableCoupons.find(c => 
      c.code.toLowerCase() === couponCode.trim().toLowerCase()
    );

    if (coupon) {
      applyCoupon(coupon);
    } else {
      Alert.alert('Invalid Coupon', 'Please enter a valid coupon code.');
    }
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add some items to proceed.');
      return;
    }

    Alert.alert(
      'Proceed to Checkout',
      `Total amount: ₹${total}\nProceed to payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => console.log('Proceeding to checkout...') }
      ]
    );
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} contentFit="cover" />
        <View style={[styles.vegIndicator, { backgroundColor: item.isVeg ? COLORS.veg : COLORS.nonVeg }]}>
          <View style={styles.vegDot} />
        </View>
      </View>

      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.variant && (
          <Text style={styles.itemVariant}>{item.variant}</Text>
        )}
        {item.addOns.length > 0 && (
          <Text style={styles.itemAddOns}>
            Add-ons: {item.addOns.join(', ')}
          </Text>
        )}
        {item.instructions && (
          <Text style={styles.itemInstructions}>
            Note: {item.instructions}
          </Text>
        )}
        
        <View style={styles.itemPriceRow}>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
          {item.originalPrice > item.price && (
            <Text style={styles.itemOriginalPrice}>₹{item.originalPrice}</Text>
          )}
        </View>
      </View>

      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color={COLORS.error} />
        </TouchableOpacity>

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
      </View>
    </View>
  );

  const renderCouponModal = () => (
    <Modal
      visible={showCoupons}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowCoupons(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Available Coupons</Text>
          <TouchableOpacity onPress={() => setShowCoupons(false)}>
            <Ionicons name="close" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={availableCoupons}
          style={styles.couponsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.couponItem}
              onPress={() => applyCoupon(item)}
            >
              <View style={styles.couponLeft}>
                <Text style={styles.couponCode}>{item.code}</Text>
                <Text style={styles.couponTitle}>{item.title}</Text>
                <Text style={styles.couponDescription}>{item.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.applyCouponButton}
                onPress={() => applyCoupon(item)}
              >
                <Text style={styles.applyCouponText}>Apply</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </Modal>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Ionicons name="bag-outline" size={80} color={COLORS.text.tertiary} />
      <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
      <Text style={styles.emptyCartSubtitle}>
        Looks like you haven't added anything to your cart yet
      </Text>
      <TouchableOpacity
        style={styles.continueShoppingButton}
        onPress={() => router.push('/(tabs)/' as any)}
      >
        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <View style={styles.placeholder} />
        </View>

        {renderEmptyCart()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Restaurant Header */}
        <View style={styles.restaurantHeader}>
          <Image
            source={{ uri: cartData.restaurant.image }}
            style={styles.restaurantImage}
            contentFit="cover"
          />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{cartData.restaurant.name}</Text>
            <Text style={styles.deliveryTime}>
              <Ionicons name="time-outline" size={14} color={COLORS.text.secondary} />
              {' '}{cartData.restaurant.deliveryTime}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addMoreButton}
            onPress={() => router.push(`/restaurants/${cartData.restaurant.id}` as any)}
          >
            <Text style={styles.addMoreText}>Add More</Text>
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        <View style={styles.section}>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          />
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={() => setShowAddressModal(true)}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={20} color={COLORS.primary} />
            <View style={styles.addressDetails}>
              <Text style={styles.addressType}>{deliveryAddress.type}</Text>
              <Text style={styles.addressText}>{deliveryAddress.address}</Text>
              {deliveryAddress.landmark && (
                <Text style={styles.addressLandmark}>{deliveryAddress.landmark}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Bill Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Details</Text>
          <View style={styles.billDetails}>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Subtotal</Text>
              <Text style={styles.billValue}>₹{subtotal}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={[styles.billValue, deliveryFee === 0 && styles.freeText]}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Taxes & Charges</Text>
              <Text style={styles.billValue}>₹{taxes}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Platform Fee</Text>
              <Text style={styles.billValue}>₹{platformFee}</Text>
            </View>
            {discount > 0 && (
              <View style={styles.billRow}>
                <Text style={[styles.billLabel, styles.discountText]}>
                  Discount ({appliedCoupon?.code})
                </Text>
                <Text style={[styles.billValue, styles.discountText]}>-₹{discount}</Text>
              </View>
            )}
            <View style={[styles.billRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{total}</Text>
            </View>
          </View>
        </View>

        {/* Coupon Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apply Coupon</Text>
          
          {appliedCoupon ? (
            <View style={styles.appliedCouponContainer}>
              <View style={styles.appliedCouponInfo}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                <Text style={styles.appliedCouponText}>
                  {appliedCoupon.code} applied successfully!
                </Text>
              </View>
              <TouchableOpacity onPress={removeCoupon}>
                <Text style={styles.removeCouponText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.couponInputContainer}>
                <TextInput
                  style={styles.couponInput}
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChangeText={setCouponCode}
                  autoCapitalize="characters"
                />
                <TouchableOpacity
                  style={styles.applyCouponInputButton}
                  onPress={handleManualCouponApply}
                >
                  <Text style={styles.applyCouponInputText}>Apply</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity
                style={styles.viewCouponsButton}
                onPress={() => setShowCoupons(true)}
              >
                <Text style={styles.viewCouponsText}>View Available Coupons</Text>
                <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.bottomTotalLabel}>Total</Text>
          <Text style={styles.bottomTotalValue}>₹{total}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleProceedToCheckout}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.text.white} />
        </TouchableOpacity>
      </View>

      {renderCouponModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    marginBottom: 8,
  },
  restaurantImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  addMoreButton: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addMoreText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    backgroundColor: COLORS.surface,
    marginBottom: 8,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  changeText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  itemImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  vegIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.text.white,
  },
  itemDetails: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  itemVariant: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  itemAddOns: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    marginBottom: 2,
  },
  itemInstructions: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  itemPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginRight: 8,
  },
  itemOriginalPrice: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    textDecorationLine: 'line-through',
  },
  itemActions: {
    alignItems: 'flex-end',
  },
  removeButton: {
    padding: 4,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 6,
    padding: 2,
  },
  quantityButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressDetails: {
    marginLeft: 12,
    flex: 1,
  },
  addressType: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  addressLandmark: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    marginTop: 2,
  },
  billDetails: {
    marginTop: 8,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  billLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  billValue: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  freeText: {
    color: COLORS.success,
    fontWeight: '600',
  },
  discountText: {
    color: COLORS.success,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  appliedCouponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.success + '10',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.success + '30',
  },
  appliedCouponInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appliedCouponText: {
    fontSize: 14,
    color: COLORS.success,
    fontWeight: '500',
    marginLeft: 8,
  },
  removeCouponText: {
    color: COLORS.error,
    fontSize: 14,
    fontWeight: '500',
  },
  couponInputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  couponInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginRight: 8,
  },
  applyCouponInputButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyCouponInputText: {
    color: COLORS.text.white,
    fontSize: 14,
    fontWeight: '600',
  },
  viewCouponsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary + '10',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  viewCouponsText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 100,
  },
  bottomBar: {
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 35 : 16,
  },
  totalContainer: {
    marginRight: 16,
  },
  bottomTotalLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  bottomTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: COLORS.text.white,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  couponsList: {
    flex: 1,
    padding: 16,
  },
  couponItem: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  couponLeft: {
    flex: 1,
    marginRight: 12,
  },
  couponCode: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  couponTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  couponDescription: {
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 16,
  },
  applyCouponButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  applyCouponText: {
    color: COLORS.text.white,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: 20,
    marginBottom: 8,
  },
  emptyCartSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  continueShoppingButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueShoppingText: {
    color: COLORS.text.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 