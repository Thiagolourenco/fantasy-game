import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PublicNavigator from './public';
import PrivateNavigator from './private';
import { useOnboardingStore } from '../store/onboarding.store';

export type RootStackParamList = {
  Public: undefined;
  Private: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isCompleted, isLoading, checkOnboardingStatus } = useOnboardingStore();

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return null; // ou um componente de loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isCompleted ? (
          <Stack.Screen name="Private" component={PrivateNavigator} />
        ) : (
          <Stack.Screen name="Public" component={PublicNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 