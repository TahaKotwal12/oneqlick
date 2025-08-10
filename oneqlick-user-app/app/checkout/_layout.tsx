import { Stack } from 'expo-router';

export default function CheckoutLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Checkout',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          title: 'Payment',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="success"
        options={{
          title: 'Order Placed',
          headerShown: false,
        }}
      />
    </Stack>
  );
} 