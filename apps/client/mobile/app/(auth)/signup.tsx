import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { signup } from '@livfit/lib';
import { useRouter } from 'expo-router';
import { 
  Heart, ArrowRight, User, Mail, Lock, Check,
  Target, Activity, ChevronRight, ChevronLeft
} from 'lucide-react-native';

export default function SignupScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    goal: ''
  });

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.password)) {
      Alert.alert('Required', 'Please fill in all basic information');
      return;
    }
    setStep(step + 1);
  };

  const handleSignup = async () => {
    if (!formData.goal) {
      Alert.alert('Selection Required', 'Please select a health goal to continue');
      return;
    }
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
        router.replace('/(tabs)');
      }, 2000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Signup failed');
    }
  };

  const goals = [
    { id: 'liver', title: 'Liver Recovery', icon: Heart, color: '#FF3B30' },
    { id: 'weight', title: 'Weight Control', icon: Target, color: '#2D5AF0' },
    { id: 'strength', title: 'Build Strength', icon: Activity, color: '#34C759' }
  ];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : router.back()} style={styles.backBtn}>
              <ChevronLeft color="#1C1C1E" size={24} />
            </TouchableOpacity>
            <View style={styles.stepper}>
              <View style={[styles.stepDot, step >= 1 && styles.stepActive]} />
              <View style={[styles.stepLine, step >= 2 && styles.stepActive]} />
              <View style={[styles.stepDot, step >= 2 && styles.stepActive]} />
            </View>
          </View>

          {step === 1 ? (
            <View style={styles.content}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join LivFit and start your health journey today.</Text>

              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={styles.inputWrapper}>
                    <User color="#AEAEB2" size={20} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      value={formData.name}
                      onChangeText={(t) => setFormData({...formData, name: t})}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Mail color="#AEAEB2" size={20} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="john@example.com"
                      value={formData.email}
                      onChangeText={(t) => setFormData({...formData, email: t})}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Lock color="#AEAEB2" size={20} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChangeText={(t) => setFormData({...formData, password: t})}
                      secureTextEntry
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.primaryBtn} onPress={nextStep}>
                  <Text style={styles.primaryBtnText}>Continue</Text>
                  <ArrowRight color="#FFFFFF" size={20} style={{ marginLeft: 8 }} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.content}>
              <Text style={styles.title}>What's your goal?</Text>
              <Text style={styles.subtitle}>We'll personalize your experience based on your choice.</Text>

              <View style={styles.goalsGrid}>
                {goals.map((g) => (
                  <TouchableOpacity 
                    key={g.id}
                    onPress={() => setFormData({...formData, goal: g.id})}
                    style={[
                      styles.goalCard, 
                      formData.goal === g.id && styles.goalCardActive
                    ]}
                  >
                    <View style={[styles.goalIcon, { backgroundColor: g.color + '10' }]}>
                      <g.icon color={g.color} size={32} />
                    </View>
                    <Text style={styles.goalTitle}>{g.title}</Text>
                    <View style={[styles.radio, formData.goal === g.id && styles.radioActive]}>
                      {formData.goal === g.id && <Check color="#FFFFFF" size={12} strokeWidth={4} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity 
                style={[styles.primaryBtn, loading && styles.disabledBtn]} 
                onPress={handleSignup}
                disabled={loading}
              >
                {loading ? (
                  <Text style={styles.primaryBtnText}>Creating Account...</Text>
                ) : (
                  <Text style={styles.primaryBtnText}>Complete Signup</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity 
            style={styles.footer} 
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.footerText}>
              Already have an account? <Text style={styles.linkText}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 44,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E5EA',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 8,
  },
  stepActive: {
    backgroundColor: '#2D5AF0',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1C1C1E',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '600',
    marginTop: 8,
    lineHeight: 22,
  },
  form: {
    marginTop: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: '#AEAEB2',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  primaryBtn: {
    backgroundColor: '#2D5AF0',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#2D5AF0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  disabledBtn: {
    opacity: 0.7,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  goalsGrid: {
    marginTop: 32,
    marginBottom: 24,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#F2F2F7',
  },
  goalCardActive: {
    borderColor: '#2D5AF0',
    backgroundColor: '#F0F4FF',
  },
  goalIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1E',
    marginLeft: 16,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    backgroundColor: '#2D5AF0',
    borderColor: '#2D5AF0',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    color: '#8E8E93',
    fontWeight: '600',
  },
  linkText: {
    color: '#2D5AF0',
    fontWeight: '800',
  },
});