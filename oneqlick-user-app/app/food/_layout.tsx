import { Stack } from 'expo-router';
import React from 'react';

export default function FoodLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Food Details',
        }}
      />
    </Stack>
  );
} 