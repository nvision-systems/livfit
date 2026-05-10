import React from 'react';
import { View, Text } from 'react-native';
import { summaryCardStyles as styles } from '../styles';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  progress?: number; // 0-1
}

export default function SummaryCard({ title, value, subtitle, progress }: SummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {progress !== undefined && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
      )}
    </View>
  );
}