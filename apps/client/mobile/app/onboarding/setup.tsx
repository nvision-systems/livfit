import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { calculateMELD } from '@livfit/lib';
import { commonStyles } from '../../styles';

export default function SetupScreen() {
  const [form, setForm] = useState({
    age: '',
    gender: 'male',
    ethnicity: '',
    diagnosis: '',
    creatinine: '1.0',
    bilirubin: '1.0',
    inr: '1.0',
  });

  const [meldScore, setMeldScore] = useState<number | null>(null);

  const handleCalculateMELD = () => {
    const score = calculateMELD({
      creatinine: parseFloat(form.creatinine),
      bilirubin: parseFloat(form.bilirubin),
      inr: parseFloat(form.inr),
    });
    setMeldScore(score);
  };

  const handleSave = () => {
    if (!form.age || !form.diagnosis) {
      Alert.alert('Required Fields', 'Please fill in your age and diagnosis.');
      return;
    }
    // Logic to save to API would go here
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={commonStyles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={localStyles.sectionTitle}>General Information</Text>
      
      <View style={localStyles.inputGroup}>
        <Text style={localStyles.label}>Age</Text>
        <TextInput 
          style={commonStyles.input} 
          value={form.age} 
          onChangeText={(v) => setForm({...form, age: v})} 
          keyboardType="numeric"
          placeholder="e.g. 45"
        />
      </View>

      <View style={localStyles.inputGroup}>
        <Text style={localStyles.label}>Gender</Text>
        <View style={localStyles.row}>
          {['male', 'female', 'other'].map((g) => (
            <TouchableOpacity 
              key={g} 
              style={[localStyles.choiceChip, form.gender === g && localStyles.activeChip]}
              onPress={() => setForm({...form, gender: g})}
            >
              <Text style={[localStyles.chipText, form.gender === g && localStyles.activeChipText]}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={localStyles.inputGroup}>
        <Text style={localStyles.label}>Diagnosis</Text>
        <TextInput 
          style={commonStyles.input} 
          value={form.diagnosis} 
          onChangeText={(v) => setForm({...form, diagnosis: v})} 
          placeholder="e.g. Chronic Liver Disease"
        />
      </View>

      <View style={localStyles.separator} />

      <Text style={localStyles.sectionTitle}>MELD Score Calculator</Text>
      <Text style={localStyles.description}>Enter your latest lab results to calculate your MELD score.</Text>

      <View style={localStyles.row}>
        <View style={[localStyles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={localStyles.label}>Creatinine (mg/dL)</Text>
          <TextInput 
            style={commonStyles.input} 
            value={form.creatinine} 
            onChangeText={(v) => setForm({...form, creatinine: v})} 
            keyboardType="numeric"
          />
        </View>
        <View style={[localStyles.inputGroup, { flex: 1 }]}>
          <Text style={localStyles.label}>Bilirubin (mg/dL)</Text>
          <TextInput 
            style={commonStyles.input} 
            value={form.bilirubin} 
            onChangeText={(v) => setForm({...form, bilirubin: v})} 
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={localStyles.inputGroup}>
        <Text style={localStyles.label}>INR</Text>
        <TextInput 
          style={commonStyles.input} 
          value={form.inr} 
          onChangeText={(v) => setForm({...form, inr: v})} 
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={localStyles.calcButton} onPress={handleCalculateMELD}>
        <Text style={localStyles.calcButtonText}>Calculate MELD</Text>
      </TouchableOpacity>

      {meldScore !== null && (
        <View style={localStyles.resultCard}>
          <Text style={localStyles.resultLabel}>Your MELD Score</Text>
          <Text style={localStyles.resultValue}>{meldScore}</Text>
        </View>
      )}

      <TouchableOpacity style={[commonStyles.button, { marginTop: 24 }]} onPress={handleSave}>
        <Text style={commonStyles.buttonText}>Complete Setup</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  choiceChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginRight: 8,
    backgroundColor: '#F2F2F7',
  },
  activeChip: {
    backgroundColor: '#2D5AF0',
    borderColor: '#2D5AF0',
  },
  chipText: {
    color: '#1C1C1E',
    fontWeight: '500',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 24,
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  calcButton: {
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D5AF0',
  },
  calcButtonText: {
    color: '#2D5AF0',
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#F2F2F7',
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#2D5AF0',
  },
  resultLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginTop: 4,
  }
});
