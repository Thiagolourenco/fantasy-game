import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  useSharedValue,
  withSequence,
  withDelay,
  runOnJS,
  Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import useStyles from './onboardingViewStyle';
import { useOnboardingViewModel } from './onboardingViewModel';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

const OnboardingView = () => {
  const styles = useStyles();
  const { currentStep, steps, handleNext, handleSkip, isLastStep } = useOnboardingViewModel();

  // Animated values
  const translateX = useSharedValue(0);
  const fadeIn = useSharedValue(1);
  const scale = useSharedValue(1);
  const progress = useSharedValue(0);
  const imageScale = useSharedValue(1);

  // Animation function
  const animateStep = (direction: 'next' | 'prev' = 'next') => {
    const startX = direction === 'next' ? -width : width;
    translateX.value = withSequence(
      withTiming(startX, { duration: 0 }),
      withTiming(0, { duration: 500 })
    );
    fadeIn.value = withTiming(1, { duration: 500 });
    scale.value = withSpring(1, { damping: 15 });
    imageScale.value = withSequence(
      withTiming(0.8, { duration: 0 }),
      withSpring(1, { damping: 15 })
    );
    progress.value = withTiming(currentStep / (steps.length - 1), { duration: 500 });
  };

  const handleGesture = (event: any) => {
    'worklet';
    const { translationX } = event;
    translateX.value = translationX;
    
    // Calculate progress based on gesture
    const newProgress = currentStep / (steps.length - 1) + (translationX / width);
    progress.value = Math.max(0, Math.min(1, newProgress));
    
    // Scale image based on gesture
    const scaleValue = interpolate(
      Math.abs(translationX),
      [0, width / 2],
      [1, 0.8],
      Extrapolate.CLAMP
    );
    imageScale.value = scaleValue;
  };

  const handleGestureEnd = (event: any) => {
    'worklet';
    const { velocityX, translationX } = event;
    
    if (Math.abs(translationX) > SWIPE_THRESHOLD || Math.abs(velocityX) > 500) {
      if (translationX > 0 && currentStep > 0) {
        // Swipe right - go to previous
        translateX.value = withTiming(width, { duration: 300 }, () => {
          runOnJS(handlePrev)();
        });
      } else if (translationX < 0 && currentStep < steps.length - 1) {
        // Swipe left - go to next
        translateX.value = withTiming(-width, { duration: 300 }, () => {
          runOnJS(handleNext)();
        });
      } else {
        // Return to center
        translateX.value = withSpring(0, { damping: 15 });
        imageScale.value = withSpring(1, { damping: 15 });
      }
    } else {
      // Return to center if not swiped enough
      translateX.value = withSpring(0, { damping: 15 });
      imageScale.value = withSpring(1, { damping: 15 });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      // Update step in view model
      runOnJS(() => {
        const vm = useOnboardingViewModel();
        vm.setCurrentStep(currentStep - 1);
      })();
    }
  };

  // Animated styles
  const contentStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(
      progress.value,
      [0, 1],
      [0.8, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { scale: scaleValue },
      ],
      opacity: fadeIn.value,
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: imageScale.value },
      ],
    };
  });

  const dotStyle = (index: number) => useAnimatedStyle(() => {
    const dotProgress = interpolate(
      progress.value,
      [index - 1, index, index + 1],
      [0.3, 1, 0.3],
      Extrapolate.CLAMP
    );

    return {
      opacity: dotProgress,
      transform: [{ scale: interpolate(dotProgress, [0.3, 1], [0.8, 1.2]) }],
    };
  });

  // Animate when step changes
  React.useEffect(() => {
    animateStep();
  }, [currentStep]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onEnded={handleGestureEnd}
        >
          <Animated.View style={[styles.contentContainer, contentStyle]}>
            <Animated.View style={[styles.imageContainer, imageStyle]}>
              <Image
                source={steps[currentStep].image}
                style={styles.image}
                resizeMode="contain"
              />
            </Animated.View>
            <Text style={styles.title}>{steps[currentStep].title}</Text>
            <Text style={styles.description}>{steps[currentStep].description}</Text>
          </Animated.View>
        </PanGestureHandler>

        <View style={styles.paginationContainer}>
          {steps.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.paginationDot,
                dotStyle(index),
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={handleSkip}
          >
            <Text style={styles.buttonText}>Pular</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>
              {isLastStep ? 'Começar' : 'Próximo'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingView;