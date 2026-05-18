import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { calculateMELD } from '@livfit/lib';
import { router } from 'expo-router';
import { commonStyles as styles } from '../../../styles';

export default function WorkoutSetupScreen() {
  const [form, setForm] = useState({
    gender: '',
    age: '',
    ethnicity: '',
    diagnosis: '',
    bilirubin: '',
    inr: '',
    creatinine: '',
  });
  const [meldScore, setMeldScore] = useState<number | null>(null);

  const updateForm = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleCalculateMELD = async () => {
    const { bilirubin, inr, creatinine } = form;
    if (!bilirubin || !inr || !creatinine) {
      Alert.alert('Error', 'Please fill all MELD fields');
      return;
    }
    const score = calculateMELD({
      bilirubin: parseFloat(bilirubin),
      inr: parseFloat(inr),
      creatinine: parseFloat(creatinine),
    });
    setMeldScore(score);
  };

  const handleSave = () => {
    // Save setup
    Alert.alert('Success', 'Setup saved');
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout Setup</Text>
      <TextInput style={styles.input} placeholder="Gender" value={form.gender} onChangeText={(v) => updateForm('gender', v)} />
      <TextInput style={styles.input} placeholder="Age" value={form.age} onChangeText={(v) => updateForm('age', v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Ethnicity" value={form.ethnicity} onChangeText={(v) => updateForm('ethnicity', v)} />
      <TextInput style={styles.input} placeholder="Diagnosis" value={form.diagnosis} onChangeText={(v) => updateForm('diagnosis', v)} />
      <Text style={styles.subtitle}>MELD Score Calculation</Text>
      <TextInput style={styles.input} placeholder="Bilirubin" value={form.bilirubin} onChangeText={(v) => updateForm('bilirubin', v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="INR" value={form.inr} onChangeText={(v) => updateForm('inr', v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Creatinine" value={form.creatinine} onChangeText={(v) => updateForm('creatinine', v)} keyboardType="numeric" />
      <TouchableOpacity style={styles.button} onPress={handleCalculateMELD}>
        <Text style={styles.buttonText}>Calculate MELD</Text>
      </TouchableOpacity>
      {meldScore !== null && <Text style={styles.score}>MELD Score: {meldScore}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Setup</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}