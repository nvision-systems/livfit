import { Tabs } from 'expo-router';
import { Home, Dumbbell, Apple, MessageSquare, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: true,
      headerStyle: { backgroundColor: '#FFFFFF' },
      headerTitleStyle: { fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
      tabBarActiveTintColor: '#2D5AF0',
      tabBarInactiveTintColor: '#AEAEB2',
      tabBarLabelStyle: { fontWeight: '800', fontSize: 11, marginBottom: 4 },
      tabBarStyle: {
        height: 65,
        borderTopWidth: 0,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 20,
        paddingBottom: 8,
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="workout/index"
        options={{
          title: 'Workout',
          tabBarIcon: ({ color }) => <Dumbbell size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="nutrition/index"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color }) => <Apple size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <MessageSquare size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

