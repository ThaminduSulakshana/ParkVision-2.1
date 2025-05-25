import React, { useState } from 'react';
import { 
  Button, 
  Platform, 
  View, 
  Alert, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions 
} from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

const { width, height } = Dimensions.get('window');

export default function ARScreen() {
  const [scaleValue] = useState(new Animated.Value(1));
  const [isPressed, setIsPressed] = useState(false);

  const openUnityApp = async () => {
    const packageName = 'com.DefaultCompany.ARNav'; // 👈 your actual package name
    const className = 'com.unity3d.player.UnityPlayerActivity'; // 👈 Unity default main activity

    if (Platform.OS === 'android') {
      try {
        await IntentLauncher.startActivityAsync('android.intent.action.MAIN', {
          packageName,
          className,
        });
      } catch (error) {
        Alert.alert('Error', 'Unity AR app is not installed or failed to launch.');
        console.log(error);
      }
    } else {
      Alert.alert('Unsupported Platform', 'This feature is only available on Android.');
    }
  };

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient Effect */}
      <View style={styles.backgroundGradient} />
      
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>ParkVision</Text>
        <Text style={styles.appSubtitle}>AR Navigation Experience</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* AR Icon Placeholder */}
        <View style={styles.arIconContainer}>
          <View style={styles.arIcon}>
            <Text style={styles.arIconText}>AR</Text>
          </View>
          <View style={styles.arIconRing} />
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>How it works:</Text>
          <View style={styles.instructionItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.instructionText}>Point your camera at the park area</Text>
          </View>
          <View style={styles.instructionItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.instructionText}>AR markers will guide your navigation</Text>
          </View>
          <View style={styles.instructionItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.instructionText}>Follow the virtual path to your destination</Text>
          </View>
        </View>

        {/* Interactive AR Button */}
        <Animated.View 
          style={[
            styles.buttonContainer,
            { transform: [{ scale: scaleValue }] }
          ]}
        >
          <TouchableOpacity
            style={[
              styles.arButton,
              isPressed && styles.arButtonPressed
            ]}
            onPress={openUnityApp}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <Text style={styles.arButtonText}>🚀 Launch AR Navigation</Text>
            <Text style={styles.arButtonSubtext}>Tap to start your journey</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Status Info */}
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>AR Ready</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: Platform.OS === 'android' ? '#4CAF50' : '#FF5722' }]} />
            <Text style={styles.statusText}>
              {Platform.OS === 'android' ? 'Android Compatible' : 'iOS Not Supported'}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Experience immersive park navigation</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4df9',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A1F0A',
    opacity: 0.9,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#4CAF50',
    textAlign: 'center',
    textShadowColor: 'rgba(76, 175, 80, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#81C784',
    marginTop: 5,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arIconContainer: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  arIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  arIconText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  arIconRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4CAF50',
    opacity: 0.3,
  },
  instructionsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: '#C8E6C9',
    lineHeight: 22,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  arButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    minWidth: width * 0.7,
  },
  arButtonPressed: {
    backgroundColor: '#2E7D32',
  },
  arButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  arButtonSubtext: {
    fontSize: 14,
    color: '#C8E6C9',
    opacity: 0.9,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#81C784',
  },
  footer: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#558B2F',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});