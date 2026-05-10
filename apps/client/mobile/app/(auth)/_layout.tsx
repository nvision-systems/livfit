import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: true,
      headerTitleStyle: { fontWeight: 'bold', color: '#1C1C1E' },
      headerShadowVisible: false,
      headerBackTitleVisible: false,
    }}>
      <Stack.Screen name="login" options={{ title: 'Welcome Back' }} />
      <Stack.Screen name="signup" options={{ title: 'Create Account' }} />
      <Stack.Screen name="otp" options={{ title: 'Verification' }} />
    </Stack>
  );
}
