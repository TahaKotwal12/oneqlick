import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
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

// Dummy data for favorites
const FAVORITES_DATA = [
  {
    id: '1',
    type: 'restaurant',
    name: 'Punjabi Dhaba',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80',
    rating: 4.5,
    deliveryTime: '25-30 min',
    cuisine: 'North Indian',
    isOpen: true,
    discount: '20% OFF',
    minOrder: '₹200',
  },
  {
    id: '2',
    type: 'restaurant',
    name: 'South Indian Kitchen',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&q=80',
    rating: 4.3,
    deliveryTime: '20-25 min',
    cuisine: 'South Indian',
    isOpen: true,
    discount: '15% OFF',
    minOrder: '₹150',
  },
  {
    id: '3',
    type: 'food',
    name: 'Butter Chicken',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80',
    restaurant: 'Punjabi Dhaba',
    price: '₹280',
    rating: 4.7,
    isAvailable: true,
  },
  {
    id: '4',
    type: 'food',
    name: 'Masala Dosa',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&q=80',
    restaurant: 'South Indian Kitchen',
    price: '₹120',
    rating: 4.5,
    isAvailable: true,
  },
  {
    id: '5',
    type: 'restaurant',
    name: 'Street Food Corner',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&q=80',
    rating: 4.1,
    deliveryTime: '15-20 min',
    cuisine: 'Street Food',
    isOpen: false,
    discount: '10% OFF',
    minOrder: '₹100',
  },
];

export default function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [favorites, setFavorites] = useState(FAVORITES_DATA);

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const renderRestaurantItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.restaurantCard}>
      <View style={styles.restaurantImageContainer}>
        <Image source={{ uri: item.image }} style={styles.restaurantImage} />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Ionicons name="heart" size={20} color={COLORS.error} />
        </TouchableOpacity>
        
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
        
        {!item.isOpen && (
          <View style={styles.closedBadge}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}
      </View>

      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={COLORS.warning} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <Text style={styles.cuisineText}>{item.cuisine}</Text>
        
        <View style={styles.restaurantMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time" size={14} color={COLORS.text.secondary} />
            <Text style={styles.metaText}>{item.deliveryTime}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Ionicons name="basket" size={14} color={COLORS.text.secondary} />
            <Text style={styles.metaText}>Min {item.minOrder}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFoodItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.foodCard}>
      <View style={styles.foodImageContainer}>
        <Image source={{ uri: item.image }} style={styles.foodImage} />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Ionicons name="heart" size={20} color={COLORS.error} />
        </TouchableOpacity>
        
        {!item.isAvailable && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>Unavailable</Text>
          </View>
        )}
      </View>

      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.restaurantName}>{item.restaurant}</Text>
        
        <View style={styles.foodFooter}>
          <Text style={styles.foodPrice}>{item.price}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={COLORS.warning} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'restaurant') {
      return renderRestaurantItem({ item });
    } else {
      return renderFoodItem({ item });
    }
  };

  const filteredFavorites = activeTab === 'all' 
    ? favorites 
    : favorites.filter(item => item.type === activeTab);

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
        
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Favorites</Text>
          </View>
        </LinearGradient>

        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={80} color={COLORS.text.tertiary} />
          <Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyStateSubtitle}>
            Save your favorite restaurants and dishes for quick access
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
          <Text style={styles.headerTitle}>Favorites</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={24} color={COLORS.text.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['all', 'restaurant', 'food'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === 'all' ? 'All' : tab === 'restaurant' ? 'Restaurants' : 'Food Items'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Favorites List */}
      <FlatList
        data={filteredFavorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.favoritesList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.text.secondary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.text.white,
    fontWeight: '600',
  },
  favoritesList: {
    padding: SPACING.lg,
  },
  restaurantCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginBottom: SPACING.lg,
    marginHorizontal: SPACING.xs,
    flex: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  restaurantImageContainer: {
    position: 'relative',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  discountText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.small,
    fontWeight: '600',
  },
  closedBadge: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  closedText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.small,
    fontWeight: '600',
  },
  restaurantInfo: {
    padding: SPACING.md,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  restaurantName: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
    flex: 1,
    marginRight: SPACING.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    color: COLORS.text.secondary,
    ...TYPOGRAPHY.small,
    fontWeight: '600',
  },
  cuisineText: {
    color: COLORS.text.secondary,
    ...TYPOGRAPHY.bodySmall,
    marginBottom: SPACING.sm,
  },
  restaurantMeta: {
    gap: SPACING.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: COLORS.text.tertiary,
    ...TYPOGRAPHY.small,
  },
  foodCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginBottom: SPACING.lg,
    marginHorizontal: SPACING.xs,
    flex: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  foodImageContainer: {
    position: 'relative',
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  unavailableBadge: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  unavailableText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.small,
    fontWeight: '600',
  },
  foodInfo: {
    padding: SPACING.md,
  },
  foodName: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
    marginBottom: 2,
  },
  foodFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  foodPrice: {
    color: COLORS.primary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
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