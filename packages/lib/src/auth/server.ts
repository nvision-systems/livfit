import { supabase, isSupabaseConfigured } from '../supabase/client';
import { mockDemoUsers } from '../data';

export const getServerSession = async () => {
  // If in browser, check localStorage for mock session
  if (typeof window !== 'undefined') {
    const demoSession = localStorage.getItem('livfit_demo_session');
    if (demoSession) {
      try {
        return JSON.parse(demoSession);
      } catch (e) {
        console.error('Failed to parse demo session', e);
      }
    }
  }

  if (!isSupabaseConfigured) {
    return null; 
  }

  const { data: { session }, error } = await supabase.auth.getSession();
  return session || null;
};

export const requireAuth = async () => {
  const session = await getServerSession();
  return session;
};
