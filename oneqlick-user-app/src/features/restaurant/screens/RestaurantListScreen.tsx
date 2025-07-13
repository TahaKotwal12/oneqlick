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
import { Icon, Icons } from '../../../components/Icon';
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
            <View style={styles.restaurantHeader}>
              <Icon name={Icons.restaurant} size={24} color={theme.colors.primary} />
              <Text style={styles.restaurantName}>Pizza Palace</Text>
            </View>
            <View style={styles.restaurantInfo}>
              <View style={styles.infoRow}>
                <Icon name={Icons.star} size={16} color={theme.colors.warning} />
                <Text style={styles.infoText}>4.5 • Italian • 15-25 min</Text>
              </View>
            </View>
            <CustomButton
              title="View Menu"
              onPress={() => handleRestaurantPress('pizza-palace')}
              size="small"
              style={styles.viewButton}
            />
          </View>

          <View style={styles.restaurantCard}>
            <View style={styles.restaurantHeader}>
              <Icon name={Icons.restaurant} size={24} color={theme.colors.secondary} />
              <Text style={styles.restaurantName}>Burger House</Text>
            </View>
            <View style={styles.restaurantInfo}>
              <View style={styles.infoRow}>
                <Icon name={Icons.star} size={16} color={theme.colors.warning} />
                <Text style={styles.infoText}>4.2 • American • 20-30 min</Text>
              </View>
            </View>
            <CustomButton
              title="View Menu"
              onPress={() => handleRestaurantPress('burger-house')}
              size="small"
              style={styles.viewButton}
            />
          </View>

          <View style={styles.restaurantCard}>
            <View style={styles.restaurantHeader}>
              <Icon name={Icons.restaurant} size={24} color={theme.colors.success} />
              <Text style={styles.restaurantName}>Sushi Express</Text>
            </View>
            <View style={styles.restaurantInfo}>
              <View style={styles.infoRow}>
                <Icon name={Icons.star} size={16} color={theme.colors.warning} />
                <Text style={styles.infoText}>4.7 • Japanese • 25-35 min</Text>
              </View>
            </View>
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
    fontSize: 28,
    fontWeight: '700' as const,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
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
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.sm,
  },
  restaurantInfo: {
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  viewButton: {
    alignSelf: 'flex-start',
  },
}); 