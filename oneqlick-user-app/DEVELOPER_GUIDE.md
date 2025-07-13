# 🚀 OneQlick User App - Developer Guide

Welcome to the OneQlick User App development team! This guide will help you understand how to work with this React Native application.

## 📁 Project Structure

```
oneqlick-user-app/
├── src/
│   ├── components/          # Shared components (Logo, Button, Input, Icon)
│   ├── features/           # Feature-based folders
│   │   ├── auth/          # Authentication feature
│   │   │   ├── components/ # Auth-specific components
│   │   │   ├── hooks/     # Custom hooks for auth
│   │   │   ├── screens/   # Auth screens
│   │   │   └── services/  # Auth API services
│   │   ├── restaurant/    # Restaurant feature
│   │   └── orders/        # Orders feature
│   ├── navigation/        # Navigation setup
│   ├── theme/            # Colors, spacing, typography
│   └── utils/            # Helper functions
├── assets/               # Images, fonts, etc.
└── App.tsx              # Main app entry point
```

## 🎨 Design System

### Colors
- **Primary**: `#38b6ff` (Blue)
- **Secondary**: `#ff8c38` (Orange)
- **Success**: `#38d39f` (Green)
- **Error**: `#ff5c5c` (Red)
- **Warning**: `#ffd233` (Yellow)

### Spacing
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `xxl`: 48px

## 🛠️ How to Add New Features

### Step 1: Create Feature Folder
```bash
mkdir -p src/features/your-feature-name/{components,hooks,screens,services}
```

### Step 2: Create Your Screen
```typescript
// src/features/your-feature-name/screens/YourScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../../../components/CustomButton';
import { Icon, Icons } from '../../../components/Icon';
import { theme } from '../../../theme/theme';

export const YourScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Screen</Text>
      <CustomButton 
        title="Click Me" 
        onPress={() => {}} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
});
```

### Step 3: Add Navigation Route
```typescript
// src/navigation/types.ts
export type RootStackParamList = {
  // ... existing routes
  YourScreen: undefined; // Add your new route
};
```

```typescript
// src/navigation/AppNavigator.tsx
import { YourScreen } from '../features/your-feature-name/screens/YourScreen';

// Add inside Stack.Navigator
<Stack.Screen name="YourScreen" component={YourScreen} />
```

### Step 4: Navigate to Your Screen
```typescript
navigation.navigate('YourScreen');
```

## 🎯 How to Use Existing Components

### CustomButton
```typescript
import { CustomButton } from '../components/CustomButton';

<CustomButton
  title="Click Me"
  onPress={() => console.log('Clicked!')}
  variant="primary" // or "secondary", "outline"
  size="large" // or "medium", "small"
  loading={false}
  disabled={false}
/>
```

### CustomInput
```typescript
import { CustomInput } from '../components/CustomInput';

<CustomInput
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  secureTextEntry={false}
  error={emailError}
/>
```

### Icon
```typescript
import { Icon, Icons } from '../components/Icon';

<Icon 
  name={Icons.person} 
  size={24} 
  color={theme.colors.primary} 
/>
```

## 📱 Available Icons

### Navigation Icons
- `Icons.arrowBack`
- `Icons.arrowForward`
- `Icons.close`

### Authentication Icons
- `Icons.eye` / `Icons.eyeOff`
- `Icons.lock`
- `Icons.mail`
- `Icons.person`

### Food & Delivery Icons
- `Icons.restaurant`
- `Icons.car`
- `Icons.time`
- `Icons.location`
- `Icons.star`

### Social Icons
- `Icons.google`
- `Icons.facebook`
- `Icons.apple`

### UI Icons
- `Icons.home`
- `Icons.search`
- `Icons.cart`
- `Icons.heart`
- `Icons.settings`
- `Icons.menu`

## 🔧 How to Add New Icons

### Step 1: Check Available Icons
Visit these websites to find icon names:
- [Ionicons](https://ionic.io/ionicons)
- [Material Icons](https://fonts.google.com/icons)

### Step 2: Add to Icon Component
```typescript
// src/components/Icon.tsx
export const Icons = {
  // ... existing icons
  yourNewIcon: 'ios-your-icon-name', // or 'material-your-icon-name'
};
```

### Step 3: Use in Your Component
```typescript
<Icon name={Icons.yourNewIcon} size={24} color={theme.colors.primary} />
```

## 🎨 Styling Guidelines

### Use Theme Colors
```typescript
// ✅ Good
color: theme.colors.primary
backgroundColor: theme.colors.background

// ❌ Bad
color: '#38b6ff'
backgroundColor: '#ffffff'
```

### Use Theme Spacing
```typescript
// ✅ Good
padding: theme.spacing.lg
marginBottom: theme.spacing.md

// ❌ Bad
padding: 24
marginBottom: 16
```

### Use Theme Typography
```typescript
// ✅ Good
fontSize: 24
fontWeight: '700'

// ❌ Bad
fontSize: 20
fontWeight: 'bold'
```

## 🔄 State Management

### For Simple State
```typescript
const [email, setEmail] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

### For Complex State (Create Custom Hook)
```typescript
// src/features/your-feature/hooks/useYourFeature.ts
export const useYourFeature = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    // Your logic here
    setLoading(false);
  };

  return { data, loading, fetchData };
};
```

## 🌐 API Integration

### Create Service File
```typescript
// src/features/your-feature/services/yourService.ts
export const yourService = {
  async getData() {
    // Your API call here
    return fetch('/api/data');
  },
  
  async postData(data) {
    // Your API call here
    return fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
```

## 🧪 Testing

### Run the App
```bash
npm start
```

### Test on Device
1. Install Expo Go app on your phone
2. Scan the QR code from terminal
3. App will load on your device

### Test on Simulator
```bash
npm run ios     # For iOS simulator
npm run android # For Android emulator
```

## 🐛 Common Issues & Solutions

### Icon Not Showing
- Check if icon name exists in Ionicons/MaterialIcons
- Make sure you're using the correct prefix (`ios-`, `material-`)

### Navigation Not Working
- Make sure route is added to `types.ts`
- Make sure screen is added to `AppNavigator.tsx`
- Check if screen component is exported properly

### Styling Issues
- Always use theme colors and spacing
- Check if you imported `theme` correctly
- Make sure styles are applied to the right component

### Build Errors
```bash
# Clear cache
npm start -- --clear

# Reset Expo
expo r -c
```

## 📝 Code Style Guidelines

### File Naming
- Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Hooks: `camelCase.ts` (e.g., `useAuth.ts`)
- Services: `camelCase.ts` (e.g., `authService.ts`)

### Component Structure
```typescript
// 1. Imports
import React from 'react';
import { View, Text } from 'react-native';

// 2. Props interface
interface ComponentProps {
  title: string;
  onPress: () => void;
}

// 3. Component
export const Component: React.FC<ComponentProps> = ({ title, onPress }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

// 4. Styles
const styles = StyleSheet.create({
  // Your styles here
});
```

### Comments
```typescript
// ✅ Good - Explain WHY, not WHAT
// Show loading state while fetching user data
const [isLoading, setIsLoading] = useState(false);

// ❌ Bad - Obvious comments
const [email, setEmail] = useState(''); // Set email state
```

## 🚀 Quick Start Checklist

When starting work on a new feature:

1. ✅ Create feature folder structure
2. ✅ Create screen component
3. ✅ Add navigation route
4. ✅ Add navigation button
5. ✅ Test navigation
6. ✅ Add styling using theme
7. ✅ Add icons if needed
8. ✅ Test on device/simulator

## 📞 Need Help?

- Check this guide first
- Look at existing code for examples
- Ask the team lead for guidance
- Check React Native and Expo documentation

---

**Happy Coding! 🎉**

Remember: Keep it simple, use the existing patterns, and always test your changes! 