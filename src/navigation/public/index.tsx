import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import OnboardingView from '../../views/onboarding/onboardingVIew';

export type PublicStackParamList = {
  Onboarding: undefined;
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