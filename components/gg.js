import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Alert, Platform, PermissionsAndroid } from 'react-native';
import { Text, IconButton, Button } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Linking } from 'react-native';

const GG = () => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);
  const moveAnim = new Animated.Value(-100);
  const buttonFadeAnim = new Animated.Value(0);

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
      })
    ]).start(() => {
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  // Request Camera Permission
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'ParkVisions needs camera permission to take photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Camera permission error:', err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  // Request Storage Permission
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'ParkVisions needs storage permission to access your photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Storage permission error:', err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  const openGallery = async () => {
    try {
      // Request permission first
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Please grant storage permission to access gallery',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => Linking.openSettings() }
          ]
        );
        return;
      }

      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8,
      };

      launchImageLibrary(options, (response) => {
        console.log('Gallery Response:', response);
        
        if (response.didCancel) {
          console.log('User cancelled gallery picker');
        } else if (response.errorCode) {
          console.log('Gallery Error Code:', response.errorCode);
          console.log('Gallery Error Message:', response.errorMessage);
          Alert.alert('Gallery Error', response.errorMessage || 'Failed to open gallery');
        } else if (response.errorMessage) {
          console.log('Gallery Error:', response.errorMessage);
          Alert.alert('Gallery Error', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          console.log('Selected Image:', response.assets[0]);
          Alert.alert('Success', 'Image selected successfully!');
          // Handle the selected image here
          // You can access image data via response.assets[0].uri
        } else {
          console.log('No image selected');
        }
      });
    } catch (error) {
      console.error('Gallery opening error:', error);
      Alert.alert('Error', 'An unexpected error occurred while opening gallery');
    }
  };

  const openCamera = async () => {
    try {
      // Request permission first
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Please grant camera permission to take photos',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => Linking.openSettings() }
          ]
        );
        return;
      }

      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8,
        saveToPhotos: true,
        cameraType: 'back',
      };

      launchCamera(options, (response) => {
        console.log('Camera Response:', response);
        
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error Code:', response.errorCode);
          console.log('Camera Error Message:', response.errorMessage);
          Alert.alert('Camera Error', response.errorMessage || 'Failed to open camera');
        } else if (response.errorMessage) {
          console.log('Camera Error:', response.errorMessage);
          Alert.alert('Camera Error', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          console.log('Captured Image:', response.assets[0]);
          Alert.alert('Success', 'Photo captured successfully!');
          // Handle the captured image here
          // You can access image data via response.assets[0].uri
        } else {
          console.log('No photo captured');
        }
      });
    } catch (error) {
      console.error('Camera opening error:', error);
      Alert.alert('Error', 'An unexpected error occurred while opening camera');
    }
  };

  const openMaps = async () => {
    try {
      const mapsUrl = Platform.OS === 'ios' 
        ? 'maps://app?q=parks+near+me'
        : 'geo:0,0?q=parks+near+me';
      
      const supported = await Linking.canOpenURL(mapsUrl);

      if (supported) {
        await Linking.openURL(mapsUrl);
      } else {
        const fallbackUrl = 'https://maps.google.com/?q=parks+near+me';
        await Linking.openURL(fallbackUrl);
      }
    } catch (error) {
      console.error('Maps opening error:', error);
      Alert.alert('Error', 'Failed to open maps');
    }
  };

  const openSteam = async () => {
    try {
      const steamUrl = 'steam://';
      const fallbackUrl = 'https://store.steampowered.com/';

      const supported = await Linking.canOpenURL(steamUrl);
      if (supported) {
        await Linking.openURL(steamUrl);
      } else {
        await Linking.openURL(fallbackUrl);
      }
    } catch (error) {
      console.error('Steam opening error:', error);
      Alert.alert('Error', 'Failed to open Steam');
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

        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          <IconButton icon="pine-tree" size={80} iconColor="#2e7d32" style={styles.icon} />
        </Animated.View>

        <Text style={styles.subtitle}>Discover ssssand explore parks near you</Text>

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

          <Button
            mode="outlined"
            onPress={openSteam}
            style={[styles.button, styles.steamButton]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.steamButtonLabel}
            icon="steam"
          >
            Open Steam
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
    color: '#fff',
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
  },
  mapsButton: {
    borderColor: '#1976d2',
    borderWidth: 2,
  },
  mapsButtonLabel: {
    color: '#1976d2',
  },
  steamButton: {
    borderColor: '#171a21',
    borderWidth: 2,
  },
  steamButtonLabel: {
    color: '#171a21',
  },
});