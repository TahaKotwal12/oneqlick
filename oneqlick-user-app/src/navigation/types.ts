export type RootStackParamList = {
  Welcome: undefined;
  AuthOptions: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  // Restaurant Feature
  RestaurantList: undefined;
  RestaurantDetail: { restaurantId: string };
  Menu: { restaurantId: string };
  Cart: undefined;
  Checkout: undefined;
};

export type AuthStackParamList = {
  AuthOptions: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  RestaurantList: undefined;
  RestaurantDetail: { restaurantId: string };
  Menu: { restaurantId: string };
  Cart: undefined;
  Checkout: undefined;
}; 