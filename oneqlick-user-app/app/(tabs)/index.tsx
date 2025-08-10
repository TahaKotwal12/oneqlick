import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Indian Food Delivery App Colors
const COLORS = {
  primary: '#FF6B35', // Warm Orange - Indian Food Theme
  primaryLight: '#FF8A65',
  secondary: '#4CAF50', // Green for Fresh Food
  accent: '#FF9800', // Orange Accent
  background: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceLight: '#F8FAFC',
  text: {
    primary: '#1A1A1A',
    secondary: '#4A4A4A',
    tertiary: '#8A8A8A',
    white: '#FFFFFF',
    muted: '#D1D5DB',
  },
  gradient: {
    primary: ['#FF6B35', '#FF8A65'],
    secondary: ['#4CAF50', '#66BB6A'],
    accent: ['#FF9800', '#FFB74D'],
    warm: ['#FF5722', '#FF7043'],
    indian: ['#E91E63', '#F06292'],
  },
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  border: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  indian: {
    saffron: '#FF9933',
    white: '#FFFFFF',
    green: '#138808',
  }
};

// Typography System
const TYPOGRAPHY = {
  h1: { fontSize: 32, fontWeight: '800', lineHeight: 40 },
  h2: { fontSize: 28, fontWeight: '700', lineHeight: 36 },
  h3: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  h4: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  h5: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodyMedium: { fontSize: 15, fontWeight: '500', lineHeight: 22 },
  bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
  small: { fontSize: 11, fontWeight: '400', lineHeight: 14 },
};

// Spacing System
const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Indian Food Delivery Banners
const promotionalBanners = [
  {
    id: 1,
    title: '50% OFF',
    subtitle: 'First Order',
    description: 'Use code WELCOME50',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&q=80',
    gradient: COLORS.gradient.primary,
    ctaText: 'Order Now'
  },
  {
    id: 2,
    title: 'Free Delivery',
    subtitle: 'No charges',
    description: 'On orders above ₹199',
    image: 'https://images.unsplash.com/photo-1504674900240-9c9c0c1d0b1a?w=400&q=80',
    gradient: COLORS.gradient.secondary,
    ctaText: 'Explore'
  },
  {
    id: 3,
    title: '15 Min Delivery',
    subtitle: 'Lightning fast',
    description: 'In selected areas',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
    gradient: COLORS.gradient.accent,
    ctaText: 'Try Now'
  }
];

// Indian Food Quick Actions
const quickActions = [
  { 
    id: 1, 
    title: 'Restaurants', 
    icon: 'restaurant-outline',
    color: '#FF6B35',
    description: '1000+ options'
  },
  { 
    id: 2, 
    title: 'Groceries', 
    icon: 'storefront-outline',
    color: '#4CAF50',
    description: 'Fresh & fast'
  },
  { 
    id: 3, 
    title: 'Medicine', 
    icon: 'medical-outline',
    color: '#2196F3',
    description: '24/7 available'
  },
  { 
    id: 4, 
    title: 'More', 
    icon: 'ellipsis-horizontal-outline',
    color: '#9C27B0',
    description: 'See all'
  },
];

// Indian Food Categories
const categories = [
  { 
    id: 1, 
    name: 'North Indian', 
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80',
    count: 150,
    trending: true
  },
  { 
    id: 2, 
    name: 'South Indian', 
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&q=80',
    count: 120,
    trending: true
  },
  { 
    id: 3, 
    name: 'Chinese', 
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80',
    count: 95
  },
  { 
    id: 4, 
    name: 'Street Food', 
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80',
    count: 200,
    trending: true
  },
  { 
    id: 5, 
    name: 'Desserts', 
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&q=80',
    count: 80
  },
  { 
    id: 6, 
    name: 'Beverages', 
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80',
    count: 65
  }
];

// Indian Restaurant Data
const popularRestaurants = [
  {
    id: 1,
    name: 'Dhaba Express',
    rating: 4.5,
    reviewCount: 1250,
    deliveryTime: 25,
    deliveryFee: 40,
    cuisine: 'North Indian • Punjabi',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
    isOpen: true,
    discount: 20,
    promoted: true,
    distance: 2.1,
    priceLevel: 2
  },
  {
    id: 2,
    name: 'Idli House',
    rating: 4.3,
    reviewCount: 890,
    deliveryTime: 20,
    deliveryFee: 30,
    cuisine: 'South Indian • Breakfast',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&q=80',
    isOpen: true,
    discount: 15,
    distance: 1.8,
    priceLevel: 2
  },
  {
    id: 3,
    name: 'Chinese Wok',
    rating: 5.0,
    reviewCount: 2100,
    deliveryTime: 30,
    deliveryFee: 50,
    cuisine: 'Chinese • Indo-Chinese',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    isOpen: true,
    discount: 25,
    promoted: true,
    distance: 3.2,
    priceLevel: 3
  }
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState('Getting location...');
  const [cartItemCount, setCartItemCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(2);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const bannerRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Get location on mount
    getLocation();

    // Auto-scroll banners
    const interval = setInterval(() => {
      if (currentBannerIndex < promotionalBanners.length - 1) {
        setCurrentBannerIndex(currentBannerIndex + 1);
        bannerRef.current?.scrollToIndex({ 
          index: currentBannerIndex + 1, 
          animated: true 
        });
      } else {
        setCurrentBannerIndex(0);
        bannerRef.current?.scrollToIndex({ 
          index: 0, 
          animated: true 
        });
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentBannerIndex, fadeAnim]);

  const getLocation = async () => {
    try {
      // Request permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAddress('Location permission denied');
        return;
      }

      // Get current position
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      setLocation(currentLocation);

      // Reverse geocode to get address
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (addressResponse.length > 0) {
        const addr = addressResponse[0];
        const formattedAddress = `${addr.name || addr.street || ''}, ${addr.city || addr.district || ''}`.replace(/^,\s*/, '');
        setAddress(formattedAddress || 'Location found');
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setAddress('Koramangala, Bangalore'); // Fallback
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      getLocation(),
      new Promise(resolve => setTimeout(resolve, 1000))
    ]);
    setRefreshing(false);
  };

  const handleSearch = () => {
    router.push('/(tabs)/search' as any);
  };

  const handleLocationPress = () => {
    Alert.alert(
      'Change Location',
      'Would you like to refresh your current location?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Refresh', onPress: getLocation }
      ]
    );
  };

  const handleNotificationPress = () => {
    console.log('Notifications pressed');
  };

  const handleCartPress = () => {
    router.push('/cart/' as any);
  };

  const handleQuickActionPress = (action: any) => {
    if (action.title === 'Restaurants') {
      router.push('/restaurants/' as any);
    } else {
      console.log('Quick action pressed:', action.title);
    }
  };

  const handleCategoryPress = (category: any) => {
    console.log('Category pressed:', category.name);
  };

  const handleRestaurantPress = (restaurant: any) => {
    router.push(`/restaurants/${restaurant.id}` as any);
  };

  const renderPriceLevel = (level: number) => {
    return '₹'.repeat(level) + '○'.repeat(3 - level);
  };

  const renderBannerItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.bannerContainer}>
      <LinearGradient
        colors={item.gradient}
        style={styles.bannerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.bannerContent}>
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>{item.title}</Text>
            <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
            <Text style={styles.bannerDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>{item.ctaText}</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.bannerRight}>
            <Image
              source={{ uri: item.image }}
              style={styles.bannerImage}
              contentFit="cover"
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderQuickActionItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.quickActionItem}
      onPress={() => handleQuickActionPress(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: item.color + '15' }]}>
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <Text style={styles.quickActionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.categoryImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.categoryImage}
          contentFit="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.4)']}
          style={styles.categoryOverlay}
        />
        {item.trending && (
          <View style={styles.trendingBadge}>
            <Text style={styles.trendingBadgeText}>Hot</Text>
          </View>
        )}
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryCount}>{item.count}+ places</Text>
    </TouchableOpacity>
  );

  const renderRestaurantItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.restaurantCard}
      onPress={() => handleRestaurantPress(item)}
      activeOpacity={0.95}
    >
      <View style={styles.restaurantImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.restaurantImage}
          contentFit="cover"
        />
        
        {/* Badges */}
        <View style={styles.restaurantBadges}>
          {item.promoted && (
            <View style={styles.promotedBadge}>
              <Text style={styles.promotedText}>AD</Text>
            </View>
          )}
          {item.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}% OFF</Text>
            </View>
          )}
        </View>

        {/* Delivery Time */}
        <View style={styles.deliveryTimeCard}>
          <Text style={styles.deliveryTimeText}>{item.deliveryTime} min</Text>
        </View>
      </View>
      
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFA500" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.cuisineText} numberOfLines={1}>{item.cuisine}</Text>
        
        <View style={styles.restaurantMeta}>
          <Text style={styles.metaText}>{item.distance} km</Text>
          <View style={styles.metaDot} />
          <Text style={styles.metaText}>{renderPriceLevel(item.priceLevel)}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.metaText}>₹{item.deliveryFee} delivery</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Fixed Header with Location and Actions */}
      <View style={styles.header}>
        <LinearGradient
          colors={COLORS.gradient.primary}
          style={styles.headerGradient}
        >
          <View style={styles.headerTop}>
            {/* Location */}
            <TouchableOpacity style={styles.locationContainer} onPress={handleLocationPress}>
              <View style={styles.locationIcon}>
                <Ionicons name="location" size={16} color={COLORS.text.white} />
              </View>
              <View style={styles.locationText}>
                <Text style={styles.deliverTo}>Deliver to</Text>
                <Text style={styles.currentLocation} numberOfLines={1}>{address}</Text>
              </View>
              <Ionicons name="chevron-down" size={16} color={COLORS.text.white} />
            </TouchableOpacity>

            {/* Actions */}
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleNotificationPress}>
                <Ionicons name="notifications-outline" size={20} color={COLORS.text.white} />
                {notificationCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{notificationCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleCartPress}>
                <Ionicons name="bag-outline" size={20} color={COLORS.text.white} />
                {cartItemCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartItemCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Search Bar - Outside Blue Container */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar} onPress={handleSearch}>
          <Ionicons name="search" size={18} color={COLORS.text.tertiary} />
          <Text style={styles.searchPlaceholder}>Search restaurants, dishes...</Text>
          <Ionicons name="mic-outline" size={18} color={COLORS.text.tertiary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Animated.ScrollView 
        style={[styles.content, { opacity: fadeAnim }]}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Banners */}
        <View style={styles.bannersSection}>
          <FlatList
            ref={bannerRef}
            data={promotionalBanners}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / (width - SPACING.xxxl));
              setCurrentBannerIndex(index);
            }}
          />
          <View style={styles.bannerDots}>
            {promotionalBanners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.bannerDot,
                  index === currentBannerIndex && styles.bannerDotActive
                ]}
              />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What would you like?</Text>
          <FlatList
            data={quickActions}
            renderItem={renderQuickActionItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContainer}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Popular Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular nearby</Text>
            <TouchableOpacity onPress={() => router.push('/restaurants/' as any)}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          {popularRestaurants.map((restaurant) => (
            <View key={restaurant.id}>
              {renderRestaurantItem({ item: restaurant })}
            </View>
          ))}
        </View>

        {/* Local Vendors Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Local Vendors</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.localVendorsContainer}>
            <TouchableOpacity style={styles.localVendorCard}>
              <View style={styles.vendorIcon}>
                <Ionicons name="bicycle-outline" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.vendorTitle}>Street Food</Text>
              <Text style={styles.vendorSubtitle}>Local favorites</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.localVendorCard}>
              <View style={styles.vendorIcon}>
                <Ionicons name="home-outline" size={24} color={COLORS.secondary} />
              </View>
              <Text style={styles.vendorTitle}>Home Kitchen</Text>
              <Text style={styles.vendorSubtitle}>Homemade food</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.localVendorCard}>
              <View style={styles.vendorIcon}>
                <Ionicons name="leaf-outline" size={24} color={COLORS.accent} />
              </View>
              <Text style={styles.vendorTitle}>Organic</Text>
              <Text style={styles.vendorSubtitle}>Fresh produce</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Regional Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Regional Specialties</Text>
          <View style={styles.regionalContainer}>
            <TouchableOpacity style={styles.regionalCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80' }}
                style={styles.regionalImage}
                contentFit="cover"
              />
              <View style={styles.regionalOverlay}>
                <Text style={styles.regionalTitle}>Punjabi Dhaba</Text>
                <Text style={styles.regionalSubtitle}>Butter Chicken, Dal Makhani</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.regionalCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&q=80' }}
                style={styles.regionalImage}
                contentFit="cover"
              />
              <View style={styles.regionalOverlay}>
                <Text style={styles.regionalTitle}>South Indian</Text>
                <Text style={styles.regionalSubtitle}>Idli, Dosa, Sambar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rural Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rural Features</Text>
          <View style={styles.ruralFeaturesContainer}>
            <TouchableOpacity style={styles.ruralFeatureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="language-outline" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.featureTitle}>Local Language</Text>
              <Text style={styles.featureSubtitle}>Hindi, Punjabi, Tamil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.ruralFeatureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="cash-outline" size={24} color={COLORS.secondary} />
              </View>
              <Text style={styles.featureTitle}>Cash on Delivery</Text>
              <Text style={styles.featureSubtitle}>No online payment needed</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.ruralFeatureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="call-outline" size={24} color={COLORS.accent} />
              </View>
              <Text style={styles.featureTitle}>Phone Orders</Text>
              <Text style={styles.featureSubtitle}>Call to order</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Demo Food Detail Button */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Try Food Detail Screen</Text>
          <TouchableOpacity 
            style={styles.demoButton}
            onPress={() => router.push('/food/1' as any)}
          >
            <Text style={styles.demoButtonText}>View Margherita Pizza Details</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.text.white} />
          </TouchableOpacity>
        </View>

        {/* Demo Cart Button */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Try Shopping Cart</Text>
          <TouchableOpacity 
            style={[styles.demoButton, { backgroundColor: COLORS.success }]}
            onPress={() => router.push('/cart/' as any)}
          >
            <Text style={styles.demoButtonText}>View Shopping Cart</Text>
            <Ionicons name="bag-outline" size={20} color={COLORS.text.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    zIndex: 10,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? SPACING.xxl : SPACING.xxxl,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.lg,
  },
  locationIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: SPACING.sm,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  locationText: {
    flex: 1,
  },
  deliverTo: {
    color: 'rgba(255, 255, 255, 0.8)',
    ...TYPOGRAPHY.small,
    marginBottom: 2,
  },
  currentLocation: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  actionButton: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: SPACING.md,
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.text.white,
  },
  badgeText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.small,
    fontWeight: '700',
  },
  searchContainer: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchPlaceholder: {
    flex: 1,
    color: COLORS.text.tertiary,
    ...TYPOGRAPHY.bodyMedium,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  bannersSection: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxxl,
  },
  bannerContainer: {
    width: width - SPACING.xxxl,
    height: 140,
    marginHorizontal: SPACING.lg,
  },
  bannerGradient: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  bannerLeft: {
    flex: 1,
    paddingRight: SPACING.lg,
  },
  bannerTitle: {
    color: COLORS.text.white,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginBottom: 2,
  },
  bannerDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: SPACING.md,
  },
  bannerButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bannerButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  bannerRight: {
    width: 80,
    height: 80,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  bannerDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  bannerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.text.muted,
  },
  bannerDotActive: {
    backgroundColor: COLORS.primary,
    width: 20,
  },
  section: {
    marginBottom: SPACING.xxxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.h4,
  },
  seeAllText: {
    color: COLORS.primary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
  },
  quickActionsContainer: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.xl,
  },
  quickActionItem: {
    alignItems: 'center',
    width: 70,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  quickActionTitle: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.caption,
    fontWeight: '500',
    textAlign: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.lg,
  },
  categoryItem: {
    alignItems: 'center',
    width: 100,
  },
  categoryImageContainer: {
    position: 'relative',
    marginBottom: SPACING.sm,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  categoryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  trendingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: COLORS.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trendingBadgeText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.small,
    fontWeight: '600',
  },
  categoryName: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryCount: {
    color: COLORS.text.tertiary,
    ...TYPOGRAPHY.small,
  },
  restaurantCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  restaurantImageContainer: {
    position: 'relative',
    height: 140,
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  restaurantBadges: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promotedBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  promotedText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.small,
    fontWeight: '700',
  },
  discountBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.small,
    fontWeight: '700',
  },
  deliveryTimeCard: {
    position: 'absolute',
    bottom: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  deliveryTimeText: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.small,
    fontWeight: '600',
  },
  restaurantInfo: {
    padding: SPACING.lg,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  restaurantName: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.h5,
    flex: 1,
    marginRight: SPACING.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 2,
  },
  ratingText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.small,
    fontWeight: '600',
  },
  cuisineText: {
    color: COLORS.text.secondary,
    ...TYPOGRAPHY.bodySmall,
    marginBottom: SPACING.sm,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: COLORS.text.tertiary,
    ...TYPOGRAPHY.small,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.text.tertiary,
    marginHorizontal: SPACING.sm,
  },
  bottomSpacing: {
    height: 40,
  },
  demoButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  demoButtonText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
  },
  localVendorsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  localVendorCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  vendorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  vendorTitle: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  vendorSubtitle: {
    color: COLORS.text.tertiary,
    ...TYPOGRAPHY.small,
    textAlign: 'center',
  },
  regionalContainer: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.lg,
  },
  regionalCard: {
    position: 'relative',
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  regionalImage: {
    width: '100%',
    height: '100%',
  },
  regionalOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  regionalTitle: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.h5,
    fontWeight: '700',
    marginBottom: 2,
  },
  regionalSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    ...TYPOGRAPHY.bodySmall,
  },
  ruralFeaturesContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  ruralFeatureCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  featureTitle: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  featureSubtitle: {
    color: COLORS.text.tertiary,
    ...TYPOGRAPHY.small,
    textAlign: 'center',
  },
});
