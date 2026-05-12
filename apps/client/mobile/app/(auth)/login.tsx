import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Switch, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { login } from '@livfit/lib';
import { useRouter } from 'expo-router';
import { 
  Heart, ArrowRight, Eye, EyeOff, Github, 
  Chrome, Apple, Lock, Mail, Smartphone
} from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [useBiometrics, setUseBiometrics] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Required', 'Please enter your email and password');
      return;
    }
    setLoading(true);
    try {
      // Simulate network delay
      setTimeout(() => {
        setLoading(false);
        router.replace('/(tabs)');
      }, 1500);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Brand Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Heart color="#2D5AF0" size={32} />
            </View>
            <Text style={styles.brandName}>LIVFIT</Text>
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>Sign in to your clinical dashboard</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Mail color="#AEAEB2" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#AEAEB2"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
                  <Text style={styles.forgotText}>Forgot?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <Lock color="#AEAEB2" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#AEAEB2"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  {showPassword ? <EyeOff color="#AEAEB2" size={20} /> : <Eye color="#AEAEB2" size={20} />}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.biometricRow}>
              <View style={styles.biometricLeft}>
                <Smartphone color="#1C1C1E" size={18} />
                <Text style={styles.biometricText}>Enable Biometric Sign-in</Text>
              </View>
              <Switch
                value={useBiometrics}
                onValueChange={setUseBiometrics}
                trackColor={{ false: '#D1D1D6', true: '#2D5AF0' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D1D1D6"
              />
            </View>

            <TouchableOpacity 
              style={[styles.loginBtn, loading && styles.loginBtnDisabled]} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <Text style={styles.loginBtnText}>Authenticating...</Text>
              ) : (
                <>
                  <Text style={styles.loginBtnText}>Sign In</Text>
                  <ArrowRight color="#FFFFFF" size={20} style={{ marginLeft: 8 }} />
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Social Auth */}
          <View style={styles.socialSection}>
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialBtns}>
              <TouchableOpacity style={styles.socialBtn}>
                <Chrome color="#1C1C1E" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialBtn, { marginHorizontal: 16 }]}>
                <Apple color="#1C1C1E" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Github color="#1C1C1E" size={24} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.footerLink} 
              onPress={() => router.push('/(auth)/signup')}
            >
              <Text style={styles.footerText}>
                Don't have an account? <Text style={styles.signUpText}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
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
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#2D5AF0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2D5AF0',
    letterSpacing: 2,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1C1C1E',
    letterSpacing: -1,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '600',
    marginTop: 4,
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: '#AEAEB2',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  forgotText: {
    fontSize: 13,
    color: '#2D5AF0',
    fontWeight: '700',
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
  eyeIcon: {
    padding: 8,
  },
  biometricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  biometricLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  biometricText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
    marginLeft: 10,
  },
  loginBtn: {
    backgroundColor: '#2D5AF0',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2D5AF0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  loginBtnDisabled: {
    opacity: 0.7,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  socialSection: {
    marginTop: 'auto',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#F2F2F7',
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#AEAEB2',
    marginHorizontal: 16,
    letterSpacing: 1,
  },
  socialBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  socialBtn: {
    width: 64,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLink: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    color: '#8E8E93',
    fontWeight: '600',
  },
  signUpText: {
    color: '#2D5AF0',
    fontWeight: '800',
  },
});