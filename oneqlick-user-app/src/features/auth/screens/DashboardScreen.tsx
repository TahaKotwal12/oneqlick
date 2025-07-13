import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/types';
import { CustomButton } from '../../../components/CustomButton';
import { Icon, Icons } from '../../../components/Icon';
import { useAuth } from '../hooks/useAuth';
import { theme } from '../../../theme/theme';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { user, signOut, isLoading } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              navigation.navigate('Welcome');
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Icon name={Icons.person} size={24} color={theme.colors.primary} />
            <Text style={styles.welcomeText}>
              Welcome back, {user?.name || 'User'}!
            </Text>
          </View>
          <Text style={styles.subtitle}>
            You have successfully signed in to OneQlick
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('RestaurantList')}>
              <Icon name={Icons.restaurant} size={32} color={theme.colors.primary} />
              <Text style={styles.actionText}>Browse Restaurants</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Icon name={Icons.search} size={32} color={theme.colors.secondary} />
              <Text style={styles.actionText}>Search Food</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Icon name={Icons.cart} size={32} color={theme.colors.success} />
              <Text style={styles.actionText}>My Orders</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Icon name={Icons.heart} size={32} color={theme.colors.error} />
              <Text style={styles.actionText}>Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info Card */}
        <View style={styles.userInfoCard}>
          <View style={styles.cardHeader}>
            <Icon name={Icons.person} size={20} color={theme.colors.primary} />
            <Text style={styles.cardTitle}>Account Details</Text>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.detailRow}>
              <Icon name={Icons.person} size={16} color={theme.colors.textSecondary} />
              <Text style={styles.detailText}>Name: {user?.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name={Icons.mail} size={16} color={theme.colors.textSecondary} />
              <Text style={styles.detailText}>Email: {user?.email}</Text>
            </View>
            {user?.phone && (
              <View style={styles.detailRow}>
                <Icon name={Icons.time} size={16} color={theme.colors.textSecondary} />
                <Text style={styles.detailText}>Phone: {user.phone}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Features Preview */}
        <View style={styles.featuresCard}>
          <View style={styles.cardHeader}>
            <Icon name={Icons.info} size={20} color={theme.colors.secondary} />
            <Text style={styles.cardTitle}>App Features</Text>
          </View>
          <View style={styles.featuresList}>
            <View style={styles.featureRow}>
              <Icon name={Icons.restaurant} size={16} color={theme.colors.success} />
              <Text style={styles.featureText}>Restaurant Discovery</Text>
            </View>
            <View style={styles.featureRow}>
              <Icon name={Icons.delivery} size={16} color={theme.colors.success} />
              <Text style={styles.featureText}>Fast Delivery</Text>
            </View>
            <View style={styles.featureRow}>
              <Icon name={Icons.payment} size={16} color={theme.colors.success} />
              <Text style={styles.featureText}>Secure Payments</Text>
            </View>
            <View style={styles.featureRow}>
              <Icon name={Icons.star} size={16} color={theme.colors.success} />
              <Text style={styles.featureText}>Reviews & Ratings</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <CustomButton
            title="Browse Restaurants"
            onPress={() => navigation.navigate('RestaurantList')}
            size="large"
            style={styles.browseButton}
          />
          
          <CustomButton
            title="Sign Out"
            onPress={handleSignOut}
            loading={isLoading}
            variant="outline"
            size="large"
            style={styles.signOutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  quickActions: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: theme.colors.mutedBg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  userInfoCard: {
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: theme.colors.primaryDark,
    marginLeft: theme.spacing.sm,
  },
  userDetails: {
    marginTop: theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.sm,
  },
  featuresCard: {
    backgroundColor: theme.colors.secondaryLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  featuresList: {
    marginTop: theme.spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  actions: {
    marginTop: theme.spacing.lg,
  },
  browseButton: {
    marginBottom: theme.spacing.md,
  },
  signOutButton: {
    marginBottom: theme.spacing.md,
  },
}); 