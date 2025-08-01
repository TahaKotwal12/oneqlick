import { Stack } from 'expo-router';
import React from 'react';

export default function RestaurantsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Restaurants',
        }}
      />
      <Stack.Screen 
        name="[id]" 
        options={{
          title: 'Restaurant Details',
        }}
      />
      <Stack.Screen 
        name="menu" 
        options={{
          title: 'Menu',
        }}
      />
    </Stack>
  );
} 