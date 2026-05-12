import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Mail, ChevronLeft, ArrowRight, CheckCircle2, Loader2
} from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert('Required', 'Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
        setSent(true);
      }, 1500);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft color="#1C1C1E" size={24} />
          </TouchableOpacity>

          {!sent ? (
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <Mail color="#2D5AF0" size={32} />
              </View>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>Enter your email address and we'll send you a recovery link.</Text>

              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Mail color="#AEAEB2" size={20} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="name@example.com"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <TouchableOpacity 
                  style={[styles.primaryBtn, loading && styles.disabledBtn]} 
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <Text style={styles.primaryBtnText}>Sending...</Text>
                  ) : (
                    <>
                      <Text style={styles.primaryBtnText}>Send Recovery Link</Text>
                      <ArrowRight color="#FFFFFF" size={20} style={{ marginLeft: 8 }} />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.successContent}>
              <View style={[styles.iconContainer, { backgroundColor: '#E1F9EB' }]}>
                <CheckCircle2 color="#34C759" size={48} />
              </View>
              <Text style={styles.title}>Check Your Email</Text>
              <Text style={styles.subtitle}>
                We've sent a password recovery link to your email address.
              </Text>
              
              <TouchableOpacity 
                style={[styles.primaryBtn, { marginTop: 32, width: '100%' }]} 
                onPress={() => router.replace('/(auth)/login')}
              >
                <Text style={styles.primaryBtnText}>Back to Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSent(false)} style={{ marginTop: 24 }}>
                <Text style={styles.resendText}>
                  Didn't receive the email? <Text style={styles.linkText}>Resend</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  content: {
    flex: 1,
  },
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
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
    marginBottom: 32,
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
  resendText: {
    fontSize: 15,
    color: '#8E8E93',
    fontWeight: '600',
  },
  linkText: {
    color: '#2D5AF0',
    fontWeight: '800',
  },
});
