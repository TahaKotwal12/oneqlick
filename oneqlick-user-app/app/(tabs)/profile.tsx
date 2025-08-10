import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
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

// Profile menu items
const PROFILE_MENU = [
  {
    id: 'orders',
    title: 'My Orders',
    subtitle: 'View order history and track deliveries',
    icon: 'receipt-outline',
    type: 'navigation',
  },
  {
    id: 'addresses',
    title: 'Delivery Addresses',
    subtitle: 'Manage your delivery locations',
    icon: 'location-outline',
    type: 'navigation',
  },
  {
    id: 'payments',
    title: 'Payment Methods',
    subtitle: 'Cards, UPI, and cash on delivery',
    icon: 'card-outline',
    type: 'navigation',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Order updates and offers',
    icon: 'notifications-outline',
    type: 'toggle',
    value: true,
  },
  {
    id: 'language',
    title: 'Language',
    subtitle: 'Hindi, English, Punjabi',
    icon: 'language-outline',
    type: 'navigation',
  },
  {
    id: 'help',
    title: 'Help & Support',
    subtitle: 'Contact us and FAQs',
    icon: 'help-circle-outline',
    type: 'navigation',
  },
  {
    id: 'about',
    title: 'About OneQlick',
    subtitle: 'App version and information',
    icon: 'information-circle-outline',
    type: 'navigation',
  },
];

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const renderProfileHeader = () => (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      style={styles.profileHeader}
    >
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitials}>RK</Text>
        </View>
        <TouchableOpacity style={styles.editProfileButton}>
          <Ionicons name="camera" size={20} color={COLORS.text.white} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.profileName}>Rahul Kumar</Text>
      <Text style={styles.profileEmail}>rahul.kumar@email.com</Text>
      <Text style={styles.profilePhone}>+91 98765 43210</Text>
      
      <View style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>₹2,450</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderMenuItem = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <Ionicons name={item.icon as any} size={24} color={COLORS.primary} />
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      
      {item.type === 'toggle' ? (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={COLORS.surface}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color={COLORS.text.tertiary} />
      )}
    </TouchableOpacity>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsSection}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        <TouchableOpacity style={styles.quickActionCard}>
          <View style={styles.quickActionIcon}>
            <Ionicons name="gift-outline" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.quickActionTitle}>Refer & Earn</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionCard}>
          <View style={styles.quickActionIcon}>
            <Ionicons name="star-outline" size={24} color={COLORS.warning} />
          </View>
          <Text style={styles.quickActionTitle}>Rate App</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionCard}>
          <View style={styles.quickActionIcon}>
            <Ionicons name="share-outline" size={24} color={COLORS.accent} />
          </View>
          <Text style={styles.quickActionTitle}>Share App</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionCard}>
          <View style={styles.quickActionIcon}>
            <Ionicons name="settings-outline" size={24} color={COLORS.text.secondary} />
          </View>
          <Text style={styles.quickActionTitle}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderProfileHeader()}
        
        <View style={styles.content}>
          {renderQuickActions()}
          
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Account & Preferences</Text>
            {PROFILE_MENU.map(renderMenuItem)}
          </View>
          
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    paddingTop: 60,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: SPACING.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileInitials: {
    color: COLORS.text.white,
    fontSize: 32,
    fontWeight: '700',
  },
  editProfileButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  profileName: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.h2,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  profileEmail: {
    color: 'rgba(255, 255, 255, 0.9)',
    ...TYPOGRAPHY.bodyMedium,
    marginBottom: 2,
  },
  profilePhone: {
    color: 'rgba(255, 255, 255, 0.9)',
    ...TYPOGRAPHY.bodyMedium,
    marginBottom: SPACING.lg,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: COLORS.text.white,
    ...TYPOGRAPHY.h4,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    ...TYPOGRAPHY.small,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: SPACING.md,
  },
  content: {
    paddingHorizontal: SPACING.lg,
  },
  quickActionsSection: {
    marginTop: -SPACING.xl,
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.h4,
    fontWeight: '600',
    marginBottom: SPACING.lg,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  quickActionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  quickActionTitle: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '500',
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.xxl,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    color: COLORS.text.primary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '500',
    marginBottom: 2,
  },
  menuSubtitle: {
    color: COLORS.text.tertiary,
    ...TYPOGRAPHY.bodySmall,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.xxl,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    gap: SPACING.sm,
  },
  logoutText: {
    color: COLORS.error,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 40,
  },
}); 