import { supabase, isSupabaseConfigured } from '../supabase/client';
import { mockDemoUsers } from '../data';

export const getServerSession = async () => {
  if (!isSupabaseConfigured) {
    return {
      user: {
        ...mockDemoUsers.patient,
        id: 'patient-1',
        user_metadata: mockDemoUsers.patient,
        app_metadata: { role: 'patient' }
      },
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      access_token: 'demo-token',
      refresh_token: 'demo-refresh',
    };
  }

  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (!session) {
    // SILENT AUTH FOR DEMO IF SUPABASE IS LIVE BUT NO SESSION
    return {
      user: {
        ...mockDemoUsers.patient,
        id: 'patient-1',
        user_metadata: mockDemoUsers.patient,
        app_metadata: { role: 'patient' }
      },
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      access_token: 'demo-token',
      refresh_token: 'demo-refresh',
    };
  }
  
  return session;
};

export const requireAuth = async () => {
  const session = await getServerSession();
  return session;
};
