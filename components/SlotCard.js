import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Linking, Alert } from 'react-native';
import { Text, IconButton, Button } from 'react-native-paper';

const GG = () => {
  // Create animated values
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);
  const moveAnim = new Animated.Value(-100);
  const buttonFadeAnim = new Animated.Value(0);

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
    ]).start(() => {
      // Animate button after main animations complete
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  // Function to open gallery
  const openGallery = async () => {
    try {
      // For Android - opens gallery
      const url = 'content://media/internal/images/media';
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        // Alternative method for opening gallery
        const galleryUrl = 'photos-redirect://';
        const gallerySupported = await Linking.canOpenURL(galleryUrl);
        
        if (gallerySupported) {
          await Linking.openURL(galleryUrl);
        } else {
          Alert.alert('Error', 'Cannot open gallery app');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open gallery');
    }
  };

  // Function to open camera
  const openCamera = async () => {
    try {
      const cameraUrl = 'camera://';
      const supported = await Linking.canOpenURL(cameraUrl);
      
      if (supported) {
        await Linking.openURL(cameraUrl);
      } else {
        Alert.alert('Error', 'Cannot open camera app');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  // Function to open maps
  const openMaps = async () => {
    try {
      const mapsUrl = 'geo:0,0?q=parks+near+me';
      const supported = await Linking.canOpenURL(mapsUrl);
      
      if (supported) {
        await Linking.openURL(mapsUrl);
      } else {
        // Fallback to Google Maps web
        const webMapsUrl = 'https://maps.google.com/?q=parks+near+me';
        await Linking.openURL(webMapsUrl);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open maps');
    }
  };

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
        
        {/* Animated buttons container */}
        <Animated.View style={[styles.buttonsContainer, { opacity: buttonFadeAnim }]}>
          <Button
            mode="contained"
            onPress={openGallery}
            style={[styles.button, styles.galleryButton]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            icon="image-multiple"
          >
            Open Gallery
          </Button>
          
          <Button
            mode="outlined"
            onPress={openCamera}
            style={[styles.button, styles.cameraButton]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.cameraButtonLabel}
            icon="camera"
          >
            Open Camera
          </Button>
          
          <Button
            mode="outlined"
            onPress={openMaps}
            style={[styles.button, styles.mapsButton]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.mapsButtonLabel}
            icon="map"
          >
            Find Parks
          </Button>
        </Animated.View>
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
    marginBottom: 30,
  },
  icon: {
    margin: 20,
    backgroundColor: '#e8f5e9',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    marginVertical: 8,
    width: '80%',
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  galleryButton: {
    backgroundColor: '#2e7d32',
  },
  cameraButton: {
    borderColor: '#ff6b35',
    borderWidth: 2,
  },
  cameraButtonLabel: {
    color: '#ff6b35',
    fontSize: 16,
    fontWeight: '600',
  },
  mapsButton: {
    borderColor: '#1976d2',
    borderWidth: 2,
  },
  mapsButtonLabel: {
    color: '#1976d2',
    fontSize: 16,
    fontWeight: '600',
  },
});