import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { login } from '@livfit/lib';
import { router } from 'expo-router';
import { commonStyles as styles } from '../../styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      if (result.success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <View style={{ paddingHorizontal: 8 }}>
        <Text style={[styles.title, { textAlign: 'left', fontSize: 28 }]}>Welcome Back</Text>
        <Text style={[styles.description, { textAlign: 'left', marginBottom: 32 }]}>Sign in to continue your progress.</Text>
        
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="name@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={[styles.button, { marginTop: 16 }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push('/(auth)/signup')} style={{ marginTop: 16 }}>
          <Text style={{ textAlign: 'center', color: '#8E8E93' }}>
            Don't have an account? <Text style={{ color: '#2D5AF0', fontWeight: '600' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'OTP reset is being implemented.')} style={{ marginTop: 24 }}>
          <Text style={{ textAlign: 'center', color: '#8E8E93', fontSize: 13 }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}