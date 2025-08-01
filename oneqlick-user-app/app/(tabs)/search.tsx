import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Dummy Data
const trendingSearches = [
  'Pizza',
  'Burger',
  'Chinese',
  'South Indian',
  'Desserts',
  'Beverages',
  'Fast Food',
  'Healthy'
];

const cuisineFilters = [
  { id: 1, name: 'Italian', icon: 'restaurant', color: '#FF6B6B' },
  { id: 2, name: 'Chinese', icon: 'ramen-dining', color: '#4ECDC4' },
  { id: 3, name: 'Indian', icon: 'restaurant', color: '#45B7D1' },
  { id: 4, name: 'American', icon: 'fastfood', color: '#F7B801' },
  { id: 5, name: 'Mexican', icon: 'lunch-dining', color: '#FF9FF3' },
  { id: 6, name: 'Japanese', icon: 'set-meal', color: '#A8E6CF' },
  { id: 7, name: 'Thai', icon: 'ramen-dining', color: '#FFB6C1' },
  { id: 8, name: 'Mediterranean', icon: 'restaurant-menu', color: '#98D8C8' }
];

const priceFilters = [
  { id: 1, name: 'Under ₹200', range: '0-200' },
  { id: 2, name: '₹200 - ₹500', range: '200-500' },
  { id: 3, name: '₹500 - ₹1000', range: '500-1000' },
  { id: 4, name: 'Above ₹1000', range: '1000+' }
];

const ratingFilters = [
  { id: 1, name: '4.5+ Stars', rating: 4.5 },
  { id: 2, name: '4.0+ Stars', rating: 4.0 },
  { id: 3, name: '3.5+ Stars', rating: 3.5 },
  { id: 4, name: '3.0+ Stars', rating: 3.0 }
];

const sortOptions = [
  { id: 1, name: 'Relevance', icon: 'target' },
  { id: 2, name: 'Rating', icon: 'star' },
  { id: 3, name: 'Distance', icon: 'location' },
  { id: 4, name: 'Price: Low to High', icon: 'trending-up' },
  { id: 5, name: 'Price: High to Low', icon: 'trending-down' }
];

const searchSuggestions = [
  'Pizza Margherita',
  'Chicken Pizza',
  'Veg Pizza',
  'Pepperoni Pizza',
  'Cheese Pizza',
  'Pizza Hut',
  'Domino\'s Pizza',
  'Pizza Delivery'
];

const dummySearchResults = [
  {
    id: 1,
    type: 'restaurant',
    name: 'Pizza Palace',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: '₹40',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300',
    isOpen: true,
    discount: '20% OFF',
    dishes: ['Margherita Pizza', 'Pepperoni Pizza', 'Cheese Pizza']
  },
  {
    id: 2,
    type: 'dish',
    name: 'Margherita Pizza',
    restaurant: 'Pizza Palace',
    price: '₹299',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300',
    description: 'Classic Italian pizza with tomato sauce and mozzarella cheese'
  },
  {
    id: 3,
    type: 'restaurant',
    name: 'Burger House',
    rating: 4.2,
    deliveryTime: '20-30 min',
    deliveryFee: '₹30',
    cuisine: 'American',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
    isOpen: true,
    discount: '15% OFF',
    dishes: ['Classic Burger', 'Cheese Burger', 'Chicken Burger']
  }
];

const resultTabs = [
  { id: 'all', name: 'All', icon: 'apps' },
  { id: 'restaurants', name: 'Restaurants', icon: 'restaurant' },
  { id: 'dishes', name: 'Dishes', icon: 'restaurant-menu' }
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const searchInputRef = useRef<TextInput>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    loadRecentSearches();
    // Auto-focus search input
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  }, []);

  const loadRecentSearches = async () => {
    try {
      const saved = await AsyncStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  const saveRecentSearch = async (query: string) => {
    try {
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10);
      setRecentSearches(updated);
      await AsyncStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('recentSearches');
      setRecentSearches([]);
      Alert.alert('Success', 'Search history cleared');
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  const debouncedSearch = useCallback((query: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 500) as any;
  }, []);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    setShowSuggestions(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filter results based on query
    const filtered = dummySearchResults.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.restaurant && item.restaurant.toLowerCase().includes(query.toLowerCase())) ||
      (item.cuisine && item.cuisine.toLowerCase().includes(query.toLowerCase()))
    );

    setSearchResults(filtered);
    setIsLoading(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(query.length > 0);
    
    if (query.length > 0) {
      debouncedSearch(query);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery.trim());
      performSearch(searchQuery.trim());
      setShowSuggestions(false);
      searchInputRef.current?.blur();
    }
  };

  const handleVoiceSearch = () => {
    Alert.alert('Voice Search', 'Voice search functionality would be implemented here');
  };

  const handleFilterToggle = (filterType: string, filterId: number) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [filterType]: prev[filterType] === filterId ? null : filterId
    }));
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const handleResultPress = (item: any) => {
    if (item.type === 'restaurant') {
      console.log('Navigate to restaurant:', item.name);
    } else {
      console.log('Navigate to dish:', item.name);
    }
  };

  const renderIcon = (iconName: string, size: number, color: string, family: string = 'Ionicons') => {
    switch (family) {
      case 'MaterialIcons':
        return <MaterialIcons name={iconName as any} size={size} color={color} />;
      case 'Feather':
        return <Feather name={iconName as any} size={size} color={color} />;
      default:
        return <Ionicons name={iconName as any} size={size} color={color} />;
    }
  };

  const renderSearchBar = () => (
    <View style={styles.searchBarContainer}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.searchBarGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.searchBarContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchInputIcon} />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search for restaurants or dishes..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={handleSearch}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => handleSearch('')}
              >
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={styles.voiceButton}
              onPress={handleVoiceSearch}
            >
              <Ionicons name="mic" size={20} color="#667eea" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.filterButton, showFilters && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  const renderSearchSuggestions = () => (
    <View style={styles.suggestionsContainer}>
      <Text style={styles.suggestionsTitle}>Suggestions</Text>
      {searchSuggestions
        .filter(suggestion => suggestion.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5)
        .map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionItem}
            onPress={() => {
              setSearchQuery(suggestion);
              handleSearchSubmit();
            }}
          >
            <Ionicons name="search" size={16} color="#999" />
            <Text style={styles.suggestionText}>{suggestion}</Text>
            <Ionicons name="arrow-up-outline" size={16} color="#999" />
          </TouchableOpacity>
        ))}
    </View>
  );

  const renderRecentSearches = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        {recentSearches.length > 0 && (
          <TouchableOpacity onPress={clearSearchHistory}>
            <Text style={styles.clearAllButton}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      {recentSearches.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.recentSearchContainer}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentSearchChip}
                onPress={() => {
                  setSearchQuery(search);
                  handleSearchSubmit();
                }}
              >
                <Ionicons name="time-outline" size={14} color="#667eea" />
                <Text style={styles.recentSearchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.emptyText}>No recent searches</Text>
      )}
    </View>
  );

  const renderTrendingSearches = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Trending Searches</Text>
      <View style={styles.trendingGrid}>
        {trendingSearches.map((search, index) => (
          <TouchableOpacity
            key={index}
            style={styles.trendingChip}
            onPress={() => {
              setSearchQuery(search);
              handleSearchSubmit();
            }}
          >
            <Ionicons name="trending-up" size={14} color="#667eea" />
            <Text style={styles.trendingText}>{search}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Cuisine</Text>
          <View style={styles.filterChips}>
            {cuisineFilters.map(filter => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedFilters.cuisine === filter.id && styles.filterChipActive
                ]}
                onPress={() => handleFilterToggle('cuisine', filter.id)}
              >
                <MaterialIcons name={filter.icon as any} size={16} color={
                  selectedFilters.cuisine === filter.id ? '#FFFFFF' : filter.color
                } />
                <Text style={[
                  styles.filterChipText,
                  selectedFilters.cuisine === filter.id && styles.filterChipTextActive
                ]}>
                  {filter.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Price Range</Text>
          <View style={styles.filterChips}>
            {priceFilters.map(filter => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedFilters.price === filter.id && styles.filterChipActive
                ]}
                onPress={() => handleFilterToggle('price', filter.id)}
              >
                <Ionicons name="card" size={14} color={
                  selectedFilters.price === filter.id ? '#FFFFFF' : '#667eea'
                } />
                <Text style={[
                  styles.filterChipText,
                  selectedFilters.price === filter.id && styles.filterChipTextActive
                ]}>
                  {filter.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Rating</Text>
          <View style={styles.filterChips}>
            {ratingFilters.map(filter => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedFilters.rating === filter.id && styles.filterChipActive
                ]}
                onPress={() => handleFilterToggle('rating', filter.id)}
              >
                <Ionicons name="star" size={14} color={
                  selectedFilters.rating === filter.id ? '#FFFFFF' : '#FFD700'
                } />
                <Text style={[
                  styles.filterChipText,
                  selectedFilters.rating === filter.id && styles.filterChipTextActive
                ]}>
                  {filter.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const renderResultTabs = () => (
    <View style={styles.resultTabsContainer}>
      {resultTabs.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.resultTab,
            activeTab === tab.id && styles.resultTabActive
          ]}
          onPress={() => setActiveTab(tab.id)}
        >
          <MaterialIcons 
            name={tab.icon as any} 
            size={16} 
            color={activeTab === tab.id ? '#FFFFFF' : '#667eea'} 
          />
          <Text style={[
            styles.resultTabText,
            activeTab === tab.id && styles.resultTabTextActive
          ]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSortOptions = () => (
    <View style={styles.sortContainer}>
      <Text style={styles.sortTitle}>Sort by:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.sortChipsContainer}>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.sortChip,
                sortBy === option.name.toLowerCase() && styles.sortChipActive
              ]}
              onPress={() => handleSortChange(option.name.toLowerCase())}
            >
              <Ionicons 
                name={option.icon as any} 
                size={14} 
                color={sortBy === option.name.toLowerCase() ? '#FFFFFF' : '#667eea'} 
              />
              <Text style={[
                styles.sortChipText,
                sortBy === option.name.toLowerCase() && styles.sortChipTextActive
              ]}>
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderSearchResult = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.resultCard}
      onPress={() => handleResultPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.resultImage}
        contentFit="cover"
      />
      <View style={styles.resultInfo}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultName}>{item.name}</Text>
          {item.rating && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          )}
        </View>
        
        {item.restaurant && (
          <Text style={styles.resultRestaurant}>{item.restaurant}</Text>
        )}
        {item.cuisine && (
          <Text style={styles.resultCuisine}>{item.cuisine}</Text>
        )}
        {item.description && (
          <Text style={styles.resultDescription}>{item.description}</Text>
        )}
        
        <View style={styles.resultDetails}>
          {item.deliveryTime && (
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={12} color="#999" />
              <Text style={styles.detailText}>{item.deliveryTime}</Text>
            </View>
          )}
          {item.deliveryFee && (
            <View style={styles.detailItem}>
              <Ionicons name="bicycle-outline" size={12} color="#999" />
              <Text style={styles.detailText}>{item.deliveryFee}</Text>
            </View>
          )}
          {item.price && (
            <View style={styles.detailItem}>
              <Ionicons name="card-outline" size={12} color="#999" />
              <Text style={styles.detailText}>{item.price}</Text>
            </View>
          )}
        </View>
        
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderNoResults = () => (
    <View style={styles.noResultsContainer}>
      <Ionicons name="search" size={64} color="#E2E8F0" />
      <Text style={styles.noResultsTitle}>No results found</Text>
      <Text style={styles.noResultsSubtitle}>
        Try adjusting your search terms or filters
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {renderSearchBar()}

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {showSuggestions && renderSearchSuggestions()}
        
        {!searchQuery && (
          <>
            {renderRecentSearches()}
            {renderTrendingSearches()}
          </>
        )}

        {showFilters && renderFilters()}

        {searchQuery && (
          <>
            {renderResultTabs()}
            {renderSortOptions()}
            
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#667eea" />
                <Text style={styles.loadingText}>Searching...</Text>
              </View>
            ) : searchResults.length > 0 ? (
              <View style={styles.resultsContainer}>
                {searchResults.map(item => (
                  <View key={item.id}>
                    {renderSearchResult({ item })}
                  </View>
                ))}
              </View>
            ) : (
              renderNoResults()
            )}
          </>
        )}
        
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
  searchBarContainer: {
    height: Platform.OS === 'ios' ? 120 : 100,
  },
  searchBarGradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBarContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInputIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A202C',
  },
  clearButton: {
    padding: 4,
    marginRight: 8,
  },
  voiceButton: {
    padding: 4,
  },
  filterButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  suggestionText: {
    fontSize: 16,
    color: '#4A5568',
    flex: 1,
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  clearAllButton: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  recentSearchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  recentSearchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  recentSearchText: {
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 6,
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    gap: 8,
  },
  trendingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  trendingText: {
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 6,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginHorizontal: 16,
    marginTop: 20,
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    paddingVertical: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterSection: {
    marginHorizontal: 16,
    marginRight: 32,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 12,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterChipActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterChipText: {
    fontSize: 12,
    color: '#4A5568',
    marginLeft: 6,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  resultTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  resultTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  resultTabActive: {
    backgroundColor: '#667eea',
  },
  resultTabText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
  resultTabTextActive: {
    color: '#FFFFFF',
  },
  sortContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sortTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A202C',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  sortChipsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  sortChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sortChipActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  sortChipText: {
    fontSize: 12,
    color: '#4A5568',
    marginLeft: 6,
  },
  sortChipTextActive: {
    color: '#FFFFFF',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#718096',
  },
  resultsContainer: {
    marginHorizontal: 16,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultImage: {
    width: '100%',
    height: 160,
  },
  resultInfo: {
    padding: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultName: {
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
  resultRestaurant: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  resultCuisine: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
  },
  resultDetails: {
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
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    marginHorizontal: 16,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A5568',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
}); 