import React, { useState } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import SlotCard from '../components/SlotCard';

const slotData = [
  { id: 1, location: 'Slot A - Near Entrance', mapsUrl: 'https://www.google.com/maps?q=6.9271,79.8612' },
  { id: 2, location: 'Slot B - Level 2', mapsUrl: 'https://www.google.com/maps?q=6.9281,79.8622' },
];

export default function HomeScreen({ navigation }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Select a Parking Slot</Text>
      {slotData.map((slot) => (
        <SlotCard
          key={slot.id}
          slot={slot}
          isSelected={selectedSlot === slot.id}
          onSelect={() => setSelectedSlot(slot.id)}
        />
      ))}
      {selectedSlot && (
        <>
          <Button
            mode="contained"
            style={{ marginTop: 20 }}
            onPress={() => Linking.openURL(slotData.find(s => s.id === selectedSlot).mapsUrl)}
          >
            Open in Google Maps
          </Button>
          <Button
            mode="outlined"
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate('AR Navigation')}
          >
            Start AR Navigation
          </Button>
        </>
      )}
    </ScrollView>
  );
}
