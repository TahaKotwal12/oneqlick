# OneQlick Developer Guide

## Table of Contents
1. [Project Structure](#project-structure)
2. [Adding New Screens](#adding-new-screens)
3. [Navigation Patterns](#navigation-patterns)
4. [File-Based Routing](#file-based-routing)
5. [API Integration](#api-integration)
6. [UI Guidelines](#ui-guidelines)
7. [State Management](#state-management)
8. [Best Practices](#best-practices)

## Project Structure

```
oneqlick-user-app/
├── app/                          # Expo Router pages
│   ├── _layout.tsx              # Root layout with providers
│   ├── index.tsx                # Entry point & route logic
│   ├── (auth)/                  # Authentication flow
│   │   ├── _layout.tsx          # Auth stack layout
│   │   ├── splash.tsx           # Splash screen
│   │   ├── onboarding.tsx       # Onboarding flow
│   │   ├── welcome.tsx          # Welcome screen
│   │   ├── signin.tsx           # Login screen
│   │   ├── register.tsx         # Registration screen
│   │   ├── phone.tsx            # Phone verification
│   │   └── forgot-password.tsx  # Password reset
│   ├── (tabs)/                  # Main app tabs
│   │   ├── _layout.tsx          # Tab layout
│   │   ├── index.tsx            # Home screen
│   │   └── search.tsx           # Search screen
│   ├── restaurants/             # Restaurant features
│   │   ├── _layout.tsx          # Restaurant stack layout
│   │   ├── index.tsx            # Restaurant listing
│   │   ├── [id].tsx             # Restaurant details
│   │   └── menu.tsx             # Menu browser
│   └── +not-found.tsx           # 404 page
├── src/                         # Source code
│   ├── config/                  # Configuration files
│   ├── hooks/                   # Custom hooks
│   ├── providers/               # Context providers
│   ├── services/                # API services
│   ├── types/                   # TypeScript types
│   └── utils/                   # Utility functions
├── components/                  # Reusable components
└── constants/                   # App constants
```

## Adding New Screens

### 1. Determine Screen Category

**Authentication Screens** → `app/(auth)/`
- Login, register, forgot password, etc.
- No tabs, full screen navigation

**Main App Screens** → `app/(tabs)/`
- Primary app features with bottom tabs
- Home, search, profile, etc.

**Feature-Specific Screens** → `app/[feature]/`
- Related screens grouped together
- Restaurants, orders, cart, etc.

### 2. Create the Screen File

```typescript
// app/(tabs)/profile.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>
        {/* Your screen content */}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
});
```

### 3. Add to Layout File

```typescript
// app/(tabs)/_layout.tsx
<Tabs.Screen
  name="profile"
  options={{
    title: 'Profile',
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="person" size={size || 24} color={color} />
    ),
  }}
/>
```

## Navigation Patterns

### 1. Route Groups

Use parentheses for grouping routes without affecting URL structure:

```
app/(auth)/signin.tsx    → /signin
app/(tabs)/index.tsx     → /
app/restaurants/[id].tsx → /restaurants/123
```

### 2. Navigation Methods

```typescript
import { router } from 'expo-router';

// Replace current screen (no back button)
router.replace('/welcome');

// Push new screen (with back button)
router.push('/restaurants/123');

// Go back
router.back();

// Navigate to tabs
router.push('/(tabs)/');

// Navigate with parameters
router.push({
  pathname: '/restaurants/[id]',
  params: { id: '123' }
});
```

### 3. Dynamic Routes

```typescript
// File: app/restaurants/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams();
  
  return (
    // Use the id parameter
  );
}
```

## File-Based Routing

### Layout Files

**Root Layout** (`app/_layout.tsx`)
```typescript
import { QueryProvider } from '../src/providers/QueryProvider';

export default function RootLayout() {
  return (
    <QueryProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </TamaguiProvider>
    </QueryProvider>
  );
}
```

**Group Layout** (`app/(auth)/_layout.tsx`)
```typescript
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
```

## API Integration

### 1. Define Types

```typescript
// src/types/api.ts
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  // ... other fields
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
```

### 2. Create Service

```typescript
// src/services/restaurantService.ts
import { apiClient } from '../config/api';
import { ApiResponse, Restaurant } from '../types/api';

export class RestaurantService {
  static async getRestaurants(): Promise<ApiResponse<Restaurant[]>> {
    const response = await apiClient.get<ApiResponse<Restaurant[]>>('/restaurants');
    return response.data;
  }
}
```

### 3. Create Hooks

```typescript
// src/hooks/useRestaurant.ts
import { useQuery } from '@tanstack/react-query';
import { RestaurantService } from '../services/restaurantService';

export const useRestaurants = () => {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: RestaurantService.getRestaurants,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### 4. Use in Components

```typescript
import { useRestaurants } from '../src/hooks/useRestaurant';

export default function RestaurantList() {
  const { data, isLoading, error } = useRestaurants();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return (
    <FlatList
      data={data?.data}
      renderItem={({ item }) => <RestaurantCard restaurant={item} />}
    />
  );
}
```

## UI Guidelines

### 1. Color Scheme

```typescript
// Use consistent blue gradient theme
const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2',
  background: ['#667eea', '#764ba2'],
  white: '#FFFFFF',
  gray: '#9CA3AF',
  success: '#10B981',
  error: '#EF4444',
};
```

### 2. Typography

```typescript
const TYPOGRAPHY = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  body: {
    fontSize: 14,
    color: '#333333',
  },
};
```

### 3. Icons

```typescript
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

// Use consistent icon library and sizes
<Ionicons name="home" size={24} color="#667eea" />
```

## State Management

### 1. Local State (AsyncStorage)

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
await AsyncStorage.setItem('onboardingCompleted', 'true');

// Retrieve data
const value = await AsyncStorage.getItem('onboardingCompleted');
```

### 2. Server State (TanStack Query)

```typescript
// Queries for fetching data
const { data, isLoading } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => UserService.getUserById(userId),
});

// Mutations for updating data
const createUser = useMutation({
  mutationFn: UserService.createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

## Best Practices

### 1. File Naming

- Use kebab-case for files: `forgot-password.tsx`
- Use PascalCase for components: `RestaurantCard.tsx`
- Use camelCase for utilities: `queryDebug.ts`

### 2. Component Structure

```typescript
// 1. Imports
import React from 'react';
import { View } from 'react-native';

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Component
export default function MyComponent({ title }: Props) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Functions
  const handlePress = () => {};
  
  // 6. Render
  return <View />;
}

// 7. Styles
const styles = StyleSheet.create({});
```

### 3. Error Handling

```typescript
// Always handle loading and error states
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error.message} />;
```

### 4. Performance

- Use `FlatList` for large lists
- Implement lazy loading for images
- Use `React.memo` for expensive components
- Debounce search inputs

### 5. Navigation

- Use `router.replace()` for authentication flows
- Use `router.push()` for normal navigation
- Always handle back button behavior

## Adding a New Feature Module

1. **Create folder structure**:
   ```
   app/orders/
   ├── _layout.tsx
   ├── index.tsx
   └── [id].tsx
   ```

2. **Create layout**:
   ```typescript
   // app/orders/_layout.tsx
   export default function OrdersLayout() {
     return (
       <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="index" />
         <Stack.Screen name="[id]" />
       </Stack>
     );
   }
   ```

3. **Add to main layout**:
   ```typescript
   // app/_layout.tsx
   <Stack.Screen name="orders" />
   ```

4. **Create services and hooks**:
   ```
   src/services/orderService.ts
   src/hooks/useOrder.ts
   src/types/order.ts
   ```

5. **Export from index**:
   ```typescript
   // src/index.ts
   export * from './hooks/useOrder';
   export * from './services/orderService';
   ```

## Debugging

### Development Tools

```typescript
// In development, access query debug tools
if (__DEV__) {
  global.queryDebug.logActiveQueries();
  global.queryDebug.getCacheStats();
}
```

### Common Issues

1. **Navigation not working**: Check route group structure
2. **TanStack Query errors**: Verify API types and endpoints
3. **Styling issues**: Ensure consistent color scheme
4. **Performance**: Use appropriate list components

---

This guide should help maintain consistency and structure when adding new features to the OneQlick app. 