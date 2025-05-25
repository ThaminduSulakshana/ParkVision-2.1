import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Alert, Linking } from 'react-native';
import { Text, IconButton, Button } from 'react-native-paper';

const ARNavigationWelcome = () => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);
  const moveAnim = new Animated.Value(-100);
  const buttonFadeAnim = new Animated.Value(0);
  const cardFadeAnim = new Animated.Value(0);

  useEffect(() => {
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
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(cardFadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(buttonFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  // Function to start AR navigation
  const startARNavigation = async () => {
    const appURL = 'arnavi://';

    const supported = await Linking.canOpenURL(appURL);

    if (supported) {
      Linking.openURL(appURL);
    } else {
      Alert.alert(
        'ARnavi Not Found',
        'Make sure the ARnavi Unity app is installed on this device.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: moveAnim },
            ],
          },
        ]}
      >
        <Text variant="headlineLarge" style={styles.title}>AR Park Navigation</Text>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <IconButton
            icon="augmented-reality"
            size={100}
            iconColor="#1976d2"
            style={styles.arIcon}
          />
        </Animated.View>
        <Text style={styles.subtitle}>Navigate parks with Augmented Reality</Text>
      </Animated.View>

      <Animated.View style={[styles.buttonsContainer, { opacity: buttonFadeAnim }]}>
        <Button
          mode="contained"
          onPress={startARNavigation}
          style={[styles.button, styles.primaryButton]}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          icon="augmented-reality"
        >
          Start AR Navigation
        </Button>
      </Animated.View>
    </View>
  );
};

export default ARNavigationWelcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976d2',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  arIcon: {
    margin: 20,
    backgroundColor: '#e3f2fd',
  },
  buttonsContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 6,
    borderRadius: 25,
    width: '80%',
  },
  primaryButton: {
    backgroundColor: '#1976d2',
    elevation: 3,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
