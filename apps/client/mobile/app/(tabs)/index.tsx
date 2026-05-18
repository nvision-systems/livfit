import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { workoutRepository, dietRepository, getUser } from '@livfit/lib';
import { useRouter } from 'expo-router';
import SummaryCard from '../../components/SummaryCard';
import { commonStyles } from '../../styles';
import { 
  Activity, Droplets, Utensils, Heart, ChevronRight, 
  Info, Bell, User, Star, TrendingDown, Target, Zap
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [summary, setSummary] = useState<any>(null);
  const [dietPlan, setDietPlan] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, d, u] = await Promise.all([
          workoutRepository.getSummary(),
          dietRepository.getActivePlan ? dietRepository.getActivePlan() : dietRepository.getPlans('current').then(p => p[0]),
          getUser()
        ]);
        setSummary(s);
        setDietPlan(d);
        setUser(u);
      } catch (error) {
        console.error("Failed to fetch mobile dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !summary) {
    return (
      <View style={[commonStyles.centeredContainer, { backgroundColor: '#FFFFFF' }]}>
        <Activity color="#2D5AF0" size={40} />
        <Text style={{ marginTop: 16, color: '#8E8E93', fontWeight: '600' }}>Loading your health hub...</Text>
      </View>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topNav}>
        <View style={styles.brand}>
          <Text style={styles.brandText}>LIVFIT</Text>
          <View style={styles.dot} />
        </View>
        <View style={styles.navIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Bell color="#1C1C1E" size={22} />
            <View style={styles.badge} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.iconBtn, { marginLeft: 12 }]}
            onPress={() => router.push('/profile-setup')}
          >
            <User color="#1C1C1E" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{user?.name || "Patient"}</Text>
          </View>
          <TouchableOpacity 
            style={styles.meldBadge}
            onPress={() => router.push('/meld-calculator')}
          >
            <Text style={styles.meldLabel}>MELD</Text>
            <View style={styles.meldRow}>
              <Text style={styles.meldValue}>{user?.meldScore || 12}</Text>
              <TrendingDown color="#34C759" size={14} style={{ marginLeft: 4 }} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Condition Card - Premium Glassmorphism style */}
        <TouchableOpacity style={styles.conditionCard}>
          <View style={styles.conditionLeft}>
            <View style={styles.conditionIconBg}>
              <Zap color="#FFFFFF" size={20} />
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text style={styles.conditionLabel}>Overall Status</Text>
              <Text style={styles.conditionValue}>Stable & Improving</Text>
            </View>
          </View>
          <ChevronRight color="#C7C7CC" size={20} />
        </TouchableOpacity>
        
        {/* Quick Prehab Actions */}
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 15 }}>
            Quick Prehab Logs
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {[
              { label: 'Water', color: '#30B0C7' },
              { label: 'Protein', color: '#FF3B30' },
              { label: 'Walk', color: '#FF9500' },
              { label: 'Vitals', color: '#34C759' },
            ].map((action, i) => (
              <TouchableOpacity key={i} style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5 }}>
                <View style={{ width: 40, height: 40, borderRadius: 16, backgroundColor: action.color + '15', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <View style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: action.color }} />
                </View>
                <Text style={{ fontSize: 10, fontWeight: '800', color: '#1C1C1E' }}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Biometric Sync Status */}
        <View style={{ marginBottom: 25, padding: 16, backgroundColor: '#F2F2F7', borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#34C759' }} />
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#1C1C1E' }}>Vitals Syncing with Apple Health</Text>
          </View>
          <Text style={{ fontSize: 11, fontWeight: '800', color: '#2D5AF0' }}>DETAILS</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Progress</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Details</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.grid}>
          <View style={styles.gridColumn}>
            <SummaryCard
              title="Workout"
              value={summary.workoutCompleted ? 'Done' : 'Pending'}
              subtitle="20m Goal"
              icon={<Activity color="#FFFFFF" size={16} />}
              color="#2D5AF0"
            />
          </View>
          <View style={styles.gridColumn}>
            <SummaryCard
              title="Hydration"
              value={`${summary.fluidsConsumed}L`}
              subtitle={`of ${summary.fluidsGoal}L`}
              icon={<Droplets color="#FFFFFF" size={16} />}
              color="#30B0C7"
              progress={summary.fluidsConsumed / summary.fluidsGoal}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Nutrition: {dietPlan?.name || "Daily Plan"}</Text>
        
        <TouchableOpacity 
          style={styles.nutritionCard}
          onPress={() => router.push('/(tabs)/nutrition')}
        >
          <View style={styles.nutriMain}>
            <View>
              <Text style={styles.nutriLabel}>Daily Calories</Text>
              <View style={styles.nutriValueRow}>
                <Text style={styles.nutriValue}>{summary.caloriesConsumed}</Text>
                <Text style={styles.nutriGoal}> / {summary.caloriesGoal} kcal</Text>
              </View>
            </View>
            <View style={styles.circularProgress}>
              {/* Simplified circular progress for RN without extra libs */}
              <View style={[styles.circleHalf, { backgroundColor: '#F2F2F7' }]} />
              <View style={[styles.circleValue, { height: `${(summary.caloriesConsumed / summary.caloriesGoal) * 100}%` }]} />
              <Target color="#2D5AF0" size={20} />
            </View>
          </View>

          <View style={styles.macrosRow}>
            <View style={styles.macroItem}>
              <Text style={styles.macroVal}>{summary.proteinConsumed}g</Text>
              <Text style={styles.macroLab}>Protein</Text>
            </View>
            <View style={styles.macroDivider} />
            <View style={styles.macroItem}>
              <Text style={styles.macroVal}>{summary.carbsConsumed}g</Text>
              <Text style={styles.macroLab}>Carbs</Text>
            </View>
            <View style={styles.macroDivider} />
            <View style={styles.macroItem}>
              <Text style={styles.macroVal}>{summary.fatsConsumed}g</Text>
              <Text style={styles.macroLab}>Fats</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* New Lab Snapshot Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lab Snapshot</Text>
        </View>
        <View style={styles.labRow}>
          <View style={styles.labCard}>
            <Text style={styles.labName}>Bilirubin</Text>
            <Text style={styles.labValue}>1.2</Text>
            <Text style={styles.labUnit}>mg/dL</Text>
          </View>
          <View style={styles.labCard}>
            <Text style={styles.labName}>INR</Text>
            <Text style={styles.labValue}>1.1</Text>
            <Text style={styles.labUnit}>Ratio</Text>
          </View>
          <View style={[styles.labCard, { marginRight: 0 }]}>
            <Text style={styles.labName}>Compliance</Text>
            <Text style={styles.labValue}>84%</Text>
            <Text style={styles.labUnit}>Weekly</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.infoBanner}
          onPress={() => router.push('/learning' as any)}
        >
          <View style={styles.infoIcon}>
            <Star color="#FFFFFF" size={16} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.infoTitle}>Education Corner</Text>
            <Text style={styles.infoText}>Managing Sodium with NAFLD • 5 min read</Text>
          </View>
          <ChevronRight color="#2D5AF0" size={18} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2D5AF0',
    letterSpacing: -0.5,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF3B30',
    marginLeft: 2,
    marginTop: 4,
  },
  navIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
    fontWeight: '600',
  },
  userName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1C1C1E',
    marginTop: 2,
    letterSpacing: -0.5,
  },
  meldBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#2D5AF0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  meldLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  meldRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meldValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1C1C1E',
  },
  conditionCard: {
    backgroundColor: '#2D5AF0',
    padding: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
    shadowColor: '#2D5AF0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  conditionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conditionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  conditionValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.5,
  },
  seeAll: {
    fontSize: 14,
    color: '#2D5AF0',
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    marginHorizontal: -8,
    marginBottom: 28,
  },
  gridColumn: {
    flex: 1,
    paddingHorizontal: 8,
  },
  nutritionCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 3,
    marginBottom: 28,
  },
  nutriMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  nutriLabel: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  nutriValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  nutriValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1C1C1E',
  },
  nutriGoal: {
    fontSize: 15,
    color: '#AEAEB2',
    fontWeight: '600',
  },
  circularProgress: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  circleHalf: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#2D5AF0',
    opacity: 0.1,
  },
  circleValue: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#2D5AF0',
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  macroItem: {
    flex: 1,
    alignItems: 'center',
  },
  macroVal: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  macroLab: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '700',
    marginTop: 4,
  },
  macroDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#F2F2F7',
  },
  labRow: {
    flexDirection: 'row',
    marginBottom: 28,
  },
  labCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F2F2F7',
  },
  labName: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  labValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1C1C1E',
  },
  labUnit: {
    fontSize: 10,
    color: '#AEAEB2',
    fontWeight: '600',
    marginTop: 2,
  },
  infoBanner: {
    backgroundColor: '#F0F4FF',
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0DBFF',
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#2D5AF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  infoText: {
    fontSize: 12,
    color: '#2D5AF0',
    fontWeight: '600',
    marginTop: 2,
  }
});

