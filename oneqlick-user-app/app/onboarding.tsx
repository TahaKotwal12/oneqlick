import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Order Your Favorite Food',
    subtitle: 'Browse thousands of restaurants near you',
    image: require('../assets/images/react-logo.png'),
    illustration: '🍕',
  },
  {
    id: 2,
    title: 'Fast & Reliable Delivery',
    subtitle: 'Get your food delivered in 30 minutes or less',
    image: require('../assets/images/react-logo.png'),
    illustration: '🚚',
  },
  {
    id: 3,
    title: 'Track Your Order',
    subtitle: 'Know exactly where your order is',
    image: require('../assets/images/react-logo.png'),
    illustration: '📍',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSkip, setShowSkip] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const illustrationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hide skip button on last screen
    setShowSkip(currentIndex < onboardingData.length - 1);
    
    // Start entrance animations for current screen
    Animated.parallel([
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.timing(illustrationAnim, {
        toValue: 1,
        duration: 800,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
    },
    onPanResponderGrant: () => {
      slideAnim.setValue(0);
    },
    onPanResponderMove: (_, gestureState) => {
      slideAnim.setValue(gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      const { dx, vx } = gestureState;
      
      if (Math.abs(dx) > width * 0.3 || Math.abs(vx) > 0.5) {
        if (dx > 0 && currentIndex > 0) {
          // Swipe right - go to previous
          goToPrevious();
        } else if (dx < 0 && currentIndex < onboardingData.length - 1) {
          // Swipe left - go to next
          goToNext();
        } else {
          // Reset position
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      } else {
        // Reset position
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const goToNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      // Reset animations
      titleAnim.setValue(0);
      subtitleAnim.setValue(0);
      illustrationAnim.setValue(0);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentIndex(currentIndex + 1);
        fadeAnim.setValue(1);
        slideAnim.setValue(0);
      });
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      // Reset animations
      titleAnim.setValue(0);
      subtitleAnim.setValue(0);
      illustrationAnim.setValue(0);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: width,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentIndex(currentIndex - 1);
        fadeAnim.setValue(1);
        slideAnim.setValue(0);
      });
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    router.replace('/(tabs)' as any);
  };

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    router.replace('/(tabs)' as any);
  };

  const currentScreen = onboardingData[currentIndex];

  return (
    <GestureHandlerRootView style={styles.container}>
      <LinearGradient
        colors={['#FF6B35', '#F7931E', '#FF4B2B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <StatusBar style="light" />
        
        <View style={styles.content}>
          {/* Skip Button */}
          {showSkip && (
            <Animated.View style={[styles.skipContainer, { opacity: fadeAnim }]}>
              <Text style={styles.skipText} onPress={handleSkip}>
                Skip
              </Text>
            </Animated.View>
          )}

          {/* Main Content */}
          <Animated.View
            style={[
              styles.screenContainer,
              {
                transform: [{ translateX: slideAnim }],
                opacity: fadeAnim,
              },
            ]}
            {...panResponder.panHandlers}
          >
            {/* Illustration */}
            <Animated.View 
              style={[
                styles.illustrationContainer,
                {
                  opacity: illustrationAnim,
                  transform: [
                    {
                      scale: illustrationAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                    {
                      translateY: illustrationAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.illustration}>{currentScreen.illustration}</Text>
            </Animated.View>

            {/* Text Content */}
            <View style={styles.textContainer}>
              <Animated.Text 
                style={[
                  styles.title,
                  {
                    opacity: titleAnim,
                    transform: [
                      {
                        translateY: titleAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {currentScreen.title}
              </Animated.Text>
              <Animated.Text 
                style={[
                  styles.subtitle,
                  {
                    opacity: subtitleAnim,
                    transform: [
                      {
                        translateY: subtitleAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {currentScreen.subtitle}
              </Animated.Text>
            </View>

            {/* Progress Indicators */}
            <View style={styles.progressContainer}>
              {onboardingData.map((_, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.progressDot,
                    index === currentIndex && styles.progressDotActive,
                    {
                      transform: [
                        {
                          scale: index === currentIndex ? 1.2 : 1,
                        },
                      ],
                    },
                  ]}
                />
              ))}
            </View>

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
              {currentIndex > 0 && (
                <Text style={styles.backButton} onPress={goToPrevious}>
                  Back
                </Text>
              )}
              
              {currentIndex < onboardingData.length - 1 ? (
                <Text style={styles.nextButton} onPress={goToNext}>
                  Next
                </Text>
              ) : (
                <Text style={styles.getStartedButton} onPress={handleGetStarted}>
                  Get Started
                </Text>
              )}
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  skipContainer: {
    alignSelf: 'flex-end',
    marginBottom: 40,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  illustration: {
    fontSize: 120,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 26,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: 'white',
    width: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  backButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  nextButton: {
    backgroundColor: 'white',
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    overflow: 'hidden',
  },
  getStartedButton: {
    backgroundColor: 'white',
    color: '#FF6B35',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    overflow: 'hidden',
  },
}); 