import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Search, PlusCircle, Apple, Beef, Croissant, Droplets } from 'lucide-react-native';
import { commonStyles, summaryCardStyles } from '../../../styles';
import { getSummary, getMealPlan, searchFood } from '@livfit/lib';

export default function NutritionScreen() {
  const [summary, setSummary] = useState<any>(null);
  const [meals, setMeals] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const s = await getSummary();
    const m = await getMealPlan();
    setSummary(s);
    setMeals(m);
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      const results = await searchFood(text);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const ProgressSection = ({ label, current, goal, color, icon }: any) => {
    const progress = Math.min(current / goal, 1);
    return (
      <View style={localStyles.progressCard}>
        <View style={localStyles.progressHeader}>
          <View style={localStyles.iconWrapper}>
            {icon === 'drumstick-bite' && <Beef size={14} color={color} />}
            {icon === 'bread-slice' && <Croissant size={14} color={color} />}
            {icon === 'tint' && <Droplets size={14} color={color} />}
            {icon === 'glass-whiskey' && <Droplets size={14} color={color} />}
          </View>
          <Text style={localStyles.progressLabel}>{label}</Text>
          <Text style={localStyles.progressValue}>{current}/{goal}g</Text>
        </View>
        <View style={localStyles.progressBarBg}>
          <View style={[localStyles.progressBarFill, { width: `${progress * 100}%`, backgroundColor: color }]} />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={commonStyles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Daily Summary */}
      <View style={localStyles.summaryGrid}>
        <ProgressSection label="Protein" current={summary?.protein || 0} goal={120} color="#FF3B30" icon="drumstick-bite" />
        <ProgressSection label="Carbs" current={summary?.carbs || 0} goal={200} color="#FF9500" icon="bread-slice" />
        <ProgressSection label="Fats" current={summary?.fats || 0} goal={60} color="#FFCC00" icon="tint" />
        <ProgressSection label="Water" current={summary?.water || 0} goal={2500} color="#007AFF" icon="glass-whiskey" />
      </View>

      {/* Food Search */}
      <View style={localStyles.searchSection}>
        <Text style={localStyles.sectionTitle}>Log a Meal</Text>
        <View style={localStyles.searchBar}>
          <Search size={16} color="#8E8E93" style={{ marginRight: 8 }} />
          <TextInput 
            placeholder="Search food database..." 
            style={localStyles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        
        {searchResults.length > 0 && (
          <View style={localStyles.resultsContainer}>
            {searchResults.map((item) => (
              <TouchableOpacity key={item.id} style={localStyles.resultItem}>
                <Text style={localStyles.resultName}>{item.name}</Text>
                <Text style={localStyles.resultDetail}>{item.calories} kcal | P: {item.protein}g</Text>
                <PlusCircle size={20} color="#34C759" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Today's Meal Plan */}
      <View style={localStyles.mealPlanSection}>
        <Text style={localStyles.sectionTitle}>Today's Plan</Text>
        {meals.map((meal, index) => (
          <Fragment key={meal.id || `meal-${index}`}>
            <View style={localStyles.mealCard}>
              <View style={localStyles.mealHeader}>
                <Text style={localStyles.mealType}>{meal.type}</Text>
                <Text style={localStyles.mealCalories}>{meal.calories} kcal</Text>
              </View>
              <Text style={localStyles.mealItems}>{meal.items}</Text>
              <TouchableOpacity style={localStyles.applyButton}>
                <Text style={localStyles.applyButtonText}>Use Today</Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        ))}
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  progressCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
  },
  progressValue: {
    fontSize: 10,
    color: '#8E8E93',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  searchSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  resultsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    overflow: 'hidden',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  resultName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  resultDetail: {
    fontSize: 13,
    color: '#8E8E93',
    marginRight: 12,
  },
  mealPlanSection: {
    marginBottom: 16,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2D5AF0',
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  mealType: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  mealCalories: {
    fontSize: 14,
    color: '#2D5AF0',
    fontWeight: '600',
  },
  mealItems: {
    fontSize: 14,
    color: '#3A3A3C',
    lineHeight: 20,
    marginBottom: 12,
  },
  applyButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  applyButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D5AF0',
  }
});