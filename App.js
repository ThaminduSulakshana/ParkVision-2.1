import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, Button, Text } from 'react-native-paper';

import NavigationPanel from './components/NavigationPanel';
import GG from './components/gg';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>ParkVision</Text>
      <Button mode="contained" onPress={() => navigation.navigate('NavigationPanel')} style={styles.button}>
        Go to Slot Selection
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('GG')} style={styles.button}>
        Go to GG
      </Button>
    </View>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NavigationPanel" component={NavigationPanel} options={{ title: 'Select Slot' }} />
          <Stack.Screen name="GG" component={GG} options={{ title: 'GG Page' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    width: 200,
  },
});
