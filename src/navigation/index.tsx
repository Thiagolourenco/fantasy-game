import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PublicNavigator from './public';
import PrivateNavigator from './private';

export type RootStackParamList = {
  Public: undefined;
  Private: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isAuthenticated = false; // Replace with actual auth logic

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Private" component={PrivateNavigator} />
        ) : (
          <Stack.Screen name="Public" component={PublicNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 