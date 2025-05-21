import React from 'react';
import { Card, Text, Button } from 'react-native-paper';

export default function SlotCard({ slot, isSelected, onSelect }) {
  return (
    <Card style={{ marginBottom: 10, backgroundColor: isSelected ? '#e3f2fd' : 'white' }}>
      <Card.Content>
        <Text variant="titleMedium">{slot.location}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onSelect}>{isSelected ? 'Selected' : 'Select'}</Button>
      </Card.Actions>
    </Card>
  );
}
