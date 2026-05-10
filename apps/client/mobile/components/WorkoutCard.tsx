import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Activity, Scale, Dumbbell, ChevronRight, Play } from 'lucide-react-native';

interface WorkoutCardProps {
  name: string;
  type: 'Aerobics' | 'Balance' | 'Strength';
  sets: number;
  reps?: number;
  duration?: number;
}

export default function WorkoutCard({ name, type, sets, reps, duration }: WorkoutCardProps) {
  const renderIcon = () => {
    const size = 20;
    const color = "#2D5AF0";
    switch (type) {
      case 'Aerobics': return <Activity size={size} color={color} />;
      case 'Balance': return <Scale size={size} color={color} />;
      case 'Strength': return <Dumbbell size={size} color={color} />;
      default: return <Play size={size} color={color} />;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.details}>
          {sets} sets {reps ? `× ${reps} reps` : `× ${duration}s`}
        </Text>
      </View>
      <View style={styles.checkMark}>
        <ChevronRight size={16} color="#C7C7CC" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  type: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  details: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5AF0',
    marginTop: 4,
  },
  checkMark: {
    paddingLeft: 8,
  }
});