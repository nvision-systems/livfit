import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, FlatValue, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { ChevronLeft, Plus, Search, Utensils, Zap, Filter, MoreHorizontal } from 'lucide-react-native';
import { dietRepository, workoutRepository } from '@livfit/lib';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export default function NutritionJournal() {
  const router = useRouter();
  const [activeMealType, setActiveMealType] = useState('Breakfast');
  const [summary, setSummary] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const s = await workoutRepository.getSummary();
      setSummary(s);
    };
    fetchData();
  }, []);

  if (!summary) return null;

  const calorieProgress = (summary.caloriesConsumed / summary.caloriesGoal) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color={COLORS.textPrimary} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Nutrition Journal</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color={COLORS.textPrimary} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Calorie Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressLabel}>Today's Intake</Text>
              <Text style={styles.progressValue}>
                <Text style={styles.consumedText}>{summary.caloriesConsumed}</Text>
                <Text style={styles.totalText}> / {summary.caloriesGoal} kcal</Text>
              </Text>
            </View>
            <View style={styles.zapIcon}>
              <Zap color={COLORS.warning} size={24} fill={COLORS.warning} />
            </View>
          </View>
          
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min(calorieProgress, 100)}%` }]} />
          </View>

          <View style={styles.macrosRow}>
            <MacroItem label="Protein" value={summary.proteinConsumed} goal={summary.proteinGoal} unit="g" color="#FF3B30" />
            <MacroItem label="Carbs" value={summary.carbsConsumed} goal={summary.carbsGoal} unit="g" color="#34C759" />
            <MacroItem label="Fats" value={summary.fatsConsumed} goal={summary.fatsGoal} unit="g" color="#FF9500" />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color={COLORS.textSecondary} size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search food to log portions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Meal Categories */}
        <View style={styles.mealTypes}>
          {MEAL_TYPES.map((type) => (
            <TouchableOpacity 
              key={type} 
              style={[styles.mealTypeTab, activeMealType === type && styles.activeTab]}
              onPress={() => setActiveMealType(type)}
            >
              <Text style={[styles.mealTypeText, activeMealType === type && styles.activeTabText]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Log List */}
        <View style={styles.logSection}>
          <View style={styles.logHeader}>
            <Text style={styles.logTitle}>{activeMealType} Log</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus color={COLORS.card} size={18} />
              <Text style={styles.addButtonText}>Add Food</Text>
            </TouchableOpacity>
          </View>

          {/* Sample Entries */}
          <FoodItem name="Oatmeal with Blueberries" cals={280} portion="1 bowl" />
          <FoodItem name="Greek Yogurt" cals={150} portion="150g" />
          <FoodItem name="Black Coffee" cals={2} portion="1 cup" last />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function MacroItem({ label, value, goal, unit, color }: any) {
  return (
    <View style={styles.macroItem}>
      <Text style={styles.macroLabel}>{label}</Text>
      <Text style={styles.macroVal}>{value}{unit}</Text>
      <View style={styles.miniTrack}>
        <View style={[styles.miniFill, { width: `${(value / goal) * 100}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

function FoodItem({ name, cals, portion, last }: any) {
  return (
    <View style={[styles.foodItem, last && { borderBottomWidth: 0 }]}>
      <View style={styles.foodIcon}>
        <Utensils color={COLORS.primary} size={18} />
      </View>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.foodPortion}>{portion}</Text>
      </View>
      <View style={styles.foodCals}>
        <Text style={styles.calsText}>{cals} kcal</Text>
        <TouchableOpacity>
          <MoreHorizontal color={COLORS.textSecondary} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.subtle,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.subtle,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  content: {
    padding: 20,
  },
  progressCard: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: RADIUS.xxl,
    ...SHADOWS.medium,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  progressValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  consumedText: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  zapIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    height: 12,
    backgroundColor: COLORS.subtle,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    flex: 1,
    alignItems: 'flex-start',
    marginRight: 10,
  },
  macroLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  macroVal: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  miniTrack: {
    height: 4,
    width: '100%',
    backgroundColor: COLORS.subtle,
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniFill: {
    height: '100%',
    borderRadius: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    borderRadius: RADIUS.xl,
    ...SHADOWS.subtle,
    marginBottom: 24,
    height: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  mealTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  mealTypeTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: COLORS.tint,
  },
  mealTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  logSection: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xxl,
    padding: 20,
    ...SHADOWS.medium,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  addButtonText: {
    color: COLORS.card,
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.subtle,
  },
  foodIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.tint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  foodPortion: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  foodCals: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  calsText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 8,
  }
});
