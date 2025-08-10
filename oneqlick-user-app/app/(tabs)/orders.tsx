import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
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

// Dummy data for orders
const ORDERS_DATA = [
  {
    id: '1',
    restaurantName: 'Punjabi Dhaba',
    orderNumber: '#ORD001',
    date: 'Today, 2:30 PM',
    status: 'delivered',
    statusText: 'Delivered',
    items: ['Butter Chicken', 'Dal Makhani', 'Naan'],
    total: '₹450',
    deliveryAddress: '123 Main Street, Rural Area',
    estimatedTime: '25-30 min',
  },
  {
    id: '2',
    restaurantName: 'South Indian Kitchen',
    orderNumber: '#ORD002',
    date: 'Yesterday, 7:15 PM',
    status: 'preparing',
    statusText: 'Preparing',
    items: ['Masala Dosa', 'Sambar', 'Coconut Chutney'],
    total: '₹280',
    deliveryAddress: '123 Main Street, Rural Area',
    estimatedTime: '20-25 min',
  },
  {
    id: '3',
    restaurantName: 'Street Food Corner',
    orderNumber: '#ORD003',
    date: 'Dec 15, 1:45 PM',
    status: 'cancelled',
    statusText: 'Cancelled',
    items: ['Pani Puri', 'Bhel Puri', 'Samosa'],
    total: '₹180',
    deliveryAddress: '123 Main Street, Rural Area',
    estimatedTime: '15-20 min',
  },
  {
    id: '4',
    restaurantName: 'Home Kitchen Special',
    orderNumber: '#ORD004',
    date: 'Dec 14, 6:30 PM',
    status: 'delivered',
    statusText: 'Delivered',
    items: ['Roti Sabzi', 'Dal', 'Rice'],
    total: '₹320',
    deliveryAddress: '123 Main Street, Rural Area',
    estimatedTime: '30-35 min',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return COLORS.success;
    case 'preparing':
      return COLORS.warning;
    case 'cancelled':
      return COLORS.error;
    default:
      return COLORS.primary;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'checkmark-circle';
    case 'preparing':
      return 'time';
    case 'cancelled':
      return 'close-circle';
    default:
      return 'ellipse';
  }
};

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('all');

  const renderOrderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.restaurantName}>{item.restaurantName}</Text>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Ionicons 
            name={getStatusIcon(item.status) as any} 
            size={16} 
            color={COLORS.text.white} 
          />
          <Text style={styles.statusText}>{item.statusText}</Text>
        </View>
      </View>

      <View style={styles.orderItems}>
        {item.items.map((foodItem: string, index: number) => (
          <Text key={index} style={styles.foodItem}>
            • {foodItem}
          </Text>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.orderMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={16} color={COLORS.text.secondary} />
            <Text style={styles.metaText}>{item.deliveryAddress}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time" size={16} color={COLORS.text.secondary} />
            <Text style={styles.metaText}>{item.estimatedTime}</Text>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{item.total}</Text>
        </View>
      </View>

      {item.status === 'delivered' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={16} color={COLORS.primary} />
            <Text style={styles.actionButtonText}>Reorder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="star" size={16} color={COLORS.warning} />
            <Text style={styles.actionButtonText}>Rate</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Orders</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="filter" size={24} color={COLORS.text.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['all', 'active', 'delivered', 'cancelled'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <FlatList
        data={ORDERS_DATA}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />

      {/* Empty State (when no orders) */}
      {ORDERS_DATA.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="receipt-outline" size={64} color={COLORS.text.tertiary} />
          <Text style={styles.emptyStateTitle}>No Orders Yet</Text>
          <Text style={styles.emptyStateSubtitle}>
            Start ordering delicious food from local restaurants
          </Text>
          <TouchableOpacity style={styles.emptyStateButton}>
            <Text style={styles.emptyStateButtonText}>Explore Restaurants</Text>
          </TouchableOpacity>
        </View>
      )}
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
  ordersList: {
    padding: SPACING.lg,
  },
  orderCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  orderInfo: {
    flex: 1,
  },
  restaurantName: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.h4,
    fontWeight: '600',
    marginBottom: 2,
  },
  orderNumber: {
    color: COLORS.text.secondary,
    ...TYPOGRAPHY.bodyMedium,
    marginBottom: 2,
  },
  orderDate: {
    color: COLORS.text.tertiary,
    ...TYPOGRAPHY.bodySmall,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.small,
    fontWeight: '600',
  },
  orderItems: {
    marginBottom: SPACING.md,
  },
  foodItem: {
    color: COLORS.text.secondary,
    ...TYPOGRAPHY.bodyMedium,
    marginBottom: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: SPACING.md,
  },
  orderMeta: {
    flex: 1,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  metaText: {
    color: COLORS.text.tertiary,
    ...TYPOGRAPHY.bodySmall,
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    color: COLORS.text.secondary,
    ...TYPOGRAPHY.bodySmall,
    marginBottom: 2,
  },
  totalAmount: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.h4,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    gap: 6,
  },
  actionButtonText: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '500',
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