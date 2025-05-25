import React from 'react';
import { Button, Platform, View, Alert } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

export default function ARScreen() {
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open AR Navigation" onPress={openUnityApp} />
    </View>
  );
}
