import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: true,
      headerTitleStyle: { fontWeight: 'bold' },
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="setup" options={{ title: 'Health Profile' }} />
    </Stack>
  );
}
