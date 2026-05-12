import { supabase } from '../supabase/client';
import { WorkoutPlan, WorkoutLog, WorkoutExercise } from '../types';
import { mockWorkouts, mockSummary } from '../data';

const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

export class WorkoutRepository {
  async getPlans(userId: string): Promise<WorkoutPlan[]> {
    if (!isSupabaseConfigured) return mockWorkouts as any;

    const { data, error } = await supabase
      .from('workout_plans')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  }

  async getExercises(planId: number): Promise<WorkoutExercise[]> {
    if (!isSupabaseConfigured) return []; // Fallback logic for exercises could be added to data.ts

    const { data, error } = await supabase
      .from('workout_exercises')
      .select('*')
      .eq('plan_id', planId);

    if (error) throw error;
    return data || [];
  }

  async logExercise(log: Partial<WorkoutLog>): Promise<WorkoutLog> {
    if (!isSupabaseConfigured) {
      console.log('Silent Auth: Logging exercise to console', log);
      return { ...log, id: Math.random(), logged_at: new Date().toISOString() } as any;
    }

    const { data, error } = await supabase
      .from('workout_logs')
      .insert(log)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getLogs(userId: string): Promise<WorkoutLog[]> {
    if (!isSupabaseConfigured) return [];

    const { data, error } = await supabase
      .from('workout_logs')
      .select('*')
      .eq('user_id', userId)
      .order('logged_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createPlan(plan: Partial<WorkoutPlan>, exercises: Partial<WorkoutExercise>[]): Promise<WorkoutPlan> {
    if (!isSupabaseConfigured) {
      alert('Demo Mode: Plan created locally (not persisted)');
      return { ...plan, id: Math.random(), created_at: new Date().toISOString() } as any;
    }

    const { data: newPlan, error: planError } = await supabase
      .from('workout_plans')
      .insert(plan)
      .select()
      .single();

    if (planError) throw planError;

    if (exercises.length > 0) {
      const exercisesWithId = exercises.map(ex => ({ ...ex, plan_id: newPlan.id }));
      const { error: exError } = await supabase
        .from('workout_exercises')
        .insert(exercisesWithId);
      
      if (exError) throw exError;
    }

    return newPlan;
  }

  async getSummary(): Promise<any> {
    if (!isSupabaseConfigured) return mockSummary;
    return mockSummary;
  }
}

export const workoutRepository = new WorkoutRepository();
