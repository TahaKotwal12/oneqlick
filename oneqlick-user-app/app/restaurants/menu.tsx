import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Dummy menu data
const menuData = {
  categories: [
    'All Items',
    'Pizza',
    'Pasta',
    'Appetizers',
    'Desserts',
    'Beverages'
  ],
  items: [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato sauce, mozzarella and fresh basil',
      price: 299,
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300',
      category: 'Pizza',
      isVeg: true,
      rating: 4.6,
      bestseller: true,
      spicy: false
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      description: 'Traditional pepperoni with mozzarella cheese',
      price: 399,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300',
      category: 'Pizza',
      isVeg: false,
      rating: 4.4,
      bestseller: false,
      spicy: true
    },
    {
      id: 3,
      name: 'Spaghetti Carbonara',
      description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
      price: 349,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc6d2c5f7?w=300',
      category: 'Pasta',
      isVeg: false,
      rating: 4.5,
      bestseller: true,
      spicy: false
    },
    {
      id: 4,
      name: 'Garlic Bread',
      description: 'Toasted bread with garlic butter and herbs',
      price: 149,
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300',
      category: 'Appetizers',
      isVeg: true,
      rating: 4.2,
      bestseller: false,
      spicy: false
    }
  ]
};

export default function RestaurantMenuScreen() {
  const { restaurantId } = useLocalSearchParams();
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});
  const [showVegOnly, setShowVegOnly] = useState(false);
  const categoryScrollRef = useRef<ScrollView>(null);

  const filteredItems = menuData.items.filter(item => {
    const matchesCategory = activeCategory === 'All Items' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !showVegOnly || item.isVeg;
    
    return matchesCategory && matchesSearch && matchesVeg;
  });

  const addToCart = (itemId: number) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
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
    menuData.items.forEach(item => {
      if (cartItems[item.id]) {
        total += item.price * cartItems[item.id];
      }
    });
    return total;
  };

  const renderCategoryTab = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      style={[
        styles.categoryTab,
        activeCategory === item && styles.activeCategoryTab
      ]}
      onPress={() => setActiveCategory(item)}
    >
      <Text style={[
        styles.categoryTabText,
        activeCategory === item && styles.activeCategoryTabText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }: { item: any }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <View style={styles.menuItemHeader}>
            {item.isVeg ? (
              <View style={styles.vegIcon}>
                <View style={styles.vegDot} />
              </View>
            ) : (
              <View style={styles.nonVegIcon}>
                <View style={styles.nonVegDot} />
              </View>
            )}
            {item.bestseller && (
              <View style={styles.bestsellerBadge}>
                <Ionicons name="star" size={12} color="#FF6B35" />
                <Text style={styles.bestsellerText}>Bestseller</Text>
              </View>
            )}
            {item.spicy && (
              <View style={styles.spicyBadge}>
                <Text style={styles.spicyText}>🌶️</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          
          <View style={styles.menuItemFooter}>
            <Text style={styles.menuItemPrice}>₹{item.price}</Text>
            {item.rating && (
              <View style={styles.menuItemRating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.menuItemRatingText}>{item.rating}</Text>
              </View>
            )}
          </View>
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
                  onPress={() => addToCart(item.id)}
                >
                  <Ionicons name="add" size={16} color="#667eea" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item.id)}
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
          <Text style={styles.cartItemCount}>{totalItems} item{totalItems > 1 ? 's' : ''}</Text>
          <Text style={styles.cartTotal}>₹{totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.viewCartButton}>
          <Text style={styles.viewCartButtonText}>View Cart</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

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
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for dishes..."
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
        
        <TouchableOpacity
          style={[styles.vegToggle, showVegOnly && styles.vegToggleActive]}
          onPress={() => setShowVegOnly(!showVegOnly)}
        >
          <MaterialIcons name="eco" size={20} color={showVegOnly ? "#FFFFFF" : "#4CAF50"} />
          <Text style={[styles.vegToggleText, showVegOnly && styles.vegToggleTextActive]}>
            Veg Only
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        <ScrollView
          ref={categoryScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContainer}
        >
          {menuData.categories.map((category, index) => (
            <View key={category}>
              {renderCategoryTab({ item: category, index })}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Menu Items */}
      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.menuList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={64} color="#E2E8F0" />
            <Text style={styles.emptyStateTitle}>No items found</Text>
            <Text style={styles.emptyStateSubtitle}>
              Try adjusting your search or category filter
            </Text>
          </View>
        }
      />

      {renderCartSummary()}
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
    flex: 1,
  },
  shareButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
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
  vegToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  vegToggleActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  vegToggleText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  vegToggleTextActive: {
    color: '#FFFFFF',
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
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
  menuList: {
    paddingVertical: 16,
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
  vegIcon: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegDot: {
    width: 8,
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  nonVegIcon: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#FF4757',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonVegDot: {
    width: 8,
    height: 8,
    backgroundColor: '#FF4757',
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
  spicyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  spicyText: {
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
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
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
  menuItemImageContainer: {
    position: 'relative',
  },
  menuItemImage: {
    width: 120,
    height: 100,
    borderRadius: 8,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: [{ translateX: -40 }],
  },
  addButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#667eea',
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
}); 