import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Modal,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// Dummy Data
const restaurantData = [
  {
    id: 1,
    name: 'Pizza Palace',
    cuisine: 'Italian',
    rating: 4.5,
    reviewCount: 250,
    deliveryTime: '25-35',
    deliveryFee: 40,
    distance: 1.2,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    discount: '20% OFF',
    offers: ['Free Delivery on ₹300+'],
    isOpen: true,
    isPureVeg: false,
    priceRange: 2, // 1-4 scale
    deliveryTimeMinutes: 30
  },
  {
    id: 2,
    name: 'Green Garden',
    cuisine: 'Pure Vegetarian',
    rating: 4.7,
    reviewCount: 180,
    deliveryTime: '20-30',
    deliveryFee: 0,
    distance: 0.8,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
    discount: '₹100 OFF',
    offers: ['Free Delivery'],
    isOpen: true,
    isPureVeg: true,
    priceRange: 2,
    deliveryTimeMinutes: 25
  },
  {
    id: 3,
    name: 'Burger Junction',
    cuisine: 'American',
    rating: 4.2,
    reviewCount: 320,
    deliveryTime: '30-40',
    deliveryFee: 35,
    distance: 2.1,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    discount: '15% OFF',
    offers: ['Buy 1 Get 1'],
    isOpen: true,
    isPureVeg: false,
    priceRange: 3,
    deliveryTimeMinutes: 35
  },
  {
    id: 4,
    name: 'Spice Route',
    cuisine: 'Indian',
    rating: 4.6,
    reviewCount: 400,
    deliveryTime: '40-50',
    deliveryFee: 45,
    distance: 3.2,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    discount: '30% OFF',
    offers: ['Free Dessert'],
    isOpen: false,
    isPureVeg: false,
    priceRange: 3,
    deliveryTimeMinutes: 45
  },
  {
    id: 5,
    name: 'Dragon Bowl',
    cuisine: 'Chinese',
    rating: 4.3,
    reviewCount: 290,
    deliveryTime: '25-35',
    deliveryFee: 40,
    distance: 1.8,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    discount: '25% OFF',
    offers: ['Free Delivery on ₹400+'],
    isOpen: true,
    isPureVeg: false,
    priceRange: 2,
    deliveryTimeMinutes: 30
  }
];

const cuisineTypes = [
  'All', 'Italian', 'Indian', 'Chinese', 'American', 'Pure Vegetarian', 'Fast Food', 'Desserts'
];

const priceRanges = [
  { id: 1, label: 'Under ₹200', value: 1 },
  { id: 2, label: '₹200 - ₹400', value: 2 },
  { id: 3, label: '₹400 - ₹600', value: 3 },
  { id: 4, label: 'Above ₹600', value: 4 }
];

const ratingOptions = [
  { id: 1, label: '4.5+ Stars', value: 4.5 },
  { id: 2, label: '4.0+ Stars', value: 4.0 },
  { id: 3, label: '3.5+ Stars', value: 3.5 },
  { id: 4, label: '3.0+ Stars', value: 3.0 }
];

const deliveryTimeOptions = [
  { id: 1, label: 'Under 30 min', value: 30 },
  { id: 2, label: '30-45 min', value: 45 },
  { id: 3, label: '45-60 min', value: 60 },
  { id: 4, label: 'Above 60 min', value: 999 }
];

const sortOptions = [
  { id: 1, label: 'Relevance', value: 'relevance' },
  { id: 2, label: 'Rating', value: 'rating' },
  { id: 3, label: 'Delivery Time', value: 'deliveryTime' },
  { id: 4, label: 'Distance', value: 'distance' },
  { id: 5, label: 'Price: Low to High', value: 'priceLow' },
  { id: 6, label: 'Price: High to Low', value: 'priceHigh' }
];

export default function RestaurantListingScreen() {
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantData);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showPureVegOnly, setShowPureVegOnly] = useState(false);
  
  // Filter states
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<number | null>(null);
  const [showOffersOnly, setShowOffersOnly] = useState(false);
  const [selectedSort, setSelectedSort] = useState('relevance');

  useEffect(() => {
    applyFilters();
  }, [selectedCuisines, selectedPriceRange, selectedRating, selectedDeliveryTime, showOffersOnly, showPureVegOnly, selectedSort]);

  const applyFilters = () => {
    let filtered = [...restaurants];

    // Pure veg filter
    if (showPureVegOnly) {
      filtered = filtered.filter(restaurant => restaurant.isPureVeg);
    }

    // Cuisine filter
    if (selectedCuisines.length > 0 && !selectedCuisines.includes('All')) {
      filtered = filtered.filter(restaurant => 
        selectedCuisines.includes(restaurant.cuisine)
      );
    }

    // Price range filter
    if (selectedPriceRange.length > 0) {
      filtered = filtered.filter(restaurant => 
        selectedPriceRange.includes(restaurant.priceRange)
      );
    }

    // Rating filter
    if (selectedRating) {
      filtered = filtered.filter(restaurant => restaurant.rating >= selectedRating);
    }

    // Delivery time filter
    if (selectedDeliveryTime) {
      filtered = filtered.filter(restaurant => 
        restaurant.deliveryTimeMinutes <= selectedDeliveryTime
      );
    }

    // Offers filter
    if (showOffersOnly) {
      filtered = filtered.filter(restaurant => restaurant.offers.length > 0);
    }

    // Apply sorting
    filtered = sortRestaurants(filtered, selectedSort);

    setFilteredRestaurants(filtered);
  };

  const sortRestaurants = (restaurants: any[], sortBy: string) => {
    const sorted = [...restaurants];
    
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'deliveryTime':
        return sorted.sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
      case 'distance':
        return sorted.sort((a, b) => a.distance - b.distance);
      case 'priceLow':
        return sorted.sort((a, b) => a.priceRange - b.priceRange);
      case 'priceHigh':
        return sorted.sort((a, b) => b.priceRange - a.priceRange);
      default:
        return sorted;
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const clearAllFilters = () => {
    setSelectedCuisines([]);
    setSelectedPriceRange([]);
    setSelectedRating(null);
    setSelectedDeliveryTime(null);
    setShowOffersOnly(false);
    setShowPureVegOnly(false);
    setSelectedSort('relevance');
  };

  const toggleCuisine = (cuisine: string) => {
    if (cuisine === 'All') {
      setSelectedCuisines([]);
    } else {
      setSelectedCuisines(prev => 
        prev.includes(cuisine) 
          ? prev.filter(c => c !== cuisine)
          : [...prev, cuisine]
      );
    }
  };

  const togglePriceRange = (priceId: number) => {
    setSelectedPriceRange(prev => 
      prev.includes(priceId)
        ? prev.filter(p => p !== priceId)
        : [...prev, priceId]
    );
  };

  const handleRestaurantPress = (restaurant: any) => {
    console.log('Restaurant pressed:', restaurant.name);
    // Navigate to restaurant details
    router.push(`/restaurants/${restaurant.id}` as any);
  };

  const renderSkeletonCard = () => (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonSubtitle} />
        <View style={styles.skeletonDetails}>
          <View style={styles.skeletonDetailItem} />
          <View style={styles.skeletonDetailItem} />
        </View>
      </View>
    </View>
  );

  const renderRestaurantCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.restaurantCard}
      onPress={() => handleRestaurantPress(item)}
    >
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          contentFit="cover"
        />
        
        {/* Discount Badge */}
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}

        {/* Pure Veg Badge */}
        {item.isPureVeg && (
          <View style={styles.pureVegBadge}>
            <MaterialIcons name="eco" size={12} color="#4CAF50" />
          </View>
        )}

        {/* Closed Overlay */}
        {!item.isOpen && (
          <View style={styles.closedOverlay}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewText}>({item.reviewCount})</Text>
          </View>
        </View>

        <Text style={styles.cuisineText}>{item.cuisine}</Text>

        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.detailText}>{item.deliveryTime} min</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="bicycle-outline" size={14} color="#666" />
            <Text style={styles.detailText}>
              {item.deliveryFee === 0 ? 'Free' : `₹${item.deliveryFee}`}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.detailText}>{item.distance} km</Text>
          </View>
        </View>

        {/* Offers */}
        {item.offers && item.offers.length > 0 && (
          <View style={styles.offersContainer}>
            <Text style={styles.offerText}>{item.offers[0]}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderFilterModal = () => (
    <Modal
      visible={showFilterModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScrollView}>
            {/* Cuisine Types */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Cuisine</Text>
              <View style={styles.filterOptions}>
                {cuisineTypes.map((cuisine) => (
                  <TouchableOpacity
                    key={cuisine}
                    style={[
                      styles.filterChip,
                      (selectedCuisines.includes(cuisine) || (cuisine === 'All' && selectedCuisines.length === 0)) && styles.filterChipActive
                    ]}
                    onPress={() => toggleCuisine(cuisine)}
                  >
                    <Text style={[
                      styles.filterChipText,
                      (selectedCuisines.includes(cuisine) || (cuisine === 'All' && selectedCuisines.length === 0)) && styles.filterChipTextActive
                    ]}>
                      {cuisine}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <View style={styles.filterOptions}>
                {priceRanges.map((range) => (
                  <TouchableOpacity
                    key={range.id}
                    style={[
                      styles.filterChip,
                      selectedPriceRange.includes(range.value) && styles.filterChipActive
                    ]}
                    onPress={() => togglePriceRange(range.value)}
                  >
                    <Text style={[
                      styles.filterChipText,
                      selectedPriceRange.includes(range.value) && styles.filterChipTextActive
                    ]}>
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Rating */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Rating</Text>
              <View style={styles.filterOptions}>
                {ratingOptions.map((rating) => (
                  <TouchableOpacity
                    key={rating.id}
                    style={[
                      styles.filterChip,
                      selectedRating === rating.value && styles.filterChipActive
                    ]}
                    onPress={() => setSelectedRating(selectedRating === rating.value ? null : rating.value)}
                  >
                    <Ionicons name="star" size={14} color={selectedRating === rating.value ? "#FFFFFF" : "#FFD700"} />
                    <Text style={[
                      styles.filterChipText,
                      selectedRating === rating.value && styles.filterChipTextActive
                    ]}>
                      {rating.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Delivery Time */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Delivery Time</Text>
              <View style={styles.filterOptions}>
                {deliveryTimeOptions.map((time) => (
                  <TouchableOpacity
                    key={time.id}
                    style={[
                      styles.filterChip,
                      selectedDeliveryTime === time.value && styles.filterChipActive
                    ]}
                    onPress={() => setSelectedDeliveryTime(selectedDeliveryTime === time.value ? null : time.value)}
                  >
                    <Text style={[
                      styles.filterChipText,
                      selectedDeliveryTime === time.value && styles.filterChipTextActive
                    ]}>
                      {time.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Special Options */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Special Options</Text>
              <TouchableOpacity
                style={[styles.toggleOption, showOffersOnly && styles.toggleOptionActive]}
                onPress={() => setShowOffersOnly(!showOffersOnly)}
              >
                <Text style={[styles.toggleOptionText, showOffersOnly && styles.toggleOptionTextActive]}>
                  Show offers only
                </Text>
                <View style={[styles.toggle, showOffersOnly && styles.toggleActive]}>
                  {showOffersOnly && <View style={styles.toggleDot} />}
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.clearButton} onPress={clearAllFilters}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton} 
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderSortModal = () => (
    <Modal
      visible={showSortModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowSortModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.sortModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity onPress={() => setShowSortModal(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.sortOptions}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.sortOption}
                onPress={() => {
                  setSelectedSort(option.value);
                  setShowSortModal(false);
                }}
              >
                <Text style={[
                  styles.sortOptionText,
                  selectedSort === option.value && styles.sortOptionTextActive
                ]}>
                  {option.label}
                </Text>
                {selectedSort === option.value && (
                  <Ionicons name="checkmark" size={20} color="#667eea" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="restaurant-outline" size={64} color="#E2E8F0" />
      <Text style={styles.emptyStateTitle}>No restaurants found</Text>
      <Text style={styles.emptyStateSubtitle}>
        Try adjusting your filters or search in a different area
      </Text>
      <TouchableOpacity style={styles.clearFiltersButton} onPress={clearAllFilters}>
        <Text style={styles.clearFiltersButtonText}>Clear Filters</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurants</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowSortModal(true)}
        >
          <Ionicons name="swap-vertical" size={16} color="#667eea" />
          <Text style={styles.filterButtonText}>Sort</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="options" size={16} color="#667eea" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.filterButton, showPureVegOnly && styles.filterButtonActive]}
          onPress={() => setShowPureVegOnly(!showPureVegOnly)}
        >
          <MaterialIcons name="eco" size={16} color={showPureVegOnly ? "#FFFFFF" : "#4CAF50"} />
          <Text style={[styles.filterButtonText, showPureVegOnly && styles.filterButtonTextActive]}>
            Pure Veg
          </Text>
        </TouchableOpacity>
      </View>

      {/* Restaurant List */}
      <FlatList
        data={isLoading ? Array(5).fill({}) : filteredRestaurants}
        renderItem={isLoading ? renderSkeletonCard : renderRestaurantCard}
        keyExtractor={(item, index) => isLoading ? index.toString() : item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        showsVerticalScrollIndicator={false}
      />

      {/* Modals */}
      {renderFilterModal()}
      {renderSortModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
    marginLeft: 12,
  },
  headerSpacer: {
    flex: 1,
  },
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingVertical: 16,
  },
  restaurantCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pureVegBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
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
  cardContent: {
    padding: 16,
  },
  cardHeader: {
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
    gap: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  cuisineText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 12,
  },
  cardDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#718096',
  },
  offersContainer: {
    marginTop: 8,
  },
  offerText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
  },
  skeletonCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  skeletonImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#E2E8F0',
  },
  skeletonContent: {
    padding: 16,
  },
  skeletonTitle: {
    height: 20,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonSubtitle: {
    height: 16,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 12,
    width: '60%',
  },
  skeletonDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  skeletonDetailItem: {
    height: 12,
    width: 60,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  sortModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  modalScrollView: {
    flex: 1,
  },
  filterSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  filterChipActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterChipText: {
    fontSize: 14,
    color: '#4A5568',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  toggleOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  toggleOptionActive: {
    // Add any active styles if needed
  },
  toggleOptionText: {
    fontSize: 16,
    color: '#4A5568',
  },
  toggleOptionTextActive: {
    color: '#667eea',
    fontWeight: '500',
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleActive: {
    backgroundColor: '#667eea',
  },
  toggleDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '500',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#667eea',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sortOptions: {
    padding: 20,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#4A5568',
  },
  sortOptionTextActive: {
    color: '#667eea',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A5568',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  clearFiltersButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  clearFiltersButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 