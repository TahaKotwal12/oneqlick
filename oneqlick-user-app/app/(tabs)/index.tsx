import { useState } from 'react';
import { Button, Card, H1, H2, Paragraph, Text, XStack, YStack } from 'tamagui';

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  return (
    <YStack flex={1} space="$4" padding="$4">
      {/* Header Section */}
      <YStack space="$2" alignItems="center" paddingTop="$4">
        <H1>Welcome to OneQlick! 🚀</H1>
        <Paragraph size="$4">
          Your React Native app with Tamagui is ready to go!
        </Paragraph>
      </YStack>

      {/* Main Content Card */}
      <Card elevate size="$4" padding="$4" space="$4">
        <YStack space="$3">
          <H2>Hello World! 👋</H2>
          <Paragraph size="$3">
            This is a beautiful Tamagui-powered React Native app. 
            You can start building amazing user interfaces with these modern components.
          </Paragraph>
          
          {/* Interactive Counter */}
          <YStack space="$2" alignItems="center">
            <Text fontSize="$6" fontWeight="bold">
              Counter: {count}
            </Text>
            <XStack space="$2">
              <Button
                size="$3"
                onPress={() => setCount(count - 1)}
              >
                Decrease
              </Button>
              <Button
                size="$3"
                onPress={() => setCount(count + 1)}
              >
                Increase
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </Card>

      {/* Feature Cards */}
      <YStack space="$3">
        <H2 marginBottom="$2">
          What&apos;s Included
        </H2>
        
        <XStack space="$3" flexWrap="wrap">
          <Card flex={1} elevate size="$2" padding="$3" minWidth={150}>
            <YStack space="$2">
              <Text fontWeight="bold" fontSize="$3">
                🎨 Tamagui UI
              </Text>
              <Text fontSize="$2">
                Modern, accessible components
              </Text>
            </YStack>
          </Card>
          
          <Card flex={1} elevate size="$2" padding="$3" minWidth={150}>
            <YStack space="$2">
              <Text fontWeight="bold" fontSize="$3">
                🌙 Dark Mode
              </Text>
              <Text fontSize="$2">
                Automatic theme switching
              </Text>
            </YStack>
          </Card>
        </XStack>
        
        <XStack space="$3" flexWrap="wrap">
          <Card flex={1} elevate size="$2" padding="$3" minWidth={150}>
            <YStack space="$2">
              <Text fontWeight="bold" fontSize="$3">
                📱 Expo Router
              </Text>
              <Text fontSize="$2">
                File-based navigation
              </Text>
            </YStack>
          </Card>
          
          <Card flex={1} elevate size="$2" padding="$3" minWidth={150}>
            <YStack space="$2">
              <Text fontWeight="bold" fontSize="$3">
                ⚡ Performance
              </Text>
              <Text fontSize="$2">
                Optimized for speed
              </Text>
            </YStack>
          </Card>
        </XStack>
      </YStack>

      {/* Action Button */}
      <YStack alignItems="center" paddingBottom="$4">
        <Button
          size="$4"
          onPress={() => alert('Hello from Tamagui! 🎉')}
        >
          Get Started
        </Button>
      </YStack>
    </YStack>
  );
}
