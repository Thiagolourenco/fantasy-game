import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  useSharedValue,
  withSequence,
  runOnJS,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import useStyles from './onboardingViewStyle';
import { useOnboardingViewModel } from './onboardingViewModel';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

const OnboardingView = () => {
  const styles = useStyles();
  const { currentStep, steps, handleNext, handleSkip, isLastStep, setCurrentStep } = useOnboardingViewModel();

  const translateX = useSharedValue(0);
  const fadeIn = useSharedValue(1);
  const scale = useSharedValue(1);
  const progress = useSharedValue(currentStep);
  const imageScale = useSharedValue(1);

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
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx: any) => {
      translateX.value = ctx.startX + event.translationX;
      const swipeProgress = currentStep - event.translationX / width;
      progress.value = Math.max(0, Math.min(steps.length - 1, swipeProgress));
      const scaleValue = interpolate(
        Math.abs(event.translationX),
        [0, width / 2],
        [1, 0.8],
        'clamp'
      );
      imageScale.value = scaleValue;
    },
    onEnd: (event) => {
      let nextStep = currentStep;
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD || Math.abs(event.velocityX) > 500) {
        if (event.translationX > 0 && currentStep > 0) {
          nextStep = currentStep - 1;
          translateX.value = withTiming(width, { duration: 300 }, () => {
            runOnJS(setCurrentStep)(nextStep);
          });
        } else if (event.translationX < 0 && currentStep < steps.length - 1) {
          nextStep = currentStep + 1;
          translateX.value = withTiming(-width, { duration: 300 }, () => {
            runOnJS(setCurrentStep)(nextStep);
          });
        } else {
          translateX.value = withSpring(0, { damping: 15 });
          imageScale.value = withSpring(1, { damping: 15 });
        }
      } else {
        translateX.value = withSpring(0, { damping: 15 });
        imageScale.value = withSpring(1, { damping: 15 });
      }
    },
  });

  const contentStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(
      progress.value,
      [0, steps.length - 1],
      [0.8, 1],
      'clamp'
    );
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scaleValue },
      ],
      opacity: fadeIn.value,
      backgroundColor: Colors.palette.purpleDark,
      borderRadius: 24,
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: imageScale.value },
      ],
      backgroundColor: Colors.palette.purple,
      borderRadius: 16,
    };
  });

  const dotStyle = (index: number) => useAnimatedStyle(() => {
    const dotProgress = interpolate(
      progress.value,
      [index - 1, index, index + 1],
      [0.3, 1, 0.3],
      'clamp'
    );
    return {
      opacity: dotProgress,
      transform: [{ scale: interpolate(dotProgress, [0.3, 1], [0.8, 1.2], 'clamp') }],
      backgroundColor: dotProgress > 0.9 ? Colors.palette.green : Colors.palette.white,
    };
  });

  useEffect(() => {
    progress.value = currentStep;
    animateStep();
  }, [currentStep]);

  console.log("Step =? ", steps[currentStep].image);
  return (
    <View style={[styles.container, { backgroundColor: Colors.palette.purpleDark }] }>
      <View style={styles.content}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.contentContainer, contentStyle]}>
            <Animated.View style={[styles.imageContainer, imageStyle]}>
              <Image
                source={steps[currentStep].image}
                style={styles.image}
                resizeMode="contain"
              />
            </Animated.View>
            <Text style={[styles.title, { color: Colors.palette.white }]}>{steps[currentStep].title}</Text>
            <Text style={[styles.description, { color: Colors.palette.grayLight }]}>{steps[currentStep].description}</Text>
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
            style={[styles.button, styles.skipButton, { backgroundColor: Colors.palette.purpleLight }]}
            onPress={handleSkip}
          >
            <Text style={[styles.buttonText, { color: Colors.palette.white }]}>Pular</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.nextButton, { backgroundColor: Colors.palette.green }]}
            onPress={isLastStep ? handleSkip : handleNext}
          >
            <Text style={[styles.buttonText, { color: Colors.palette.white }]}>
              {isLastStep ? 'Continuar' : 'Próximo'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingView;