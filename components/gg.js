// components/gg.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const GG = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Welcome to GG Screen!</Text>
    </View>
    
  );
};

export default GG;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
