import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { signup } from '@livfit/lib';
import { router } from 'expo-router';
import { commonStyles as styles } from '../../styles';

export default function SignupScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    ethnicity: '',
    diagnosis: '',
  });

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    try {
      const result = await signup(form);
      if (result.success) {
        router.push('/(auth)/otp');
      } else {
        Alert.alert('Error', 'Signup failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Signup failed');
    }
  };

  const updateForm = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', flexGrow: 1, paddingVertical: 40 }}>
      <View style={{ paddingHorizontal: 8 }}>
        <Text style={[styles.title, { textAlign: 'left', fontSize: 28 }]}>Get Started</Text>
        <Text style={[styles.description, { textAlign: 'left', marginBottom: 32 }]}>Create an account to start your health journey.</Text>
        
        <Text style={localStyles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="John Doe" value={form.name} onChangeText={(v) => updateForm('name', v)} />
        
        <Text style={localStyles.label}>Email Address</Text>
        <TextInput style={styles.input} placeholder="name@example.com" value={form.email} onChangeText={(v) => updateForm('email', v)} keyboardType="email-address" autoCapitalize="none" />
        
        <Text style={localStyles.label}>Phone Number</Text>
        <TextInput style={styles.input} placeholder="+1 (555) 000-0000" value={form.phone} onChangeText={(v) => updateForm('phone', v)} keyboardType="phone-pad" />
        
        <Text style={localStyles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Min. 8 characters" value={form.password} onChangeText={(v) => updateForm('password', v)} secureTextEntry />
        
        <TouchableOpacity style={[styles.button, { marginTop: 16 }]} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
          <Text style={{ color: '#8E8E93' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={{ color: '#2D5AF0', fontWeight: '600' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
    marginLeft: 4,
  }
});