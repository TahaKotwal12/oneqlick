# OneQlick App - File-Based Routing Structure

## Directory Structure

```
app/
├── _layout.tsx                 # Root layout with TamaguiProvider
├── index.tsx                   # Entry point - checks onboarding status
├── +not-found.tsx             # 404 page
├── (auth)/                     # Authentication group
│   ├── _layout.tsx            # Auth group layout
│   ├── splash.tsx             # Splash screen
│   ├── onboarding.tsx         # Onboarding flow (3 screens)
│   ├── welcome.tsx            # Welcome screen with login options
│   └── signin.tsx             # Sign in form
└── (tabs)/                     # Main app group
    ├── _layout.tsx            # Tab navigation layout
    ├── index.tsx              # Home screen
    └── explore.tsx            # Explore screen
```

## Navigation Flow

1. **App Launch** → `app/index.tsx`
   - Checks AsyncStorage for onboarding completion
   - Navigates to `/(auth)/splash` (first time) or `/(auth)/welcome` (returning user)

2. **First Time Users**:
   - `/(auth)/splash` → `/(auth)/onboarding` → `/(auth)/welcome` → `/(tabs)`

3. **Returning Users**:
   - `/(auth)/welcome` → `/(tabs)` (via guest continue or sign in)

4. **Authentication**:
   - `/(auth)/welcome` → `/(auth)/signin` → `/(tabs)`

## Route Groups

### `(auth)` Group
- Contains all authentication and onboarding screens
- Shared layout with no headers
- Handles user onboarding and authentication flow

### `(tabs)` Group
- Contains main app screens
- Tab-based navigation
- Accessible after authentication/onboarding

## Benefits of This Structure

1. **Clear Separation**: Auth and main app are clearly separated
2. **Better Organization**: Related screens are grouped together
3. **Easier Maintenance**: Each group has its own layout and concerns
4. **Scalable**: Easy to add new auth screens or main app screens
5. **Type Safety**: Expo Router provides better type safety with grouped routes 