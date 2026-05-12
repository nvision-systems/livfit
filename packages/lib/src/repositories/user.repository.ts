import { supabase, isSupabaseConfigured } from '../supabase/client';
import { UserProfile, UserPreferences } from '../types';
import { mockDemoUsers } from '../data';

export class UserRepository {
  async getProfile(userId: string): Promise<UserProfile | null> {
    if (!isSupabaseConfigured) return mockDemoUsers.patient as any;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) return null;
    return data;
  }

  async updateProfile(id: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getPreferences(userId: string): Promise<UserPreferences | null> {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) return null;
    return data;
  }

  async updatePreferences(userId: string, updates: Partial<UserPreferences>): Promise<UserPreferences> {
    if (!isSupabaseConfigured) return {} as UserPreferences;

    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({ user_id: userId, ...updates, updated_at: new Date().toISOString() })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getAllPatients(): Promise<UserProfile[]> {
    if (!isSupabaseConfigured) return [mockDemoUsers.patient] as any;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'PATIENT');

    if (error) throw error;
    return data || [];
  }
}

export const userRepository = new UserRepository();
