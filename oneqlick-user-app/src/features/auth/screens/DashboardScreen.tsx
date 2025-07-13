import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/types';
import { CustomButton } from '../../../components/CustomButton';
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
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.name || 'User'}! 👋
          </Text>
          <Text style={styles.subtitle}>
            You have successfully signed in to OneQlick
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎉 Authentication Successful!</Text>
            <Text style={styles.cardText}>
              This is your dashboard screen. Here you would typically see:
            </Text>
            <View style={styles.featureList}>
              <Text style={styles.featureItem}>• Restaurant listings</Text>
              <Text style={styles.featureItem}>• Menu browsing</Text>
              <Text style={styles.featureItem}>• Order tracking</Text>
              <Text style={styles.featureItem}>• Payment methods</Text>
              <Text style={styles.featureItem}>• Order history</Text>
            </View>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userInfoTitle}>Your Account Details:</Text>
            <Text style={styles.userInfoText}>Name: {user?.name}</Text>
            <Text style={styles.userInfoText}>Email: {user?.email}</Text>
            {user?.phone && (
              <Text style={styles.userInfoText}>Phone: {user.phone}</Text>
            )}
          </View>

          <View style={styles.dummyContent}>
            <Text style={styles.dummyTitle}>📱 App Features Coming Soon</Text>
            <Text style={styles.dummyText}>
              This is a demo version with authentication functionality. 
              The full app will include restaurant discovery, menu ordering, 
              real-time tracking, and secure payments.
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
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
  welcomeText: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: theme.colors.mutedBg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  cardTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  cardText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    lineHeight: 22,
  },
  featureList: {
    marginTop: theme.spacing.sm,
  },
  featureItem: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  userInfo: {
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  userInfoTitle: {
    ...theme.typography.h3,
    color: theme.colors.primaryDark,
    marginBottom: theme.spacing.md,
  },
  userInfoText: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  dummyContent: {
    backgroundColor: theme.colors.secondaryLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  dummyTitle: {
    ...theme.typography.h3,
    color: theme.colors.secondaryDark,
    marginBottom: theme.spacing.md,
  },
  dummyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: theme.spacing.lg,
  },
  browseButton: {
    marginBottom: theme.spacing.md,
  },
  signOutButton: {
    marginBottom: theme.spacing.md,
  },
}); 