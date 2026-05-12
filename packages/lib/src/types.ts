export type UserRole = 'ADMIN' | 'DIETICIAN' | 'PATIENT' | 'SUPERADMIN' | 'DOCTOR' | 'SPECIALIST' | 'RESEARCHER' | 'INSURANCE' | 'HEALTH_EDUCATOR' | 'HEPATOLOGIST' | 'TRANSPLANT_COORDINATOR' | 'GASTROENTEROLOGIST' | 'SURGEON';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
  // External/Organization Info
  organization_id?: string;
  organization_name?: string;
  // Patient fields
  diagnosis?: string;
  meld_score?: number;
  age?: number;
  // Metadata
  // Clinical & Professional Metadata
  department?: string;
  specialty?: string;
  medical_license_number?: string;
  bio?: string;
  title?: string; // e.g., "Senior Hepatologist"
  clinical_access_level?: 1 | 2 | 3; // 1: Read-only, 2: Standard, 3: Full Medical Authority
  created_at: string;
  updated_at: string;
}

export interface WorkoutPlan {
  id: number;
  user_id: string;
  name: string;
  intensity: string;
  is_active: boolean;
  created_at: string;
}

export interface WorkoutExercise {
  id: number;
  plan_id: number;
  name: string;
  sets: number;
  reps: number;
  duration_secs?: number;
}

export interface WorkoutLog {
  id: number;
  user_id: string;
  exercise_name: string;
  status: 'DONE' | 'SKIPPED';
  duration_mins: number;
  logged_at: string;
}

export interface DietPlan {
  id: number;
  user_id: string;
  name: string;
  calories_goal: number;
  protein_goal: number;
  carbs_goal: number;
  fats_goal: number;
  created_at: string;
}

export interface DietMeal {
  id: number;
  plan_id: number;
  meal_type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  items: string[];
}

export interface DietLog {
  id: number;
  user_id: string;
  food_name: string;
  calories: number;
  protein: number;
  logged_at: string;
}

export interface BlogPost {
  id: number;
  author_id: string;
  title: string;
  content: string;
  is_published: boolean;
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: string;
  title: string;
  body: string;
  type: 'GENERAL' | 'WORKOUT' | 'DIET' | 'SYSTEM';
  is_read: boolean;
  created_at: string;
}

export interface UserPreferences {
  user_id: string;
  dietary_restrictions: string[];
  workout_goals: string[];
  notification_enabled: boolean;
  updated_at: string;
}
