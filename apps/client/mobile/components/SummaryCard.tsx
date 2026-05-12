import React from 'react';
import { View, Text } from 'react-native';
import { summaryCardStyles as styles } from '../styles';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
  progress?: number; // 0-1
}

export default function SummaryCard({ title, value, subtitle, icon, color, progress }: SummaryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: color || '#2D5AF0' }]}>
          {icon}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        
        {progress !== undefined && (
          <View style={styles.progressContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${progress * 100}%`, backgroundColor: color || '#34C759' }
              ]} 
            />
          </View>
        )}
      </View>
    </View>
  );
}