import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Enhanced restaurant data
const restaurantDetails: any = {
  1: {
    id: 1,
    name: 'Pizza Palace',
    cuisine: 'Italian • Fast Food',
    rating: 4.5,
    reviewCount: 1250,
    deliveryTime: '25-35',
    deliveryFee: 40,
    distance: 1.2,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
    coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
    description: 'Authentic Italian cuisine with the finest ingredients. Home of the best wood-fired pizzas in the city.',
    address: '123 Main Street, Downtown, City - 400001',
    phone: '+91 98765 43210',
    email: 'info@pizzapalace.com',
    website: 'www.pizzapalace.com',
    isOpen: true,
    openingTime: '11:00 AM',
    closingTime: '11:00 PM',
    isPureVeg: false,
    minimumOrder: 200,
    offers: ['20% OFF on orders above ₹300', 'Free Delivery on first order', 'Buy 2 Get 1 Free on Pizzas'],
    priceForTwo: 600,
    categories: ['Popular', 'Pizza', 'Pasta', 'Appetizers', 'Beverages', 'Desserts'],
    menu: [
      {
        category: 'Popular',
        items: [
          {
            id: 1,
            name: 'Margherita Pizza',
            description: 'Classic pizza with tomato sauce, mozzarella and fresh basil leaves',
            price: 299,
            discountPrice: 249,
            image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
            isVeg: true,
            rating: 4.6,
            reviewCount: 450,
            bestseller: true,
            spicyLevel: 0,
            customizations: ['Extra Cheese', 'Extra Sauce', 'Thin Crust', 'Thick Crust']
          },
          {
            id: 2,
            name: 'Pepperoni Pizza',
            description: 'Traditional pepperoni with mozzarella cheese and Italian herbs',
            price: 399,
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
            isVeg: false,
            rating: 4.4,
            reviewCount: 320,
            bestseller: true,
            spicyLevel: 1,
            customizations: ['Extra Pepperoni', 'Extra Cheese', 'No Onions']
          }
        ]
      },
      {
        category: 'Pizza',
        items: [
          {
            id: 3,
            name: 'Supreme Pizza',
            description: 'Loaded with pepperoni, sausage, bell peppers, onions and mushrooms',
            price: 499,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
            isVeg: false,
            rating: 4.7,
            reviewCount: 280,
            spicyLevel: 2,
            customizations: ['Extra Meat', 'No Mushrooms', 'Extra Vegetables']
          },
          {
            id: 4,
            name: 'Veggie Delight',
            description: 'Fresh vegetables with bell peppers, onions, tomatoes and olives',
            price: 349,
            image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400',
            isVeg: true,
            rating: 4.3,
            reviewCount: 190,
            spicyLevel: 0,
            customizations: ['Extra Vegetables', 'No Olives', 'Extra Cheese']
          }
        ]
      }
    ]
  }
};

export default function RestaurantDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState(restaurantDetails[id as string] || null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!restaurant) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (!restaurantDetails[id as string]) {
          Alert.alert('Error', 'Restaurant not found', [
            { text: 'OK', onPress: () => router.back() }
          ]);
        }
      }, 1000);
      return;
    }

    loadFavoriteStatus();

    const listener = scrollY.addListener(({ value }) => {
      const opacity = value > 200 ? 1 : value / 200;
      headerOpacity.setValue(opacity);
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [id]);

  const loadFavoriteStatus = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favList = JSON.parse(favorites);
        setIsFavorite(favList.includes(restaurant?.id));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favList = favorites ? JSON.parse(favorites) : [];
      
      if (isFavorite) {
        favList = favList.filter((favId: number) => favId !== restaurant?.id);
      } else {
        favList.push(restaurant?.id);
      }
      
      await AsyncStorage.setItem('favorites', JSON.stringify(favList));
      setIsFavorite(!isFavorite);
      
      Alert.alert(
        'Success',
        isFavorite ? 'Removed from favorites' : 'Added to favorites'
      );
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const shareRestaurant = async () => {
    try {
      await Share.share({
        message: `Check out ${restaurant?.name} - ${restaurant?.description}`,
        url: `https://oneqlick.com/restaurant/${restaurant?.id}`,
        title: restaurant?.name
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const addToCart = (item: any) => {
    setCartItems(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    let total = 0;
    restaurant?.menu.forEach((category: any) => {
      category.items.forEach((item: any) => {
        if (cartItems[item.id]) {
          total += (item.discountPrice || item.price) * cartItems[item.id];
        }
      });
    });
    return total;
  };

  const getFilteredItems = () => {
    if (!restaurant) return [];
    
    let items: any[] = [];
    restaurant.menu.forEach((category: any) => {
      if (activeCategory === 'Popular' || category.category === activeCategory) {
        items = items.concat(category.items);
      }
    });

    if (searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  };

  const renderVegIndicator = (isVeg: boolean) => (
    <View style={[styles.vegIndicator, { borderColor: isVeg ? '#4CAF50' : '#FF4757' }]}>
      <View style={[styles.vegDot, { backgroundColor: isVeg ? '#4CAF50' : '#FF4757' }]} />
    </View>
  );

  const renderSpicyIndicator = (level: number) => {
    if (level === 0) return null;
    
    return (
      <View style={styles.spicyContainer}>
        {Array.from({ length: level }, (_, index) => (
          <Text key={index} style={styles.spicyIcon}>🌶️</Text>
        ))}
      </View>
    );
  };

  const renderAnimatedHeader = () => (
    <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
      <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle} numberOfLines={1}>
        {restaurant?.name}
      </Text>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerButton} onPress={toggleFavorite}>
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? "#FF4757" : "#FFFFFF"} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={shareRestaurant}>
          <Ionicons name="share-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderCoverSection = () => (
    <View style={styles.coverContainer}>
      <Image
        source={{ uri: restaurant?.coverImage }}
        style={styles.coverImage}
        contentFit="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.coverGradient}
      />
      <View style={styles.coverActions}>
        <TouchableOpacity style={styles.coverButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.coverRightActions}>
          <TouchableOpacity style={styles.coverButton} onPress={toggleFavorite}>
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#FF4757" : "#FFFFFF"} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.coverButton} onPress={shareRestaurant}>
            <Ionicons name="share-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderRestaurantInfo = () => (
    <View style={styles.infoContainer}>
      <View style={styles.titleRow}>
        <View style={styles.titleSection}>
          <Text style={styles.restaurantName}>{restaurant?.name}</Text>
          <Text style={styles.cuisineText}>{restaurant?.cuisine}</Text>
        </View>
        {restaurant?.isPureVeg && (
          <View style={styles.pureVegBadge}>
            <MaterialIcons name="eco" size={14} color="#4CAF50" />
            <Text style={styles.pureVegText}>Pure Veg</Text>
          </View>
        )}
      </View>

      <View style={styles.ratingRow}>
        <View style={styles.ratingSection}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFFFFF" />
            <Text style={styles.ratingText}>{restaurant?.rating}</Text>
          </View>
          <Text style={styles.reviewText}>
            ({restaurant?.reviewCount} reviews)
          </Text>
        </View>
        <Text style={styles.priceForTwo}>
          ₹{restaurant?.priceForTwo} for two
        </Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{restaurant?.deliveryTime} min</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="bicycle-outline" size={16} color="#666" />
          <Text style={styles.detailText}>
            {restaurant?.deliveryFee === 0 ? 'Free Delivery' : `₹${restaurant?.deliveryFee}`}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{restaurant?.distance} km</Text>
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.contactItem}>
          <Ionicons name="location-outline" size={18} color="#667eea" />
          <Text style={styles.contactText}>{restaurant?.address}</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="call-outline" size={18} color="#667eea" />
          <Text style={styles.contactText}>{restaurant?.phone}</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="time-outline" size={18} color="#667eea" />
          <Text style={styles.contactText}>
            {restaurant?.openingTime} - {restaurant?.closingTime}
          </Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="card-outline" size={18} color="#667eea" />
          <Text style={styles.contactText}>
            Minimum order: ₹{restaurant?.minimumOrder}
          </Text>
        </View>
      </View>

      {/* Offers */}
      {restaurant?.offers && restaurant.offers.length > 0 && (
        <View style={styles.offersSection}>
          <Text style={styles.sectionTitle}>Offers</Text>
          {restaurant.offers.map((offer: string, index: number) => (
            <View key={index} style={styles.offerItem}>
              <Feather name="tag" size={14} color="#667eea" />
              <Text style={styles.offerText}>{offer}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.description}>{restaurant?.description}</Text>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search menu items..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Ionicons name="options" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  const renderCategoryTabs = () => (
    <View style={styles.categoryContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScrollContainer}
      >
        {restaurant?.categories.map((category: string) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              activeCategory === category && styles.activeCategoryTab
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.categoryTabText,
                activeCategory === category && styles.activeCategoryTabText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderMenuItem = (item: any) => (
    <View key={item.id} style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <View style={styles.menuItemHeader}>
            {renderVegIndicator(item.isVeg)}
            {item.bestseller && (
              <View style={styles.bestsellerBadge}>
                <Ionicons name="star" size={12} color="#FF6B35" />
                <Text style={styles.bestsellerText}>Bestseller</Text>
              </View>
            )}
            {renderSpicyIndicator(item.spicyLevel)}
          </View>
          
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          
          <View style={styles.menuItemFooter}>
            <View style={styles.priceContainer}>
              {item.discountPrice ? (
                <View style={styles.discountPriceContainer}>
                  <Text style={styles.menuItemPrice}>₹{item.discountPrice}</Text>
                  <Text style={styles.originalPrice}>₹{item.price}</Text>
                </View>
              ) : (
                <Text style={styles.menuItemPrice}>₹{item.price}</Text>
              )}
            </View>
            
            {item.rating && (
              <View style={styles.menuItemRating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.menuItemRatingText}>{item.rating}</Text>
                <Text style={styles.menuItemReviewText}>({item.reviewCount})</Text>
              </View>
            )}
          </View>

          {item.customizations && item.customizations.length > 0 && (
            <TouchableOpacity onPress={() => {
              setSelectedItem(item);
              setShowCustomization(true);
            }}>
              <Text style={styles.customizableText}>
                Customizable • Tap to customize
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.menuItemImageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.menuItemImage}
            contentFit="cover"
          />
          
          <View style={styles.addButtonContainer}>
            {cartItems[item.id] ? (
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Ionicons name="remove" size={16} color="#667eea" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{cartItems[item.id]}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => addToCart(item)}
                >
                  <Ionicons name="add" size={16} color="#667eea" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  const renderCartSummary = () => {
    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    if (totalItems === 0) return null;

    return (
      <View style={styles.cartSummary}>
        <View style={styles.cartInfo}>
          <Text style={styles.cartItemCount}>
            {totalItems} item{totalItems > 1 ? 's' : ''}
          </Text>
          <Text style={styles.cartTotal}>₹{totalPrice}</Text>
        </View>
        
        <TouchableOpacity style={styles.viewCartButton}>
          <Text style={styles.viewCartButtonText}>View Cart</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCustomizationModal = () => (
    <Modal
      visible={showCustomization}
      transparent
      animationType="slide"
      onRequestClose={() => setShowCustomization(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Customize {selectedItem?.name}
            </Text>
            <TouchableOpacity onPress={() => setShowCustomization(false)}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalBody}>
            <Text style={styles.customizationTitle}>
              Customization Options
            </Text>
            {selectedItem?.customizations?.map((option: string, index: number) => (
              <View key={index} style={styles.customizationOption}>
                <Text style={styles.customizationOptionText}>{option}</Text>
                <TouchableOpacity style={styles.customizationAddButton}>
                  <Text style={styles.customizationAddText}>Add ₹20</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              if (selectedItem) {
                addToCart(selectedItem);
              }
              setShowCustomization(false);
            }}
          >
            <Text style={styles.addToCartButtonText}>
              Add to Cart - ₹{selectedItem?.discountPrice || selectedItem?.price}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading restaurant details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Ionicons name="restaurant-outline" size={64} color="#E2E8F0" />
          <Text style={styles.errorTitle}>Restaurant not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {renderAnimatedHeader()}

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[3]} // Make category tabs sticky
      >
        {renderCoverSection()}
        {renderRestaurantInfo()}
        {renderSearchBar()}
        {renderCategoryTabs()}
        
        <View style={styles.menuContainer}>
          {getFilteredItems().map(item => renderMenuItem(item))}
          
          {getFilteredItems().length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={64} color="#E2E8F0" />
              <Text style={styles.emptyStateTitle}>No items found</Text>
              <Text style={styles.emptyStateSubtitle}>
                Try adjusting your search or browse different categories
              </Text>
            </View>
          )}
        </View>
      </Animated.ScrollView>

      {renderCartSummary()}
      {renderCustomizationModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 100 : 80,
    backgroundColor: '#667eea',
    zIndex: 1000,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  scrollView: {
    flex: 1,
  },
  coverContainer: {
    position: 'relative',
    height: 300,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  coverActions: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  coverButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  coverRightActions: {
    flexDirection: 'row',
    gap: 12,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 8,
    borderBottomColor: '#F8F9FA',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  cuisineText: {
    fontSize: 16,
    color: '#718096',
  },
  pureVegBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
    gap: 4,
  },
  pureVegText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    color: '#718096',
  },
  priceForTwo: {
    fontSize: 14,
    color: '#718096',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#718096',
  },
  contactSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#4A5568',
    flex: 1,
  },
  offersSection: {
    marginBottom: 20,
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  offerText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A202C',
  },
  filterButton: {
    backgroundColor: '#667eea',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeCategoryTab: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  activeCategoryTabText: {
    color: '#FFFFFF',
  },
  menuContainer: {
    paddingBottom: 100,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 16,
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  vegIndicator: {
    width: 16,
    height: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bestsellerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  bestsellerText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
  },
  spicyContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  spicyIcon: {
    fontSize: 12,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 6,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    marginBottom: 12,
  },
  menuItemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#999',
  },
  menuItemRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  menuItemRatingText: {
    fontSize: 12,
    color: '#4A5568',
  },
  menuItemReviewText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  customizableText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
    marginTop: 8,
  },
  menuItemImageContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemImage: {
    width: 120,
    height: 100,
    borderRadius: 8,
  },
  addButtonContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#667eea',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  quantityButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 4,
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  cartSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#667eea',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cartInfo: {
    flex: 1,
  },
  cartItemCount: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  cartTotal: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewCartButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  viewCartButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
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
    maxHeight: '70%',
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
  modalBody: {
    padding: 20,
  },
  customizationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 16,
  },
  customizationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    marginBottom: 12,
  },
  customizationOptionText: {
    fontSize: 14,
    color: '#4A5568',
  },
  customizationAddButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  customizationAddText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  addToCartButton: {
    backgroundColor: '#667eea',
    margin: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#4A5568',
    marginTop: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A5568',
    marginTop: 16,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
  },
}); 