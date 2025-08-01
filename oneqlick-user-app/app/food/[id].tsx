import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    FlatList,
    Platform,
    SafeAreaView,
    Share,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

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

// Dummy food item data
const foodItemData = {
  id: '1',
  name: 'Margherita Pizza',
  description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and fresh basil leaves. Made with our signature hand-tossed dough and baked in a wood-fired oven.',
  images: [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&q=80',
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
  ],
  restaurant: 'Pizza Palace',
  isVeg: true,
  rating: 4.5,
  reviewsCount: 1250,
  basePrice: 299,
  originalPrice: 399,
  discount: 25,
  preparationTime: '25-30 min',
  variants: [
    { id: 'small', name: 'Small (8")', price: 0, selected: false },
    { id: 'medium', name: 'Medium (10")', price: 50, selected: true },
    { id: 'large', name: 'Large (12")', price: 100, selected: false },
  ],
  addOns: [
    { id: 'cheese', name: 'Extra Cheese', price: 50, selected: false },
    { id: 'olives', name: 'Black Olives', price: 30, selected: false },
    { id: 'mushrooms', name: 'Mushrooms', price: 40, selected: false },
    { id: 'pepperoni', name: 'Pepperoni', price: 80, selected: false },
  ],
  nutritionalInfo: {
    calories: '285 kcal',
    protein: '12g',
    carbs: '36g',
    fat: '10g',
    fiber: '2g',
    sodium: '640mg',
  },
  allergens: ['Gluten', 'Dairy', 'May contain nuts'],
  reviews: [
    {
      id: 1,
      userName: 'Rahul Sharma',
      rating: 5,
      comment: 'Absolutely delicious! The crust was perfect and toppings were fresh.',
      date: '2 days ago',
      helpful: 12,
    },
    {
      id: 2,
      userName: 'Priya Patel',
      rating: 4,
      comment: 'Good pizza but could use more cheese. Overall satisfied with the taste.',
      date: '1 week ago',
      helpful: 8,
    },
  ],
  similarItems: [
    {
      id: '2',
      name: 'Pepperoni Pizza',
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&q=80',
      price: 399,
      rating: 4.3,
    },
    {
      id: '3',
      name: 'Veggie Supreme',
      image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&q=80',
      price: 449,
      rating: 4.6,
    },
  ],
};

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('medium');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');
  const [showNutrition, setShowNutrition] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const calculateTotalPrice = () => {
    let total = foodItemData.basePrice;
    
    // Add variant price
    const variant = foodItemData.variants.find(v => v.id === selectedVariant);
    if (variant) total += variant.price;
    
    // Add add-ons price
    selectedAddOns.forEach(addonId => {
      const addon = foodItemData.addOns.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });
    
    return total * quantity;
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this delicious ${foodItemData.name} from ${foodItemData.restaurant}!`,
        title: foodItemData.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: foodItemData.id,
      name: foodItemData.name,
      quantity,
      variant: selectedVariant,
      addOns: selectedAddOns,
      instructions,
      totalPrice: calculateTotalPrice(),
    };
    
    Alert.alert(
      'Added to Cart!',
      `${foodItemData.name} has been added to your cart.`,
      [{ text: 'OK' }]
    );
    
    console.log('Added to cart:', cartItem);
  };

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const renderImageGallery = () => (
    <View style={styles.imageContainer}>
      <FlatList
        data={foodItemData.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentImageIndex(index);
        }}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.foodImage} contentFit="cover" />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      
      {/* Image indicators */}
      <View style={styles.imageIndicators}>
        {foodItemData.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentImageIndex && styles.activeIndicator
            ]}
          />
        ))}
      </View>
      
      {/* Veg/Non-veg indicator */}
      <View style={[styles.vegIndicator, { backgroundColor: foodItemData.isVeg ? COLORS.veg : COLORS.nonVeg }]}>
        <View style={styles.vegDot} />
      </View>
    </View>
  );

  const renderVariants = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Size</Text>
      {foodItemData.variants.map((variant) => (
        <TouchableOpacity
          key={variant.id}
          style={[
            styles.variantItem,
            selectedVariant === variant.id && styles.selectedVariant
          ]}
          onPress={() => setSelectedVariant(variant.id)}
        >
          <View style={styles.variantInfo}>
            <Text style={styles.variantName}>{variant.name}</Text>
            {variant.price > 0 && (
              <Text style={styles.variantPrice}>+₹{variant.price}</Text>
            )}
          </View>
          <View style={[
            styles.radioButton,
            selectedVariant === variant.id && styles.radioButtonSelected
          ]} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAddOns = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Add-ons</Text>
      {foodItemData.addOns.map((addon) => (
        <TouchableOpacity
          key={addon.id}
          style={styles.addonItem}
          onPress={() => toggleAddOn(addon.id)}
        >
          <View style={styles.addonInfo}>
            <Text style={styles.addonName}>{addon.name}</Text>
            <Text style={styles.addonPrice}>+₹{addon.price}</Text>
          </View>
          <View style={[
            styles.checkbox,
            selectedAddOns.includes(addon.id) && styles.checkboxSelected
          ]}>
            {selectedAddOns.includes(addon.id) && (
              <Ionicons name="checkmark" size={16} color={COLORS.text.white} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderReviews = () => (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setShowReviews(!showReviews)}
      >
        <Text style={styles.sectionTitle}>
          Reviews ({foodItemData.reviewsCount})
        </Text>
        <Ionicons 
          name={showReviews ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={COLORS.text.secondary} 
        />
      </TouchableOpacity>
      
      {showReviews && (
        <View style={styles.reviewsList}>
          {foodItemData.reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.userName}</Text>
                <View style={styles.reviewRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={12}
                      color={star <= review.rating ? COLORS.warning : COLORS.border}
                    />
                  ))}
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewHelpful}>{review.helpful} people found this helpful</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderSimilarItems = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Similar Items</Text>
      <FlatList
        data={foodItemData.similarItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.similarItem}>
            <Image source={{ uri: item.image }} style={styles.similarImage} contentFit="cover" />
            <Text style={styles.similarName} numberOfLines={2}>{item.name}</Text>
            <View style={styles.similarInfo}>
              <Text style={styles.similarPrice}>₹{item.price}</Text>
              <View style={styles.similarRating}>
                <Ionicons name="star" size={10} color={COLORS.warning} />
                <Text style={styles.similarRatingText}>{item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.similarItemsContainer}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.headerGradient}
        />
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text.white} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.headerButton} 
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={24} 
                color={isFavorite ? COLORS.error : COLORS.text.white} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
              <Ionicons name="share-outline" size={24} color={COLORS.text.white} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {renderImageGallery()}
        
        <View style={styles.content}>
          {/* Basic Info */}
          <View style={styles.basicInfo}>
            <Text style={styles.itemName}>{foodItemData.name}</Text>
            <Text style={styles.restaurant}>from {foodItemData.restaurant}</Text>
            <Text style={styles.description}>{foodItemData.description}</Text>
            
            <View style={styles.ratingContainer}>
              <View style={styles.rating}>
                <Ionicons name="star" size={16} color={COLORS.warning} />
                <Text style={styles.ratingText}>{foodItemData.rating}</Text>
                <Text style={styles.reviewsText}>({foodItemData.reviewsCount} reviews)</Text>
              </View>
              <Text style={styles.prepTime}>
                <Ionicons name="time-outline" size={14} color={COLORS.text.secondary} />
                {' '}{foodItemData.preparationTime}
              </Text>
            </View>
            
            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>₹{foodItemData.basePrice}</Text>
              {foodItemData.originalPrice > foodItemData.basePrice && (
                <>
                  <Text style={styles.originalPrice}>₹{foodItemData.originalPrice}</Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{foodItemData.discount}% OFF</Text>
                  </View>
                </>
              )}
            </View>
          </View>

          {renderVariants()}
          {renderAddOns()}

          {/* Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Instructions</Text>
            <TextInput
              style={styles.instructionsInput}
              placeholder="Any special cooking instructions..."
              value={instructions}
              onChangeText={setInstructions}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Nutritional Info */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => setShowNutrition(!showNutrition)}
            >
              <Text style={styles.sectionTitle}>Nutritional Information</Text>
              <Ionicons 
                name={showNutrition ? "chevron-up" : "chevron-down"} 
                size={20} 
                color={COLORS.text.secondary} 
              />
            </TouchableOpacity>
            
            {showNutrition && (
              <View style={styles.nutritionGrid}>
                {Object.entries(foodItemData.nutritionalInfo).map(([key, value]) => (
                  <View key={key} style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                    <Text style={styles.nutritionValue}>{value}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Allergens */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Allergen Information</Text>
            <View style={styles.allergensList}>
              {foodItemData.allergens.map((allergen, index) => (
                <View key={index} style={styles.allergenTag}>
                  <Text style={styles.allergenText}>{allergen}</Text>
                </View>
              ))}
            </View>
          </View>

          {renderReviews()}
          {renderSimilarItems()}
        </View>
      </Animated.ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Ionicons name="remove" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Ionicons name="add" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart • ₹{calculateTotalPrice()}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: Platform.OS === 'ios' ? 100 : 80,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  foodImage: {
    width: width,
    height: 300,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeIndicator: {
    backgroundColor: COLORS.text.white,
  },
  vegIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.text.white,
  },
  content: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  basicInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  restaurant: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  prepTime: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  originalPrice: {
    fontSize: 18,
    color: COLORS.text.tertiary,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text.white,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  variantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 8,
  },
  selectedVariant: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  variantInfo: {
    flex: 1,
  },
  variantName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  variantPrice: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  radioButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  addonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  addonInfo: {
    flex: 1,
  },
  addonName: {
    fontSize: 16,
    color: COLORS.text.primary,
  },
  addonPrice: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    backgroundColor: COLORS.surface,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  nutritionItem: {
    width: '45%',
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  nutritionLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  allergensList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergenTag: {
    backgroundColor: COLORS.warning + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  allergenText: {
    fontSize: 14,
    color: COLORS.warning,
    fontWeight: '500',
  },
  reviewsList: {
    marginTop: 16,
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    marginLeft: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewHelpful: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  similarItemsContainer: {
    paddingLeft: 20,
  },
  similarItem: {
    width: 140,
    marginRight: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  similarImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 4,
    height: 32,
  },
  similarInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  similarPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  similarRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  similarRatingText: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 4,
    marginRight: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: COLORS.surface,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.white,
  },
}); 