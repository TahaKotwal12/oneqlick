# OneQlick Food Delivery App - Complete Screen Prompts
*React Native + Expo + Tamagui Implementation Guide*

## 🏗️ Project Setup & Architecture

Before starting with individual screens, ensure your project structure follows these best practices:

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation setup
├── hooks/             # Custom hooks
├── utils/             # Utility functions
├── constants/         # App constants
├── types/             # TypeScript types
└── data/              # Dummy data
```

---

## 📱 AUTHENTICATION FLOW SCREENS

### 1. Splash Screen
**Prompt:**
```
Create a modern splash screen for OneQlick food delivery app using React Native, Expo and Tamagui. The screen should include:
- Animated OneQlick logo in the center
- Subtle food-themed background with gradient colors (orange to red)
- Loading spinner below the logo
- "Delivering happiness to your doorstep" tagline
- Auto-navigate to onboarding after 3 seconds
- Use Tamagui's animation system for smooth logo entrance
- Implement with TypeScript and proper error handling
- Follow Material Design 3 principles for Indian market appeal
```

### 2. Onboarding Screens (3-4 screens)
**Prompt:**
```
Create a beautiful onboarding flow for OneQlick with 3 screens using React Native, Expo and Tamagui:

Screen 1: "Order Your Favorite Food"
- Large food illustration
- "Browse thousands of restaurants near you"
- Next/Skip buttons

Screen 2: "Fast & Reliable Delivery" 
- Delivery partner illustration
- "Get your food delivered in 30 minutes or less"
- Progress indicators

Screen 3: "Track Your Order"
- Real-time tracking illustration
- "Know exactly where your order is"
- Get Started button

Features:
- Smooth swipe gestures using react-native-gesture-handler
- Animated transitions between screens
- Skip functionality
- Modern UI with Tamagui components
- Responsive design for different screen sizes
- Store onboarding completion in AsyncStorage
```

### 3. Welcome Screen
**Prompt:**
```
Create a welcome screen for OneQlick using React Native, Expo and Tamagui with:
- Hero section with food imagery
- "Welcome to OneQlick" heading
- "Order food from your favorite restaurants" subtitle
- Two prominent buttons: "Sign In" and "Sign Up"
- Social media login options (Google, Facebook)
- "Continue as Guest" option at bottom
- Modern gradient background
- Use Tamagui's Button, Text, and YStack components
- Implement proper spacing and typography
- Add subtle animations on button press
```

### 4. Phone Number Input Screen
**Prompt:**
```
Create a phone number input screen for OneQlick using React Native, Expo and Tamagui:
- "Enter your mobile number" heading
- Country code selector (+91 for India)
- Phone number input field with proper validation
- "We'll send you a verification code" subtitle
- Continue button (disabled until valid number entered)
- Terms and conditions checkbox
- Back button in header
- Use Tamagui's Input, Button, Select components
- Implement proper form validation
- Add loading state for OTP sending
- Error handling for invalid numbers
- Follow Indian phone number format (10 digits)
```

### 5. OTP Verification Screen
**Prompt:**
```
Create an OTP verification screen for OneQlick using React Native, Expo and Tamagui:
- "Verify your mobile number" heading
- Display masked phone number
- 6-digit OTP input fields (auto-focus next field)
- Countdown timer (60 seconds)
- "Resend OTP" button (enabled after countdown)
- Verify button
- "Edit mobile number" link
- Use Tamagui's Input components for OTP fields
- Auto-submit when all 6 digits entered
- Implement proper error states
- Success animation on verification
- Handle different OTP scenarios (expired, invalid, etc.)
```

### 6. User Registration Screen
**Prompt:**
```
Create a user registration screen for OneQlick using React Native, Expo and Tamagui:
- "Complete your profile" heading
- Form fields:
  - First Name (required)
  - Last Name (required)
  - Email (required, with validation)
  - Password (required, with strength indicator)
  - Confirm Password
- Profile picture upload option
- Gender selection (optional)
- Date of birth picker (optional)
- Register button
- "Already have an account? Sign In" link
- Use Tamagui's Form components
- Implement proper validation
- Password visibility toggle
- Loading state during registration
- Success navigation to home screen
```

### 7. Login Screen
**Prompt:**
```
Create a login screen for OneQlick using React Native, Expo and Tamagui:
- "Welcome back!" heading
- Email/Phone input field
- Password input field with visibility toggle
- "Forgot Password?" link
- Sign In button
- Social login options (Google, Facebook)
- "Don't have an account? Sign Up" link
- Use Tamagui's Form components
- Remember me checkbox
- Proper validation and error handling
- Loading states
- Auto-fill support
- Biometric login option (if available)
```

### 8. Forgot Password Screen
**Prompt:**
```
Create a forgot password screen for OneQlick using React Native, Expo and Tamagui:
- "Reset your password" heading
- Email/Phone input field
- "Send Reset Link" button
- Success message display
- Back to login link
- Instructions text
- Use Tamagui components
- Proper validation
- Loading states
- Error handling
- Clear success/error feedback
```

---

## 🏠 MAIN APP SCREENS

### 9. Home Screen (Main Dashboard)
**Prompt:**
```
Create the main home screen for OneQlick food delivery app using React Native, Expo and Tamagui:

Header Section:
- Location selector with current address
- Search bar with "Search for restaurants or dishes"
- Notification bell icon with badge
- Cart icon with item count

Content Sections:
- Promotional banners carousel (3-4 slides)
- Quick action buttons (Restaurants, Groceries, Pharmacy, etc.)
- "Order Again" section with previous orders
- Categories horizontal scroll (Pizza, Burger, Chinese, etc.)
- "Popular Restaurants" vertical list
- "Trending Now" section
- Special offers section

Features:
- Pull-to-refresh functionality
- Infinite scroll for restaurants
- Skeleton loading states
- Proper error handling
- Use dummy data for all sections
- Implement with Tamagui components (ScrollView, Card, Button, etc.)
- Responsive design
- Search functionality integration
- Location-based content
```

### 10. Location Selection Screen
**Prompt:**
```
Create a location selection screen for OneQlick using React Native, Expo and Tamagui:
- "Select your location" heading
- Current location button with GPS icon
- Search bar for manual address entry
- Recent addresses list
- Saved addresses (Home, Work, etc.)
- Map integration (React Native Maps)
- Address confirmation with landmark input
- Save address button
- Proper permissions handling for location
- Use Tamagui components
- Loading states for GPS detection
- Error handling for location services
- Address autocomplete functionality
```

### 11. Search Screen
**Prompt:**
```
Create a comprehensive search screen for OneQlick using React Native, Expo and Tamagui:
- Search bar with voice search option
- Recent searches section
- Trending searches
- Search filters (Cuisine, Price, Rating, etc.)
- Search results with restaurants and dishes
- "No results found" state
- Search suggestions while typing
- Category-wise results tabs
- Sort options (Relevance, Rating, Distance, Price)
- Use Tamagui components
- Debounced search functionality
- Proper loading states
- Clear search history option
- Voice search integration
```

### 12. Restaurant List Screen
**Prompt:**
```
Create a restaurant listing screen for OneQlick using React Native, Expo and Tamagui:
- Filter bar at top (Sort, Filter, Pure Veg)
- Restaurant cards with:
  - Restaurant image
  - Name and cuisine type
  - Rating with review count
  - Delivery time estimate
  - Delivery fee information
  - Discount/offer badges
  - Distance from user
- Loading skeleton cards
- Filter modal with options:
  - Cuisine types
  - Price range
  - Rating filter
  - Delivery time
  - Special offers
- Sort options modal
- Empty state handling
- Pull-to-refresh
- Infinite scrolling
- Use Tamagui Card, Image, Text components
```

### 13. Restaurant Detail Screen
**Prompt:**
```
Create a detailed restaurant screen for OneQlick using React Native, Expo and Tamagui:

Header Section:
- Large restaurant image with back button overlay
- Restaurant name, cuisine type
- Rating, reviews count, delivery time
- Share and favorite buttons

Info Section:
- Address and phone number
- Opening hours
- Minimum order amount
- Delivery fee information

Menu Section:
- Categories tabs (horizontal scroll)
- Food items list with:
  - Item image, name, description
  - Price with discount if any
  - Veg/Non-veg indicator
  - Rating and customization options
  - Add to cart button with quantity selector
- Search within menu
- Popular items section

Bottom:
- Cart summary bar (when items added)
- View cart button

Features:
- Sticky categories header
- Smooth scrolling to categories
- Add to favorites functionality
- Share restaurant option
- Proper loading states
- Use Tamagui components throughout
```

### 14. Food Item Detail Screen
**Prompt:**
```
Create a food item detail screen for OneQlick using React Native, Expo and Tamagui:
- Large food item image with image gallery
- Back button and share option
- Item name and description
- Veg/Non-veg indicator
- Rating and reviews count
- Price with discount information
- Customization options:
  - Size variants (Small, Medium, Large)
  - Add-ons (Extra cheese, etc.)
  - Preparation instructions
- Quantity selector
- Add to cart button
- Nutritional information
- Allergen information
- Reviews section
- Similar items recommendation
- Use Tamagui components
- Handle variant price calculations
- Proper form handling for customizations
```

### 15. Cart Screen
**Prompt:**
```
Create a shopping cart screen for OneQlick using React Native, Expo and Tamagui:

Cart Items Section:
- Restaurant name header
- Food items with:
  - Item image and name
  - Customizations/variants
  - Quantity controls (+/-)
  - Price per item
  - Remove item option
- Add more items from restaurant button

Bill Details Section:
- Subtotal
- Delivery fee
- Taxes and charges
- Discount applied
- Total amount

Delivery Section:
- Selected delivery address
- Change address option
- Delivery time estimate

Bottom:
- Apply coupon section
- Proceed to checkout button

Features:
- Empty cart state
- Item quantity updates
- Price calculations
- Coupon application
- Address modification
- Remove item confirmation
- Continue shopping option
- Use Tamagui components
- Proper state management
```

### 16. Checkout Screen
**Prompt:**
```
Create a checkout screen for OneQlick using React Native, Expo and Tamagui:

Delivery Address Section:
- Selected address display
- Change address option
- Special delivery instructions input

Payment Method Section:
- Credit/Debit cards
- UPI options
- Digital wallets
- Cash on delivery
- Add new payment method option

Order Summary:
- Items count and total
- Delivery charges
- Taxes
- Final amount

Additional Options:
- Special instructions for restaurant
- Tip for delivery partner
- Contact preferences

Bottom:
- Terms acceptance checkbox
- Place order button
- Estimated delivery time

Features:
- Payment method selection
- Address validation
- Order placement loading
- Error handling
- Razorpay integration setup
- Use Tamagui components
- Form validation
```

---

## 💳 PAYMENT SCREENS

### 17. Payment Method Screen
**Prompt:**
```
Create a payment methods screen for OneQlick using React Native, Expo and Tamagui:
- "Choose payment method" heading
- Payment options with radio buttons:
  - Saved cards list
  - UPI (GPay, PhonePe, Paytm)
  - Digital wallets
  - Net banking
  - Cash on delivery
- Add new card/UPI option
- Security badges and icons
- Order total display at bottom
- Pay now button
- Razorpay integration setup
- Use Tamagui components
- Secure payment handling
- Loading states during payment
- Error handling for failed payments
```

### 18. Add Payment Method Screen
**Prompt:**
```
Create add payment method screen for OneQlick using React Native, Expo and Tamagui:
- Payment type selection (Card/UPI)
- Card form fields:
  - Card number with validation
  - Expiry date
  - CVV
  - Cardholder name
- UPI ID input field
- Save for future payments option
- Security information
- Add payment method button
- Proper form validation
- Card type detection
- Secure input handling
- Use Tamagui Form components
- Loading states
- Error handling
```

### 19. Payment Processing Screen
**Prompt:**
```
Create a payment processing screen for OneQlick using React Native, Expo and Tamagui:
- Loading animation
- "Processing your payment" message
- Order details summary
- Security assurance message
- Don't press back warning
- Estimated processing time
- Cancel payment option (if applicable)
- Use Tamagui components
- Smooth animations
- Proper loading states
- Error handling for payment failures
- Success transition to order confirmation
```

### 20. Payment Success Screen
**Prompt:**
```
Create payment success screen for OneQlick using React Native, Expo and Tamagui:
- Success animation/icon
- "Payment successful" message
- Order number display
- Order summary
- Estimated delivery time
- Track order button
- Continue shopping button
- Share order option
- Download receipt option
- Use Tamagui components
- Celebrate animation
- Proper navigation after success
- Order details display
```

### 21. Payment Failed Screen
**Prompt:**
```
Create payment failed screen for OneQlick using React Native, Expo and Tamagui:
- Error icon/animation
- "Payment failed" message
- Failure reason (if available)
- Retry payment button
- Choose different payment method
- Contact support option
- Order details still visible
- Use Tamagui components
- Proper error messaging
- Retry functionality
- Support contact options
- Navigation back to payment methods
```

---

## 📦 ORDER MANAGEMENT SCREENS

### 22. Order Confirmation Screen
**Prompt:**
```
Create order confirmation screen for OneQlick using React Native, Expo and Tamagui:
- Success animation
- "Order placed successfully" message
- Order number prominently displayed
- Restaurant name and image
- Order details summary
- Estimated delivery time
- Delivery address
- Payment method used
- Track order button
- Add items button
- Call restaurant option
- Use Tamagui components
- Share order functionality
- Download receipt option
- Clear visual hierarchy
```

### 23. Order Tracking Screen
**Prompt:**
```
Create comprehensive order tracking screen for OneQlick using React Native, Expo and Tamagui:

Order Status Section:
- Current status indicator
- Progress timeline:
  - Order confirmed
  - Being prepared
  - Out for delivery
  - Delivered
- Estimated delivery time

Live Tracking:
- Map with delivery partner location
- Delivery partner details (name, photo, rating)
- Call/Message delivery partner buttons
- Real-time location updates

Order Details:
- Restaurant name and address
- Order items summary
- Delivery address
- Total amount

Actions:
- Cancel order (if applicable)
- Call restaurant
- Help/Support

Features:
- Real-time updates
- Push notifications integration
- Map integration
- Call functionality
- Use Tamagui components
- WebSocket for live updates (simulate with dummy data)
```

### 24. Order History Screen
**Prompt:**
```
Create order history screen for OneQlick using React Native, Expo and Tamagui:
- "Your orders" heading
- Filter options (All, Delivered, Cancelled)
- Order cards with:
  - Restaurant name and image
  - Order date and time
  - Items count and total amount
  - Order status
  - Reorder button
  - Rate order option
- Order details on tap
- Search orders functionality
- Empty state for no orders
- Pull-to-refresh
- Infinite scrolling
- Use Tamagui components
- Proper date formatting
- Status-based styling
```

### 25. Order Details Screen
**Prompt:**
```
Create detailed order view screen for OneQlick using React Native, Expo and Tamagui:

Order Info:
- Order number and date
- Restaurant details
- Order status with timeline
- Delivery address
- Payment method and status

Items Section:
- Ordered items list with quantities
- Item customizations
- Individual prices
- Subtotal calculation

Bill Details:
- Subtotal
- Tax breakdown
- Delivery charges
- Discount/offers applied
- Final amount

Actions:
- Reorder button
- Rate and review
- Download invoice
- Get help/support
- Report issue

Features:
- Expandable sections
- Proper receipt formatting
- Use Tamagui components
- Share functionality
- Print option
```

---

## ⭐ REVIEWS & RATINGS SCREENS

### 26. Rate Order Screen
**Prompt:**
```
Create order rating screen for OneQlick using React Native, Expo and Tamagui:
- "How was your order?" heading
- Star rating for restaurant (1-5 stars)
- Star rating for delivery (1-5 stars)
- Food quality rating
- Review text input (optional)
- Photo upload option
- Quick feedback tags (Delicious, Hot, Fast, etc.)
- Skip option
- Submit rating button
- Use Tamagui components
- Interactive star ratings
- Image picker integration
- Character limit for review
- Proper validation
```

### 27. Reviews List Screen
**Prompt:**
```
Create reviews listing screen for OneQlick using React Native, Expo and Tamagui:
- "Reviews" heading with total count
- Filter options (All, Recent, High rated, etc.)
- Sort options (Newest, Oldest, Rating)
- Review cards with:
  - User name and profile picture
  - Rating stars
  - Review text
  - Order details
  - Photos (if any)
  - Helpful/Not helpful buttons
  - Date of review
- Load more reviews
- Write review button
- Empty state
- Use Tamagui components
- Image gallery for review photos
- Proper loading states
```

---

## 👤 PROFILE & ACCOUNT SCREENS

### 28. Profile Screen
**Prompt:**
```
Create user profile screen for OneQlick using React Native, Expo and Tamagui:

Profile Header:
- Profile picture with edit option
- User name and email
- Phone number
- Edit profile button

Menu Options:
- Manage addresses
- Payment methods
- Order history
- Favorites
- Notifications settings
- Help & support
- About us
- Terms & conditions
- Privacy policy
- Logout

Account Stats:
- Total orders
- Money saved
- Loyalty points (if any)

Features:
- Profile picture upload
- Section separators
- Proper navigation
- Use Tamagui components
- Settings options
- Dark mode toggle
- Language selection
```

### 29. Edit Profile Screen
**Prompt:**
```
Create edit profile screen for OneQlick using React Native, Expo and Tamagui:
- "Edit profile" heading
- Profile picture with camera/gallery options
- Form fields:
  - First name
  - Last name
  - Email (with verification status)
  - Phone number (with verification)
  - Date of birth
  - Gender selection
- Save changes button
- Cancel option
- Delete account option
- Use Tamagui Form components
- Image picker integration
- Form validation
- Loading states
- Success/error feedback
- Email/phone verification flow
```

### 30. Manage Addresses Screen
**Prompt:**
```
Create address management screen for OneQlick using React Native, Expo and Tamagui:
- "Saved addresses" heading
- Add new address button
- Address cards with:
  - Address title (Home, Office, etc.)
  - Full address
  - Edit and delete options
  - Set as default option
- Default address indicator
- Empty state for no addresses
- Confirmation dialog for delete
- Use Tamagui components
- Swipe actions for edit/delete
- Search addresses functionality
- Address validation
```

### 31. Add/Edit Address Screen
**Prompt:**
```
Create add/edit address screen for OneQlick using React Native, Expo and Tamagui:
- "Add new address" heading
- Address form fields:
  - Address title (Home, Office, Other)
  - Flat/House number
  - Area/Street
  - Landmark (optional)
  - City (auto-filled)
  - Pincode
- Current location button
- Map integration for location selection
- Save address button
- Set as default checkbox
- Use Tamagui Form components
- GPS location fetching
- Address validation
- Map marker placement
- Auto-complete suggestions
```

### 32. Payment Methods Screen
**Prompt:**
```
Create saved payment methods screen for OneQlick using React Native, Expo and Tamagui:
- "Payment methods" heading
- Add payment method button
- Saved cards section:
  - Card type icons
  - Masked card numbers
  - Expiry dates
  - Edit/Delete options
  - Default payment indicator
- UPI methods section
- Digital wallets section
- Cash on delivery option
- Empty state
- Use Tamagui components
- Secure display of payment info
- Delete confirmation
- Set default functionality
```

### 33. Favorites Screen
**Prompt:**
```
Create favorites screen for OneQlick using React Native, Expo and Tamagui:
- "Your favorites" heading
- Tabs for different types:
  - Restaurants
  - Dishes
- Restaurant cards with:
  - Restaurant image
  - Name and cuisine
  - Rating and delivery time
  - Remove from favorites option
- Dish cards with:
  - Food image
  - Name and restaurant
  - Price
  - Add to cart option
- Empty state with recommendations
- Search favorites
- Use Tamagui components
- Remove confirmation
- Quick reorder options
```

---

## 🔔 NOTIFICATIONS & SETTINGS SCREENS

### 34. Notifications Screen
**Prompt:**
```
Create notifications screen for OneQlick using React Native, Expo and Tamagui:
- "Notifications" heading
- Mark all as read option
- Notification categories:
  - Order updates
  - Offers & promotions
  - System notifications
- Notification cards with:
  - Icon based on type
  - Title and message
  - Timestamp
  - Read/unread indicator
  - Action buttons (if applicable)
- Clear all notifications
- Empty state
- Pull-to-refresh
- Use Tamagui components
- Proper timestamp formatting
- Notification actions handling
```

### 35. Notification Settings Screen
**Prompt:**
```
Create notification settings screen for OneQlick using React Native, Expo and Tamagui:
- "Notification preferences" heading
- Toggle switches for:
  - Order updates
  - Promotional offers
  - New restaurants
  - Push notifications
  - SMS notifications
  - Email notifications
- Quiet hours setting
- Sound preferences
- Vibration settings
- Save preferences button
- Use Tamagui components
- Switch components
- Time picker for quiet hours
- Proper settings persistence
- Permission requests handling
```

### 36. Help & Support Screen
**Prompt:**
```
Create help and support screen for OneQlick using React Native, Expo and Tamagui:
- "Help & Support" heading
- Search help topics
- FAQ sections:
  - Account & Profile
  - Orders & Delivery
  - Payments & Refunds
  - App Issues
- Contact options:
  - Call customer care
  - Email support
  - Live chat
- Report an issue
- Order help (recent orders)
- Emergency contact
- Use Tamagui components
- Expandable FAQ items
- Search functionality
- Quick contact actions
- Order-specific help
```

### 37. FAQ Screen
**Prompt:**
```
Create FAQ screen for OneQlick using React Native, Expo and Tamagui:
- "Frequently Asked Questions" heading
- Search FAQ functionality
- Category-wise FAQs:
  - Account related
  - Payment issues
  - Delivery problems
  - App troubleshooting
- Expandable FAQ items
- Helpful/Not helpful voting
- Still need help button
- Use Tamagui components
- Accordion style questions
- Search highlighting
- Related questions
- Contact support option
```

---

## 🎁 OFFERS & COUPONS SCREENS

### 38. Offers Screen
**Prompt:**
```
Create offers and deals screen for OneQlick using React Native, Expo and Tamagui:
- "Offers for you" heading
- Banner carousel for major offers
- Offer categories:
  - Flat discounts
  - Cashback offers
  - Free delivery
  - Restaurant specific
- Offer cards with:
  - Offer image/icon
  - Title and description
  - Discount amount/percentage
  - Validity date
  - Terms & conditions
  - Use now button
- Search offers
- Filter by category
- Use Tamagui components
- Offer expiry handling
- Terms modal
- Copy coupon code functionality
```

### 39. Coupon Screen
**Prompt:**
```
Create coupons screen for OneQlick using React Native, Expo and Tamagui:
- "Available coupons" heading
- Apply coupon code input
- Available coupons list:
  - Coupon code
  - Discount details
  - Minimum order amount
  - Validity date
  - Apply button
- Used coupons section
- Expired coupons section
- Share coupon functionality
- Use Tamagui components
- Coupon validation
- Copy to clipboard
- Terms and conditions
- Success/error feedback
```

---

## 🚀 ADDITIONAL SCREENS

### 40. App Settings Screen
**Prompt:**
```
Create app settings screen for OneQlick using React Native, Expo and Tamagui:
- "Settings" heading
- General settings:
  - Language selection
  - Dark mode toggle
  - Currency preference
  - Location services
- Delivery preferences:
  - Default delivery address
  - Preferred delivery time
  - Special instructions
- Privacy settings:
  - Data sharing
  - Marketing communications
  - Location tracking
- App info:
  - Version number
  - Terms of service
  - Privacy policy
- Use Tamagui components
- Switch toggles
- Modal selections
- Settings persistence
```

### 41. About Us Screen
**Prompt:**
```
Create about us screen for OneQlick using React Native, Expo and Tamagui:
- OneQlick logo and branding
- Company description
- Mission and vision
- Our story section
- Team information
- Contact details
- Social media links
- App version info
- Legal information
- Awards/certifications
- Use Tamagui components
- Scrollable content
- Professional layout
- Image galleries
- External link handling
```

### 42. Terms & Conditions Screen
**Prompt:**
```
Create terms and conditions screen for OneQlick using React Native, Expo and Tamagui:
- "Terms & Conditions" heading
- Scrollable legal content
- Section-wise organization:
  - User agreement
  - Service terms
  - Payment terms
  - Delivery terms
  - Privacy policy
  - Cancellation policy
- Last updated date
- Accept/Decline buttons (if required)
- Search functionality
- Use Tamagui components
- Proper text formatting
- Bookmarking sections
- Print/share options
```

### 43. Privacy Policy Screen
**Prompt:**
```
Create privacy policy screen for OneQlick using React Native, Expo and Tamagui:
- "Privacy Policy" heading
- Data collection information
- Usage of personal data
- Cookie policy
- Third-party services
- Data security measures
- User rights
- Contact for privacy concerns
- Last updated date
- Use Tamagui components
- Readable formatting
- Section navigation
- Search functionality
- External links handling
```

### 44. Contact Us Screen
**Prompt:**
```
Create contact us screen for OneQlick using React Native, Expo and Tamagui:
- "Contact Us" heading
- Contact methods:
  - Phone number (clickable)
  - Email address (clickable)
  - Physical address
  - Business hours
- Contact form:
  - Name field
  - Email field
  - Subject selection
  - Message field
  - Submit button
- Social media links
- Map integration showing office location
- Emergency contact info
- Use Tamagui components
- Form validation
- Direct calling/emailing
- Map directions
```

### 45. Feedback Screen
**Prompt:**
```
Create app feedback screen for OneQlick using React Native, Expo and Tamagui:
- "We value your feedback" heading
- Rating for app experience (1-5 stars)
- Feedback categories:
  - App performance
  - User interface
  - Delivery experience
  - Customer service
- Text feedback area
- Suggestion for improvement
- Screenshot attachment option
- Submit feedback button
- Thank you message
- Use Tamagui components
- Star rating component
- Image picker
- Character counting
- Success feedback
```

---

## 🛠️ ERROR & EDGE CASE SCREENS

### 46. No Internet Screen
**Prompt:**
```
Create no internet connection screen for OneQlick using React Native, Expo and Tamagui:
- No internet illustration/icon
- "No internet connection" message
- Friendly error description
- Retry button
- Check network settings button
- Cached content display (if any)
- Use Tamagui components
- Network state detection
- Auto-retry functionality
- Offline mode features
- Proper error styling
```

### 47. Location Permission Screen
**Prompt:**
```
Create location permission screen for OneQlick using React Native, Expo and Tamagui:
- Location icon illustration
- "Enable location services" heading
- Benefits of location access
- Allow location button
- Enter location manually option
- Why we need location explanation
- Settings redirect button
- Use Tamagui components
- Permission handling
- Settings app integration
- Manual location entry
- Clear value proposition
```

### 48. Maintenance Screen
**Prompt:**
```
Create app maintenance screen for OneQlick using React Native, Expo and Tamagui:
- Maintenance illustration
- "We'll be back soon" message
- Maintenance description
- Expected completion time
- Contact support option
- Social media links
- Try again button
- Use Tamagui components
- Elegant design
- Contact options
- Auto-refresh capability
- Professional messaging
```

### 49. App Update Required Screen
**Prompt:**
```
Create app update required screen for OneQlick using React Native, Expo and Tamagui:
- Update illustration
- "Update required" heading
- New features highlights
- Update now button
- Later button (if optional update)
- App store redirect
- What's new section
- Use Tamagui components
- Store link handling
- Version comparison
- Feature highlights
- Compelling update messaging
```

### 50. Empty State Screens
**Prompt:**
```
Create various empty state screens for OneQlick using React Native, Expo and Tamagui:

1. Empty Cart:
- Empty cart illustration
- "Your cart is empty" message
- Browse restaurants button

2. No Restaurants:
- No restaurants illustration
- "No restaurants found" message
- Change location or try different search

3. No Orders:
- Empty orders illustration
- "No orders yet" message
- Start ordering button

4. No Favorites:
- Empty heart illustration
- "No favorites saved" message
- Explore restaurants button

5. No Search Results:
- Search illustration
- "No results found" message
- Search suggestions

Features:
- Consistent illustration style
- Helpful call-to-action buttons
- Encouraging messaging
- Use Tamagui components
- Proper navigation handling
```

---

## 🎯 SPECIALIZED SCREENS

### 51. Quick Reorder Screen
**Prompt:**
```
Create quick reorder screen for OneQlick using React Native, Expo and Tamagui:
- "Reorder from [Restaurant]" heading
- Previous order items display
- Modify quantities option
- Add more items button
- Updated pricing display
- Unavailable items handling
- Different address option
- Quick checkout button
- Use Tamagui components
- Price comparison with original
- Item availability check
- Seamless reorder flow
- Cart state management
```

### 52. Restaurant Search Filters Screen
**Prompt:**
```
Create advanced restaurant filter screen for OneQlick using React Native, Expo and Tamagui:
- "Filters" heading with reset option
- Filter sections:
  - Cuisine types (multi-select)
  - Price range slider
  - Rating filter (4+ stars, etc.)
  - Delivery time (Under 30 min, etc.)
  - Offers (Free delivery, Discounts)
  - Pure vegetarian toggle
  - Open now toggle
- Apply filters button
- Results count preview
- Clear all filters
- Use Tamagui components
- Multi-select checkboxes
- Slider components
- Filter state persistence
- Real-time results count
```

### 53. Live Chat Support Screen
**Prompt:**
```
Create live chat support screen for OneQlick using React Native, Expo and Tamagui:
- Chat header with agent info
- Message bubbles (user/agent)
- Text input with send button
- Typing indicators
- Message timestamp
- Image/file sharing option
- Quick reply suggestions
- End chat option
- Chat history
- Online/offline status
- Use Tamagui components
- Real-time messaging simulation
- File picker integration
- Professional chat interface
- Proper message threading
```

### 54. Referral Screen
**Prompt:**
```
Create referral program screen for OneQlick using React Native, Expo and Tamagui:
- "Refer & Earn" heading
- Referral benefits display
- User's referral code
- Share referral options:
  - WhatsApp
  - SMS
  - Social media
  - Copy link
- Referral history
- Earnings tracking
- Terms and conditions
- How it works section
- Use Tamagui components
- Social sharing integration
- Referral tracking
- Earnings display
- Compelling incentives
```

### 55. Loyalty Points Screen
**Prompt:**
```
Create loyalty points screen for OneQlick using React Native, Expo and Tamagui:
- "OneQlick Points" heading
- Current points balance
- Points earning rules
- Redeem points section
- Points history
- Available rewards
- Points expiry information
- How to earn more points
- Tier status (if applicable)
- Use Tamagui components
- Points calculation
- Reward catalog
- Transaction history
- Tier progress indicators
```

### 56. Order Scheduling Screen
**Prompt:**
```
Create order scheduling screen for OneQlick using React Native, Expo and Tamagui:
- "Schedule your order" heading
- Date picker for delivery date
- Time slot selection
- Advance order notice
- Restaurant availability check
- Scheduling fees (if any)
- Order summary with scheduled time
- Confirm scheduling button
- Modify scheduled order option
- Use Tamagui components
- Date/time pickers
- Availability validation
- Schedule confirmation
- Clear scheduling terms
```

### 57. Group Order Screen
**Prompt:**
```
Create group order screen for OneQlick using React Native, Expo and Tamagui:
- "Create group order" heading
- Order host details
- Invite friends options
- Order deadline setting
- Participant list
- Individual order summaries
- Split bill options
- Payment collection
- Order finalization
- Group chat feature
- Use Tamagui components
- Invitation system
- Bill splitting logic
- Real-time updates
- Social features integration
```

### 58. Subscription/Membership Screen
**Prompt:**
```
Create subscription screen for OneQlick using React Native, Expo and Tamagui:
- "OneQlick Plus" membership heading
- Membership benefits:
  - Free delivery
  - Exclusive discounts
  - Priority support
  - Early access to features
- Pricing plans (Monthly/Yearly)
- Current subscription status
- Payment method for subscription
- Auto-renewal settings
- Cancel subscription option
- Use Tamagui components
- Subscription management
- Payment integration
- Benefits showcase
- Clear pricing display
```

### 59. Voice Search Screen
**Prompt:**
```
Create voice search screen for OneQlick using React Native, Expo and Tamagui:
- Voice search animation
- "Listening..." indicator
- Speech-to-text display
- Voice search results
- Retry voice search
- Switch to text search
- Recent voice searches
- Voice search tips
- Microphone permission handling
- Use Tamagui components
- Speech recognition integration
- Audio visualization
- Proper permissions
- Fallback options
```

### 60. Dark Mode Settings Screen
**Prompt:**
```
Create dark mode settings screen for OneQlick using React Native, Expo and Tamagui:
- "Appearance" heading
- Theme options:
  - Light mode
  - Dark mode
  - System default
- Preview of selected theme
- Auto dark mode scheduling
- Theme customization options
- Save preferences
- Apply theme instantly
- Use Tamagui theme system
- Theme persistence
- Smooth theme transitions
- Custom theme options
- User preference handling
```

---

## 📊 ANALYTICS & INSIGHTS SCREENS

### 61. Order Analytics Screen (User Dashboard)
**Prompt:**
```
Create user order analytics screen for OneQlick using React Native, Expo and Tamagui:
- "Your Food Journey" heading
- Order statistics:
  - Total orders this month/year
  - Money spent
  - Favorite cuisine
  - Most ordered restaurant
  - Average order value
- Visual charts and graphs
- Spending trends
- Dietary insights
- Carbon footprint (if applicable)
- Share insights feature
- Use Tamagui components
- Chart library integration
- Data visualization
- Interesting insights
- Social sharing options
```

### 62. Spending Insights Screen
**Prompt:**
```
Create spending insights screen for OneQlick using React Native, Expo and Tamagui:
- "Spending Insights" heading
- Monthly/yearly spending charts
- Category-wise breakdown
- Budget setting option
- Spending alerts
- Cost-saving suggestions
- Comparison with previous periods
- Export spending report
- Money saved through offers
- Use Tamagui components
- Financial charts
- Budget tracking
- Smart recommendations
- Export functionality
```

---

## 🎨 CUSTOMIZATION SCREENS

### 63. App Customization Screen
**Prompt:**
```
Create app customization screen for OneQlick using React Native, Expo and Tamagui:
- "Customize your app" heading
- Home screen layout options
- Quick action buttons customization
- Favorite cuisine shortcuts
- Notification preferences
- Widget preferences
- Color theme selection
- Font size options
- Accessibility settings
- Use Tamagui components
- Drag-and-drop interface
- Live preview
- Accessibility features
- Personal preferences
```

### 64. Accessibility Settings Screen
**Prompt:**
```
Create accessibility settings screen for OneQlick using React Native, Expo and Tamagui:
- "Accessibility" heading
- Text size adjustment
- High contrast mode
- Voice over settings
- Screen reader compatibility
- Button size options
- Reduced motion settings
- Audio descriptions
- Keyboard navigation
- Color blind friendly options
- Use Tamagui accessibility features
- System integration
- Inclusive design
- Compliance with standards
- User testing friendly
```

---

## 🔄 INTEGRATION SCREENS

### 65. Social Media Login Screens
**Prompt:**
```
Create social media login screens for OneQlick using React Native, Expo and Tamagui:

Google Login:
- Google branding compliance
- Permission requests
- Account selection
- Profile data import
- Error handling

Facebook Login:
- Facebook SDK integration
- Permission scopes
- Profile picture import
- Friends integration (optional)
- Login error states

Features:
- Secure authentication
- Data privacy compliance
- Quick registration flow
- Profile completion
- Use Tamagui components
- OAuth implementation
- Error recovery
```

### 66. Maps Integration Screens
**Prompt:**
```
Create maps integration screens for OneQlick using React Native, Expo and Tamagui:

Restaurant Location Screen:
- Restaurant marker on map
- Directions to restaurant
- Estimated travel time
- Traffic conditions
- Alternative routes

Delivery Tracking Map:
- Real-time delivery partner location
- Route optimization
- ETA updates
- Geofencing notifications
- Map controls

Features:
- React Native Maps integration
- Custom markers
- Route drawing
- Location updates
- Use Tamagui overlays
- Performance optimization
```

---

## 🚨 EMERGENCY & SAFETY SCREENS

### 67. Emergency Contact Screen
**Prompt:**
```
Create emergency contact screen for OneQlick using React Native, Expo and Tamagui:
- "Emergency Contacts" heading
- Quick dial emergency numbers
- Local police/ambulance
- Customer care emergency line
- Report safety issue
- Share live location
- Emergency order cancellation
- Safety tips display
- Use Tamagui components
- Direct calling functionality
- Location sharing
- Safety priority
- Clear emergency actions
```

### 68. Safety Features Screen
**Prompt:**
```
Create safety features screen for OneQlick using React Native, Expo and Tamagui:
- "Your Safety Matters" heading
- Delivery partner verification
- Live order tracking
- Share order with contacts
- Emergency contact setup
- Safety tips and guidelines
- Report safety concerns
- Contactless delivery options
- Safety ratings for areas
- Use Tamagui components
- Safety education
- Quick reporting
- Contact sharing
- Verification displays
```

---

## 🎬 ONBOARDING & TUTORIAL SCREENS

### 69. Feature Tutorial Screens
**Prompt:**
```
Create feature tutorial screens for OneQlick using React Native, Expo and Tamagui:

Tutorial overlays for:
- First-time cart usage
- Voice search introduction
- Live tracking explanation
- Offers and coupons guide
- Profile completion
- Payment method setup

Features:
- Interactive tooltips
- Step-by-step guidance
- Skip tutorial option
- Progress indicators
- Animated explanations
- Use Tamagui overlays
- Gesture recognition
- Context-aware help
- Progressive disclosure
```

### 70. App Tour Screen
**Prompt:**
```
Create comprehensive app tour for OneQlick using React Native, Expo and Tamagui:
- Welcome to new features
- Major app sections overview
- Key functionality highlights
- Tips and tricks
- Best practices
- Hidden features reveal
- Personalization suggestions
- Tour completion rewards
- Use Tamagui components
- Interactive walkthrough
- Video tutorials
- Achievement system
- Skip and replay options
```

---

## 📱 IMPLEMENTATION GUIDELINES

### Development Setup Instructions:
```bash
# Start with this structure
npx create-expo-app OneQlick --template blank-typescript
cd OneQlick
npx expo install @tamagui/config @tamagui/animations-react-native

# Install required dependencies
npm install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install react-native-maps
npm install @react-native-community/netinfo
```

### Screen Implementation Priority:
1. **Phase 1 (Core Flow):** Screens 1-15 (Authentication + Home + Basic ordering)
2. **Phase 2 (Payment):** Screens 16-25 (Payment flow + Order management)
3. **Phase 3 (Profile):** Screens 26-37 (Reviews + Profile management)
4. **Phase 4 (Enhanced):** Screens 38-50 (Offers + Additional features)
5. **Phase 5 (Advanced):** Screens 51-70 (Specialized features)

### Dummy Data Structure:
```typescript
// Create these in src/data/dummyData.ts
export const dummyRestaurants = [...]
export const dummyFoodItems = [...]
export const dummyOrders = [...]
export const dummyUser = [...]
export const dummyCoupons = [...]
```

### Tamagui Component Usage:
- Use `YStack`, `XStack` for layouts
- Use `Button`, `Input`, `Text` for basic components
- Use `Card`, `Avatar`, `Badge` for complex components
- Implement proper spacing with `space` props
- Use theme variables for consistent styling

### Navigation Structure:
```typescript
// AuthStack (Screens 1-8)
// MainTabs (Home, Search, Orders, Profile)
// OrderStack (Screens 22-25)
// ProfileStack (Screens 28-37)
```

---

## 🎯 IMPLEMENTATION TIPS

1. **Start Simple:** Begin with basic layouts and dummy data
2. **Use TypeScript:** Define proper types for all data structures
3. **Implement State Management:** Use Context API or Zustand
4. **Add Animations:** Use Tamagui's animation system
5. **Focus on UX:** Implement loading states and error handling
6. **Test on Device:** Use Expo Go for real device testing
7. **Follow Design System:** Maintain consistency across screens
8. **Optimize Performance:** Use FlatList for large lists
9. **Add Accessibility:** Include proper accessibility props
10. **Plan for Real Data:** Structure components for easy API integration

---

## 🚀 READY TO START?

You now have comprehensive prompts for all 70+ screens of your OneQlick food delivery application. Each prompt includes:
- Detailed feature specifications
- Tamagui component usage
- User experience considerations
- Technical implementation hints
- Indian market specific features

**Recommended Starting Point:**
Begin with the Splash Screen (Screen #1) and work through the authentication flow. Each screen builds upon the previous ones, creating a complete user journey.

**Next Steps:**
1. Set up your development environment
2. Create the basic project structure
3. Implement dummy data
4. Start with Screen #1 and progress sequentially
5. Test each screen thoroughly before moving to the next

Happy coding! 🚀