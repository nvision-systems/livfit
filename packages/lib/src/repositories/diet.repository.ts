import { supabase, isSupabaseConfigured } from '../supabase/client';
import { DietPlan, DietLog, DietMeal } from '../types';
import { mockMealPlans } from '../data';

export class DietRepository {
  async getPlans(userId: string): Promise<DietPlan[]> {
    if (!isSupabaseConfigured) return mockMealPlans as any;

    const { data, error } = await supabase
      .from('diet_plans')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  }

  async getMeals(planId: number): Promise<DietMeal[]> {
    if (!isSupabaseConfigured) return [];

    const { data, error } = await supabase
      .from('diet_meals')
      .select('*')
      .eq('plan_id', planId);

    if (error) throw error;
    return data || [];
  }

  async logMeal(log: Partial<DietLog>): Promise<DietLog> {
    if (!isSupabaseConfigured) {
      console.log('Silent Auth: Logging meal to console', log);
      return { ...log, id: Math.random(), logged_at: new Date().toISOString() } as any;
    }

    const { data, error } = await supabase
      .from('diet_logs')
      .insert(log)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getLogs(userId: string): Promise<DietLog[]> {
    if (!isSupabaseConfigured) return [];

    const { data, error } = await supabase
      .from('diet_logs')
      .select('*')
      .eq('user_id', userId)
      .order('logged_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createPlan(plan: Partial<DietPlan>, meals: Partial<DietMeal>[]): Promise<DietPlan> {
    if (!isSupabaseConfigured) {
      alert('Demo Mode: Diet plan created locally');
      return { ...plan, id: Math.random(), created_at: new Date().toISOString() } as any;
    }

    const { data: newPlan, error: planError } = await supabase
      .from('diet_plans')
      .insert(plan)
      .select()
      .single();

    if (planError) throw planError;

    if (meals.length > 0) {
      const mealsWithId = meals.map(m => ({ ...m, plan_id: newPlan.id }));
      const { error: mError } = await supabase
        .from('diet_meals')
        .insert(mealsWithId);
      
      if (mError) throw mError;
    }

    return newPlan;
  }

  async updatePlan(id: number, updates: Partial<DietPlan>): Promise<DietPlan> {
    if (!isSupabaseConfigured) return { ...updates, id } as any;

    const { data, error } = await supabase
      .from('diet_plans')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getActivePlan(userId: string = 'current'): Promise<DietPlan> {
    if (!isSupabaseConfigured) {
      const active = mockMealPlans.find((p: any) => p.status === 'active') || mockMealPlans[0];
      return active as any;
    }

    const { data, error } = await supabase
      .from('diet_plans')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error) {
      // Fallback to first plan if no active one found
      const plans = await this.getPlans(userId);
      return plans[0];
    }
    return data;
  }
}

export const dietRepository = new DietRepository();
