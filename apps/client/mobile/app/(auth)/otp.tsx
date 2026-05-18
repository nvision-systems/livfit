import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { verifyOTP } from '@livfit/lib';
import { router } from 'expo-router';
import { commonStyles as styles } from '../../styles';

export default function OTPScreen() {
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    try {
      const result = await verifyOTP(otp);
      if (result.success) {
        router.replace('/');
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Verification failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to your phone/email</Text>
      <TextInput
        style={styles.inputCentered}
        placeholder="000000"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}