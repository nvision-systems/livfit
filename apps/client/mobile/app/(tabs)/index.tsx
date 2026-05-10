import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { workoutRepository, dietRepository, calculateMELD } from '@livfit/lib';
import { useRouter } from 'expo-router';
import SummaryCard from '../../components/SummaryCard';
import { commonStyles } from '../../styles';
import { Activity, Droplets, Utensils, Heart, ChevronRight, Info } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [summary, setSummary] = useState<any>(null);
  const [dietPlan, setDietPlan] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const s = await workoutRepository.getSummary();
      const d = await dietRepository.getActivePlan();
      setSummary(s);
      setDietPlan(d);
    };
    fetchData();
  }, []);

  if (!summary || !dietPlan) {
    return (
      <View style={commonStyles.centeredContainer}>
        <Activity color="#2D5AF0" size={30} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.userName}>Patient Dashboard</Text>
          </View>
          <TouchableOpacity 
            style={styles.meldBadge}
            onPress={() => router.push('/meld-calculator')}
          >
            <Text style={styles.meldLabel}>MELD Score</Text>
            <Text style={styles.meldValue}>12</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusSection}>
          <TouchableOpacity style={styles.statusCard}>
            <View style={[styles.statusIcon, { backgroundColor: '#F0F4FF' }]}>
              <Heart color="#2D5AF0" size={24} />
            </View>
            <View>
              <Text style={styles.statusLabel}>Condition</Text>
              <Text style={styles.statusValue}>Stable</Text>
            </View>
            <ChevronRight color="#C7C7CC" size={20} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Clinical Progress</Text>
        
        <View style={styles.grid}>
          <SummaryCard
            title="Workout"
            value={summary.workoutCompleted ? 'Done' : 'Pending'}
            subtitle="Today's goal"
            icon={<Activity color="#FFFFFF" size={16} />}
            color="#2D5AF0"
          />
          <SummaryCard
            title="Water"
            value={`${summary.fluidsConsumed}L / ${summary.fluidsGoal}L`}
            subtitle="Hydration"
            icon={<Droplets color="#FFFFFF" size={16} />}
            color="#34C759"
            progress={summary.fluidsConsumed / summary.fluidsGoal}
          />
        </View>

        <Text style={styles.sectionTitle}>Nutrition Plan: {dietPlan.name}</Text>
        
        <TouchableOpacity 
          style={styles.nutritionCard}
          onPress={() => router.push('/nutrition-journal')}
        >
          <View style={styles.nutriItem}>
            <Text style={styles.nutriLabel}>Calories</Text>
            <Text style={styles.nutriValue}>{summary.caloriesConsumed} / {summary.caloriesGoal}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(summary.caloriesConsumed / summary.caloriesGoal) * 100}%` }]} />
            </View>
          </View>

          <View style={styles.macrosRow}>
            <View style={styles.macro}>
              <Text style={styles.macroLabel}>Protein</Text>
              <Text style={styles.macroValue}>{summary.proteinConsumed}g</Text>
            </View>
            <View style={styles.macro}>
              <Text style={styles.macroLabel}>Carbs</Text>
              <Text style={styles.macroValue}>{summary.carbsConsumed}g</Text>
            </View>
            <View style={styles.macro}>
              <Text style={styles.macroLabel}>Fats</Text>
              <Text style={styles.macroValue}>{summary.fatsConsumed}g</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoBanner}>
          <Info color="#2D5AF0" size={18} />
          <Text style={styles.infoText}>New blog post: "Managing Sodium with NAFLD"</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1C1C1E',
    marginTop: 4,
  },
  meldBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  meldLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  meldValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D5AF0',
  },
  statusSection: {
    marginBottom: 24,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statusLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '600',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#34C759',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  nutritionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 24,
  },
  nutriItem: {
    marginBottom: 20,
  },
  nutriLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
    marginBottom: 8,
  },
  nutriValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2D5AF0',
    borderRadius: 4,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingTop: 16,
  },
  macro: {
    alignItems: 'flex-start',
  },
  macroLabel: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  infoBanner: {
    backgroundColor: '#F0F4FF',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 13,
    color: '#2D5AF0',
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  }
});

