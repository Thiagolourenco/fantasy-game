import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RankingView, LineupView } from '../../views';

export type PrivateStackParamList = {
  Ranking: undefined;
  Lineup: undefined;
};

const Stack = createNativeStackNavigator<PrivateStackParamList>();


export default function PrivateNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Ranking" 
        component={RankingView} 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Lineup" 
        component={LineupView} 
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
} 