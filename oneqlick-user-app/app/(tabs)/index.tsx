import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Dummy Data
const promotionalBanners = [
  {
    id: 1,
    title: '50% OFF on First Order',
    subtitle: 'Use code: FIRST50',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    gradient: ['#FF6B6B', '#FF8E53']
  },
  {
    id: 2,
    title: 'Free Delivery',
    subtitle: 'On orders above ₹199',
    image: 'https://images.unsplash.com/photo-1504674900240-9c9c0c1d0b1a?w=400',
    gradient: ['#4ECDC4', '#44A08D']
  },
  {
    id: 3,
    title: 'Weekend Special',
    subtitle: 'Extra 20% off on weekends',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    gradient: ['#667eea', '#764ba2']
  }
];

const quickActions = [
  { id: 1, title: 'Restaurants', icon: 'restaurant', iconFamily: 'MaterialIcons', color: '#FF6B6B' },
  { id: 2, title: 'Groceries', icon: 'local-grocery-store', iconFamily: 'MaterialIcons', color: '#4ECDC4' },
  { id: 3, title: 'Pharmacy', icon: 'local-pharmacy', iconFamily: 'MaterialIcons', color: '#45B7D1' },
  { id: 4, title: 'Desserts', icon: 'cake', iconFamily: 'MaterialIcons', color: '#F7B801' },
  { id: 5, title: 'Beverages', icon: 'local-drink', iconFamily: 'MaterialIcons', color: '#FF9FF3' },
  { id: 6, title: 'Search', icon: 'search', iconFamily: 'Feather', color: '#A8E6CF' }
];

const categories = [
  { id: 1, name: 'Pizza', icon: 'pizza', iconFamily: 'MaterialIcons', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200' },
  { id: 2, name: 'Burger', icon: 'fastfood', iconFamily: 'MaterialIcons', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
  { id: 3, name: 'Chinese', icon: 'ramen-dining', iconFamily: 'MaterialIcons', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200' },
  { id: 4, name: 'South Indian', icon: 'restaurant', iconFamily: 'MaterialIcons', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200' },
  { id: 5, name: 'North Indian', icon: 'dinner-dining', iconFamily: 'MaterialIcons', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200' },
  { id: 6, name: 'Desserts', icon: 'cake', iconFamily: 'MaterialIcons', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200' }
];

const popularRestaurants = [
  {
    id: 1,
    name: 'Pizza Palace',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: '₹40',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300',
    isOpen: true,
    discount: '20% OFF'
  },
  {
    id: 2,
    name: 'Burger House',
    rating: 4.3,
    deliveryTime: '20-30 min',
    deliveryFee: '₹30',
    cuisine: 'American',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
    isOpen: true,
    discount: '15% OFF'
  },
  {
    id: 3,
    name: 'Chinese Wok',
    rating: 4.7,
    deliveryTime: '30-40 min',
    deliveryFee: '₹50',
    cuisine: 'Chinese',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300',
    isOpen: true,
    discount: '25% OFF'
  }
];

const trendingItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    restaurant: 'Pizza Palace',
    price: '₹299',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200'
  },
  {
    id: 2,
    name: 'Chicken Burger',
    restaurant: 'Burger House',
    price: '₹199',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200'
  },
  {
    id: 3,
    name: 'Fried Rice',
    restaurant: 'Chinese Wok',
    price: '₹249',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200'
  }
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Mumbai, Maharashtra');
  const [cartItemCount, setCartItemCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(2);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const bannerRef = useRef<FlatList>(null);

  useEffect(() => {
    // Auto-scroll banners
    const interval = setInterval(() => {
      if (currentBannerIndex < promotionalBanners.length - 1) {
        setCurrentBannerIndex(currentBannerIndex + 1);
      } else {
        setCurrentBannerIndex(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleSearch = () => {
    router.push('/(tabs)/search' as any);
  };

  const handleLocationPress = () => {
    console.log('Location pressed');
  };

  const handleNotificationPress = () => {
    console.log('Notifications pressed');
  };

  const handleCartPress = () => {
    console.log('Cart pressed');
  };

  const handleQuickActionPress = (action: any) => {
    if (action.title === 'Search') {
      router.push('/(tabs)/search' as any);
    } else {
      console.log('Quick action pressed:', action.title);
    }
  };

  const handleCategoryPress = (category: any) => {
    console.log('Category pressed:', category.name);
  };

  const handleRestaurantPress = (restaurant: any) => {
    console.log('Restaurant pressed:', restaurant.name);
  };

  const handleTrendingItemPress = (item: any) => {
    console.log('Trending item pressed:', item.name);
  };

  const renderIcon = (iconFamily: string, iconName: string, size: number, color: string) => {
    switch (iconFamily) {
      case 'Ionicons':
        return <Ionicons name={iconName as any} size={size} color={color} />;
      case 'MaterialIcons':
        return <MaterialIcons name={iconName as any} size={size} color={color} />;
      case 'Feather':
        return <Feather name={iconName as any} size={size} color={color} />;
      default:
        return <Ionicons name="help-outline" size={size} color={color} />;
    }
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
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>{item.title}</Text>
            <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: item.image }}
            style={styles.bannerImage}
            contentFit="cover"
          />
        </View>
      </LinearGradient>
    </View>
  );

  const renderQuickActionItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.quickActionItem}
      onPress={() => handleQuickActionPress(item)}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: item.color + '20' }]}>
        {renderIcon(item.iconFamily, item.icon, 24, item.color)}
      </View>
      <Text style={styles.quickActionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={styles.categoryImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.categoryImage}
          contentFit="cover"
        />
        <View style={styles.categoryIconOverlay}>
          {renderIcon(item.iconFamily, item.icon, 20, '#FFFFFF')}
        </View>
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderRestaurantItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.restaurantCard}
      onPress={() => handleRestaurantPress(item)}
    >
      <View style={styles.restaurantImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.restaurantImage}
          contentFit="cover"
        />
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
        {!item.isOpen && (
          <View style={styles.closedOverlay}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}
      </View>
      
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.cuisineText}>{item.cuisine}</Text>
        
        <View style={styles.restaurantDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.detailText}>{item.deliveryTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="bicycle-outline" size={14} color="#666" />
            <Text style={styles.detailText}>{item.deliveryFee}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTrendingItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.trendingCard}
      onPress={() => handleTrendingItemPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.trendingImage}
        contentFit="cover"
      />
      <View style={styles.trendingInfo}>
        <Text style={styles.trendingName}>{item.name}</Text>
        <Text style={styles.trendingRestaurant}>{item.restaurant}</Text>
        <Text style={styles.trendingPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            {/* Location */}
            <TouchableOpacity style={styles.locationContainer} onPress={handleLocationPress}>
              <Ionicons name="location" size={20} color="#FFFFFF" />
              <View style={styles.locationText}>
                <Text style={styles.deliverTo}>Deliver to</Text>
                <Text style={styles.currentLocation}>{currentLocation}</Text>
              </View>
              <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleSearch}>
                <Ionicons name="search" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleNotificationPress}>
                <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
                {notificationCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{notificationCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleCartPress}>
                <Ionicons name="bag-outline" size={24} color="#FFFFFF" />
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

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Promotional Banners */}
        <View style={styles.bannerSection}>
          <FlatList
            ref={bannerRef}
            data={promotionalBanners}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / (width - 32));
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
          <Text style={styles.sectionTitle}>What would you like to order?</Text>
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
          <Text style={styles.sectionTitle}>Browse by Category</Text>
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
            <Text style={styles.sectionTitle}>Popular Restaurants</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {popularRestaurants.map((restaurant) => (
            <View key={restaurant.id}>
              {renderRestaurantItem({ item: restaurant })}
            </View>
          ))}
        </View>

        {/* Trending Now */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <FlatList
            data={trendingItems}
            renderItem={renderTrendingItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingContainer}
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: Platform.OS === 'ios' ? 120 : 100,
  },
  headerGradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  locationText: {
    flex: 1,
    marginLeft: 8,
  },
  deliverTo: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '400',
  },
  currentLocation: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 12,
  },
  actionButton: {
    position: 'relative',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4757',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  bannerSection: {
    marginVertical: 20,
  },
  bannerContainer: {
    width: width - 40,
    height: 180,
    marginHorizontal: 20,
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
    padding: 24,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bannerImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  bannerDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  bannerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 4,
  },
  bannerDotActive: {
    backgroundColor: '#667eea',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  quickActionItem: {
    alignItems: 'center',
    width: 80,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  quickActionTitle: {
    fontSize: 12,
    color: '#4A5568',
    textAlign: 'center',
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    width: 100,
  },
  categoryImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  categoryIconOverlay: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#667eea',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  categoryName: {
    fontSize: 14,
    color: '#2D3748',
    textAlign: 'center',
    fontWeight: '500',
  },
  restaurantCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  restaurantImageContainer: {
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: 160,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF4757',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  closedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#48BB78',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  cuisineText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 12,
  },
  restaurantDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 4,
  },
  trendingContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  trendingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  trendingImage: {
    width: '100%',
    height: 100,
  },
  trendingInfo: {
    padding: 12,
  },
  trendingName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 4,
  },
  trendingRestaurant: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
  },
  trendingPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
  },
  bottomSpacing: {
    height: 20,
  },
});
