import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import OnboardingView from '../../views/onboarding/onboardingVIew';

// Define your public screen params here
export type PublicStackParamList = {
  Onboarding: undefined; // Example
};

const Stack = createNativeStackNavigator<PublicStackParamList>();

export default function PublicNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingView} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
} 