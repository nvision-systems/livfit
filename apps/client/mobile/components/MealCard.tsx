import React from 'react';
import { View, Text } from 'react-native';
import { mealCardStyles as styles } from '../styles';

interface MealCardProps {
  name: string;
  calories: number;
  items: string[];
}

export default function MealCard({ name, calories, items }: MealCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.calories}>{calories} calories</Text>
      <Text style={styles.items}>{items.join(', ')}</Text>
    </View>
  );
}