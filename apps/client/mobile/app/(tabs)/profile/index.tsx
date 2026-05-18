import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getUser } from '@livfit/lib';
import { router } from 'expo-router';
import { commonStyles as styles } from '../../../styles';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  if (!user) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{user.age}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Weight:</Text>
        <Text style={styles.value}>{user.weight} kg</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Height:</Text>
        <Text style={styles.value}>{user.height} cm</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Goal:</Text>
        <Text style={styles.value}>{user.goal}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/connect')}>
        <Text style={styles.buttonText}>Connect to Dietician</Text>
      </TouchableOpacity>
      {user.isConnectedToDietician && (
        <TouchableOpacity style={styles.button} onPress={() => router.push('/chat')}>
          <Text style={styles.buttonText}>Chat with Dietician</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}