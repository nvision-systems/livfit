import { supabase, isSupabaseConfigured } from '../supabase/client';
import { UserProfile, UserPreferences, PatientRecord } from '../types';
import { mockDemoUsers, mockPatients } from '../data';
import { getServerSession } from '../auth/server';

export class UserRepository {
  async getCurrentProfile(): Promise<UserProfile | null> {
    const session = await getServerSession();
    if (!session?.user) return null;
    
    // In demo mode, the session user already contains the mock metadata
    if (!isSupabaseConfigured) {
      return {
        ...session.user,
        role: session.user.app_metadata?.role as any
      } as any;
    }

    return this.getProfile(session.user.id);
  }

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

  async getClinicalQueue(): Promise<PatientRecord[]> {
    if (!isSupabaseConfigured) return mockPatients;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'PATIENT');
    
    if (error) throw error;
    
    // Map UserProfile to PatientRecord for the clinical portal
    return data.map((u: any) => ({
      id: u.id,
      name: u.full_name || u.name,
      risk: (u.risk as any) || 'Medium',
      compliance: u.compliance || 75,
      status: u.status || 'On Plan',
      lastLogged: u.last_logged || '1d ago',
      meldScore: u.meld_score || 15
    }));
  }
}

export const userRepository = new UserRepository();
