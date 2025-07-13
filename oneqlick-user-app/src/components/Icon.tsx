import React from 'react';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = theme.colors.textPrimary,
  style 
}) => {
  // Map icon names to their respective libraries
  const getIconComponent = () => {
    // Ionicons (most common)
    if (name.startsWith('ios-') || name.startsWith('md-') || name.startsWith('logo-')) {
      return <Ionicons name={name as any} size={size} color={color} style={style} />;
    }
    
    // Material Icons
    if (name.startsWith('material-')) {
      const materialName = name.replace('material-', '') as any;
      return <MaterialIcons name={materialName} size={size} color={color} style={style} />;
    }
    
    // FontAwesome5
    if (name.startsWith('fa-')) {
      const faName = name.replace('fa-', '') as any;
      return <FontAwesome5 name={faName} size={size} color={color} style={style} />;
    }
    
    // Default to Ionicons
    return <Ionicons name={name as any} size={size} color={color} style={style} />;
  };

  return getIconComponent();
};

// Predefined icon sets using valid icon names
export const Icons = {
  // Navigation
  arrowBack: 'ios-arrow-back',
  arrowForward: 'ios-arrow-forward',
  close: 'ios-close',
  
  // Authentication
  eye: 'ios-eye',
  eyeOff: 'ios-eye-off',
  lock: 'ios-lock-closed',
  mail: 'ios-mail',
  person: 'ios-person',
  
  // Food & Delivery - Using valid icons
  restaurant: 'material-restaurant',
  car: 'ios-car',
  time: 'ios-time',
  location: 'ios-location',
  star: 'ios-star',
  
  // Social
  google: 'logo-google',
  facebook: 'logo-facebook',
  apple: 'logo-apple',
  
  // UI Elements
  home: 'ios-home',
  search: 'ios-search',
  cart: 'ios-cart',
  heart: 'ios-heart',
  settings: 'ios-settings',
  menu: 'ios-menu',
  
  // Status
  checkmark: 'ios-checkmark-circle',
  warning: 'ios-warning',
  error: 'ios-close-circle',
  info: 'ios-information-circle',
  
  // Actions
  add: 'ios-add',
  remove: 'ios-remove',
  edit: 'ios-create',
  delete: 'ios-trash',
  share: 'ios-share',
  
  // Features - Using valid icons
  delivery: 'material-local-shipping',
  payment: 'material-payment',
  support: 'ios-help-circle',
  notification: 'ios-notifications',
  
  // Alternative icons
  rocket: 'material-rocket',
  card: 'material-credit-card',
  restaurantOutline: 'material-restaurant',
  eyeOutline: 'ios-eye',
  eyeOffOutline: 'ios-eye-off',
}; 