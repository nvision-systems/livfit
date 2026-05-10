import { Tabs } from 'expo-router';
import { Home, Dumbbell, Apple, MessageSquare, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: true,
      tabBarActiveTintColor: '#2D5AF0',
      tabBarInactiveTintColor: '#8E8E93',
      tabBarStyle: {
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
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

