import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { requestDieticianConnection } from '../../lib/api';
import { router } from 'expo-router';
import { commonStyles as styles } from '../../styles';

export default function ConnectScreen() {
  const handleRequest = async () => {
    await requestDieticianConnection();
    Alert.alert('Requested', 'Connection request sent to admin.');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect to Dietician</Text>
      <Text style={styles.description}>
        Request to connect with a dietician. Admin will assign one, then you can chat and receive personalized diet plans.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleRequest}>
        <Text style={styles.buttonText}>Request Connection</Text>
      </TouchableOpacity>
    </View>
  );
}