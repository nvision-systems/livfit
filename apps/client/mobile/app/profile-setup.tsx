import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { ChevronRight, ChevronLeft, User, Stethoscope, Activity, Target, CheckCircle } from 'lucide-react-native';

const STEPS = [
  { id: 1, title: 'Personal', icon: User },
  { id: 2, title: 'Clinical', icon: Stethoscope },
  { id: 3, title: 'Initial Labs', icon: Activity },
  { id: 4, title: 'Goals', icon: Target },
];

export default function ProfileSetup() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    diagnosis: '',
    symptoms: '',
    bilirubin: '',
    creatinine: '',
    inr: '',
    weightGoal: '',
    fluidGoal: '2.0',
  });

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else handleComplete();
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    // Logic to save to Supabase
    router.replace('/(tabs)');
  };

  const renderStepIndicator = () => (
    <View style={styles.stepContainer}>
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        return (
          <React.Fragment key={step.id}>
            <View style={[styles.stepCircle, isActive && styles.stepCircleActive, isCompleted && styles.stepCircleCompleted]}>
              {isCompleted ? <CheckCircle color="#FFFFFF" size={16} /> : <Icon color={isActive ? COLORS.card : COLORS.textSecondary} size={16} />}
            </View>
            {index < STEPS.length - 1 && <View style={[styles.stepLine, isCompleted && styles.stepLineActive]} />}
          </React.Fragment>
        );
      })}
    </View>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Tell us about yourself</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                value={formData.fullName}
                onChangeText={(v) => setFormData({ ...formData, fullName: v })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={formData.dob}
                onChangeText={(v) => setFormData({ ...formData, dob: v })}
              />
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Medical History</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Primary Diagnosis</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. NAFLD, Liver Cirrhosis"
                value={formData.diagnosis}
                onChangeText={(v) => setFormData({ ...formData, diagnosis: v })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Known Symptoms</Text>
              <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Fatigue, jaundice, swelling..."
                multiline
                value={formData.symptoms}
                onChangeText={(v) => setFormData({ ...formData, symptoms: v })}
              />
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Initial Lab Values</Text>
            <Text style={styles.sectionDesc}>Used to calculate your baseline MELD score.</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bilirubin (mg/dL)</Text>
              <TextInput
                style={styles.input}
                placeholder="1.2"
                keyboardType="decimal-pad"
                value={formData.bilirubin}
                onChangeText={(v) => setFormData({ ...formData, bilirubin: v })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Creatinine (mg/dL)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.9"
                keyboardType="decimal-pad"
                value={formData.creatinine}
                onChangeText={(v) => setFormData({ ...formData, creatinine: v })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>INR</Text>
              <TextInput
                style={styles.input}
                placeholder="1.1"
                keyboardType="decimal-pad"
                value={formData.inr}
                onChangeText={(v) => setFormData({ ...formData, inr: v })}
              />
            </View>
          </View>
        );
      case 4:
        return (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Set Your Goals</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Target Weight (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 75"
                keyboardType="decimal-pad"
                value={formData.weightGoal}
                onChangeText={(v) => setFormData({ ...formData, weightGoal: v })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Daily Fluid Intake (Liters)</Text>
              <TextInput
                style={styles.input}
                placeholder="2.0"
                keyboardType="decimal-pad"
                value={formData.fluidGoal}
                onChangeText={(v) => setFormData({ ...formData, fluidGoal: v })}
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.subtitle}>Help us tailor your clinical plan.</Text>
          </View>

          {renderStepIndicator()}

          <View style={styles.card}>
            {renderContent()}
          </View>

          <View style={styles.footer}>
            {currentStep > 1 && (
              <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                <ChevronLeft color={COLORS.textPrimary} size={20} />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.nextText}>{currentStep === 4 ? 'Finish Setup' : 'Continue'}</Text>
              <ChevronRight color={COLORS.card} size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingTop: 40,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stepCircleCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: COLORS.success,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: SPACING.xl,
    borderRadius: RADIUS.xxl,
    ...SHADOWS.medium,
    minHeight: 350,
  },
  formSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  sectionDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.subtle,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: RADIUS.xl,
    marginLeft: 'auto',
  },
  nextText: {
    color: COLORS.card,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginLeft: 4,
  }
});
