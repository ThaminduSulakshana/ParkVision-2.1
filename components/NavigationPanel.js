import React, { useState } from 'react';
import { View, Linking, StyleSheet } from 'react-native';
import { Button, Text, RadioButton } from 'react-native-paper';

const NavigationPanel = () => {
  const [selectedSlot, setSelectedSlot] = useState('');

  const openGoogleMaps = () => {
    const url = 'https://www.google.com/maps/dir/?api=1&destination=Colombo+Fort'; // Change as needed
    Linking.openURL(url);
  };

  const openARNavigation = () => {
    alert('AR Navigation starting... (placeholder)');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>ParkVision-nav</Text>
      <Text>Select a Parking Slot:</Text>
      <RadioButton.Group onValueChange={setSelectedSlot} value={selectedSlot}>
        <View style={styles.slotOption}>
          <RadioButton value="Slot A" />
          <Text>Slot A</Text>
        </View>
        <View style={styles.slotOption}>
          <RadioButton value="Slot B" />
          <Text>Slot B</Text>
        </View>
        <View style={styles.slotOption}>
          <RadioButton value="Slot C" />
          <Text>Slot C</Text>
        </View>
      </RadioButton.Group>

      <Button mode="contained" style={styles.button} onPress={openGoogleMaps}>
        Open Google Maps
      </Button>

      <Button mode="contained-tonal" style={styles.button} onPress={openARNavigation}>
        Start AR Navigation
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  slotOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
  },
});

export default NavigationPanel;
