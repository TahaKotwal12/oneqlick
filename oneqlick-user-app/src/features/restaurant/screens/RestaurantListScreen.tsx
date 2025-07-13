import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/types';
import { CustomButton } from '../../../components/CustomButton';
import { theme } from '../../../theme/theme';

type RestaurantListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RestaurantList'>;

export const RestaurantListScreen: React.FC = () => {
  const navigation = useNavigation<RestaurantListScreenNavigationProp>();

  const handleRestaurantPress = (restaurantId: string) => {
    navigation.navigate('RestaurantDetail', { restaurantId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Restaurants</Text>
          <Text style={styles.subtitle}>
            Discover amazing restaurants near you
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.restaurantCard}>
            <Text style={styles.restaurantName}>🍕 Pizza Palace</Text>
            <Text style={styles.restaurantInfo}>Italian • 4.5 ⭐ • 15-25 min</Text>
            <CustomButton
              title="View Menu"
              onPress={() => handleRestaurantPress('pizza-palace')}
              size="small"
              style={styles.viewButton}
            />
          </View>

          <View style={styles.restaurantCard}>
            <Text style={styles.restaurantName}>🍔 Burger House</Text>
            <Text style={styles.restaurantInfo}>American • 4.2 ⭐ • 20-30 min</Text>
            <CustomButton
              title="View Menu"
              onPress={() => handleRestaurantPress('burger-house')}
              size="small"
              style={styles.viewButton}
            />
          </View>

          <View style={styles.restaurantCard}>
            <Text style={styles.restaurantName}>🍜 Sushi Express</Text>
            <Text style={styles.restaurantInfo}>Japanese • 4.7 ⭐ • 25-35 min</Text>
            <CustomButton
              title="View Menu"
              onPress={() => handleRestaurantPress('sushi-express')}
              size="small"
              style={styles.viewButton}
            />
          </View>
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
  title: {
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
  restaurantCard: {
    backgroundColor: theme.colors.mutedBg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  restaurantName: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  restaurantInfo: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  viewButton: {
    alignSelf: 'flex-start',
  },
}); 