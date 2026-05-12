import { UserRole } from './types';

export interface BodyMetrics {
  gender: 'male' | 'female' | 'other';
  age: number;
  ethnicity: string;
  diagnosis: string;
  meldScore?: number;
  creatinine: number;
  bilirubin: number;
  inr: number;
}

/**
 * Calculates the MELD (Model for End-Stage Liver Disease) score.
 * Formula: 10 * (0.957 * ln(Creatinine) + 0.378 * ln(Bilirubin) + 1.120 * ln(INR) + 0.643)
 * Note: Minimum value for inputs is 1.0 to prevent negative logs.
 */
export const calculateMELD = (metrics: Pick<BodyMetrics, 'creatinine' | 'bilirubin' | 'inr'>): number => {
  const cr = Math.max(metrics.creatinine, 1.0);
  const bil = Math.max(metrics.bilirubin, 1.0);
  const inr = Math.max(metrics.inr, 1.0);

  const meld = (0.957 * Math.log(cr) + 0.378 * Math.log(bil) + 1.120 * Math.log(inr) + 0.643) * 10;
  return Math.round(meld);
};

export const NUTRITION_GOALS = {
  WATER_INTAKE_ML: 2500,
  PROTEIN_MULTIPLIER: 1.2,
};

export const getWorkoutIntensity = (meldScore: number) => {
  if (meldScore > 20) return 'VERY_LOW';
  if (meldScore >= 10) return 'LOW';
  return 'MODERATE';
};

export const WORKOUT_TEMPLATES = {
  VERY_LOW: [
    { id: 1, name: 'Diaphragmatic Breathing', duration: 600, sets: 1, reps: 1, type: 'Breathing' },
    { id: 2, name: 'Ankle Pumps', duration: 300, sets: 2, reps: 15, type: 'Mobility' },
    { id: 3, name: 'Seated Arm Circles', duration: 300, sets: 2, reps: 10, type: 'Mobility' },
  ],
  LOW: [
    { id: 4, name: 'Casual Walking', duration: 900, sets: 1, reps: 1, type: 'Cardio' },
    { id: 5, name: 'Seated Leg Extensions', duration: 600, sets: 3, reps: 10, type: 'Strength' },
    { id: 6, name: 'Wall Push-ups', duration: 300, sets: 2, reps: 8, type: 'Strength' },
  ],
  MODERATE: [
    { id: 7, name: 'Brisk Walking', duration: 1200, sets: 1, reps: 1, type: 'Cardio' },
    { id: 8, name: 'Bodyweight Squats', duration: 720, sets: 3, reps: 12, type: 'Strength' },
    { id: 9, name: 'Resistance Band Rows', duration: 600, sets: 3, reps: 12, type: 'Strength' },
  ],
};

/**
 * Calculates the Prehab Readiness Score based on the Tri-Factor model:
 * 1. Physical Adherence (Workout) - 40%
 * 2. Nutritional Precision (Diet) - 40%
 * 3. Educational Literacy (Blogs/Learning) - 20%
 */
export const calculatePrehabReadiness = (
  workoutCompliance: number, // 0-1
  dietCompliance: number,    // 0-1
  literacyCompliance: number // 0-1
): number => {
  const score = (workoutCompliance * 0.4) + (dietCompliance * 0.4) + (literacyCompliance * 0.2);
  return Math.round(score * 100);
};
