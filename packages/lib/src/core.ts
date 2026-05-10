export type UserRole = 'USER' | 'DIETICIAN' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  phone?: string;
}

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
    { id: 1, name: 'Diaphragmatic Breathing', duration: 10, type: 'Breathing' },
    { id: 2, name: 'Ankle Pumps', duration: 5, type: 'Mobility' },
    { id: 3, name: 'Seated Arm Circles', duration: 5, type: 'Mobility' },
  ],
  LOW: [
    { id: 4, name: 'Casual Walking', duration: 15, type: 'Cardio' },
    { id: 5, name: 'Seated Leg Extensions', duration: 10, type: 'Strength' },
    { id: 6, name: 'Wall Push-ups', duration: 5, type: 'Strength' },
  ],
  MODERATE: [
    { id: 7, name: 'Brisk Walking', duration: 20, type: 'Cardio' },
    { id: 8, name: 'Bodyweight Squats', duration: 12, type: 'Strength' },
    { id: 9, name: 'Resistance Band Rows', duration: 10, type: 'Strength' },
  ],
};

