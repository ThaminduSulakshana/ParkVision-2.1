import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ARScreen from './screens/ARScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Parking Slots" component={HomeScreen} />
        <Stack.Screen name="AR Navigation" component={ARScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
