import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

const GG = () => {
  // Create animated values
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);
  const moveAnim = new Animated.Value(-100);
  
  useEffect(() => {
    // Run animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: moveAnim }
            ]
          }
        ]}
      >
        <Text variant="headlineMedium" style={styles.title}>Welcome to ParkVisions!</Text>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <IconButton
            icon="pine-tree"
            size={80}
            iconColor="#2e7d32"
            style={styles.icon}
          />
        </Animated.View>
        <Text style={styles.subtitle}>Discover and explore parks near you</Text>
      </Animated.View>
    </View>
  );
};

export default GG;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  animatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2e7d32',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 15,
    textAlign: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  icon: {
    margin: 20,
    backgroundColor: '#e8f5e9',
  }
});