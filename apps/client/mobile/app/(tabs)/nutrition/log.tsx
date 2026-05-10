import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { searchFood, logMeal } from '../../lib/api';
import { router } from 'expo-router';
import { commonStyles as styles } from '../../styles';

export default function LogMealScreen() {
  const [query, setQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);

  const handleSearch = async () => {
    const results = await searchFood(query);
    setFoods(results);
  };

  const addFood = (food) => {
    setSelectedFoods([...selectedFoods, { ...food, portion: 1 }]);
  };

  const updatePortion = (index, portion) => {
    const updated = [...selectedFoods];
    updated[index].portion = portion;
    setSelectedFoods(updated);
  };

  const handleLog = async () => {
    await logMeal(1); // Mock meal id
    Alert.alert('Logged', 'Meal logged successfully!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Meal</Text>
      <TextInput
        style={styles.input}
        placeholder="Search food"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.foodItem} onPress={() => addFood(item)}>
            <Text>{item.name} - {item.calories} cal</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.subtitle}>Selected Foods</Text>
      {selectedFoods.map((food, index) => (
        <View key={index} style={styles.selectedItem}>
          <Text>{food.name}</Text>
          <TextInput
            style={styles.portionInput}
            placeholder="Portion"
            value={food.portion.toString()}
            onChangeText={(v) => updatePortion(index, parseFloat(v))}
            keyboardType="numeric"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleLog}>
        <Text style={styles.buttonText}>Log Meal</Text>
      </TouchableOpacity>
    </View>
  );
}