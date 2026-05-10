import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { calculateMELD } from '@livfit/lib';
import { ChevronLeft, Info, Activity, Save } from 'lucide-react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export default function MeldCalculator() {
  const router = useRouter();
  const [bilirubin, setBilirubin] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [inr, setInr] = useState('');
  const [score, setScore] = useState<number | null>(null);

  const handleCalculate = () => {
    const bil = parseFloat(bilirubin);
    const cre = parseFloat(creatinine);
    const i = parseFloat(inr);

    if (isNaN(bil) || isNaN(cre) || isNaN(i)) {
      Alert.alert('Invalid Input', 'Please enter valid numerical values for all fields.');
      return;
    }

    if (bil <= 0 || cre <= 0 || i <= 0) {
      Alert.alert('Invalid Input', 'Lab values must be greater than zero.');
      return;
    }

    const calculatedScore = calculateMELD({ bilirubin: bil, creatinine: cre, inr: i });
    setScore(calculatedScore);
  };

  const handleSave = () => {
    if (score === null) return;
    Alert.alert('Score Saved', `Your MELD score of ${score} has been updated in your profile.`);
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color={COLORS.textPrimary} size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>MELD Calculator</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.card}>
          <View style={styles.infoBox}>
            <Info color={COLORS.primary} size={20} />
            <Text style={styles.infoText}>
              Enter your latest lab results to calculate your Model for End-Stage Liver Disease (MELD) score.
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Serum Bilirubin (mg/dL)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 1.2"
              keyboardType="decimal-pad"
              value={bilirubin}
              onChangeText={setBilirubin}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Serum Creatinine (mg/dL)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 0.9"
              keyboardType="decimal-pad"
              value={creatinine}
              onChangeText={setCreatinine}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>INR</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 1.1"
              keyboardType="decimal-pad"
              value={inr}
              onChangeText={setInr}
            />
          </View>

          <TouchableOpacity style={styles.calcButton} onPress={handleCalculate}>
            <Activity color={COLORS.card} size={20} style={{ marginRight: SPACING.sm }} />
            <Text style={styles.calcButtonText}>Calculate Score</Text>
          </TouchableOpacity>
        </View>

        {score !== null && (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Calculated MELD Score</Text>
            <Text style={styles.resultValue}>{score}</Text>
            <Text style={styles.resultDesc}>
              {score > 15 ? 'Consult your specialist for a clinical review.' : 'Your condition appears stable according to these labs.'}
            </Text>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Save color={COLORS.card} size={20} style={{ marginRight: SPACING.sm }} />
              <Text style={styles.saveButtonText}>Add to Profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.subtle,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: RADIUS.xxl,
    ...SHADOWS.medium,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.tint,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
    marginLeft: SPACING.md,
    flex: 1,
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.subtle,
    paddingHorizontal: SPACING.md,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  calcButton: {
    backgroundColor: COLORS.textPrimary,
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.sm,
  },
  calcButtonText: {
    color: COLORS.card,
    fontSize: 16,
    fontWeight: '700',
  },
  resultCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.xl,
    borderRadius: RADIUS.xxl,
    marginTop: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.clinical,
    borderWidth: 2,
    borderColor: COLORS.tint,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  resultDesc: {
    fontSize: 14,
    color: '#3A3A3C',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.xl,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: COLORS.card,
    fontSize: 16,
    fontWeight: '700',
  }
});

