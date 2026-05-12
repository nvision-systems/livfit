import { isSupabaseConfigured, supabase } from '../supabase/client';

export interface PatientRecord {
  id: string;
  name: string;
  risk: 'High' | 'Medium' | 'Low';
  compliance: number;
  status: string;
  lastLogged: string;
  meldScore: number;
}

const mockPatients: PatientRecord[] = [
  { name: "John Doe", id: "P-101", risk: "High", compliance: 45, status: "Awaiting Plan", lastLogged: "2h ago", meldScore: 28 },
  { name: "Jane Smith", id: "P-102", risk: "Medium", compliance: 88, status: "On Plan", lastLogged: "15m ago", meldScore: 14 },
  { name: "Alice Wong", id: "P-103", risk: "Low", compliance: 95, status: "Stabilized", lastLogged: "1h ago", meldScore: 11 },
  { name: "Robert Miller", id: "P-104", risk: "High", compliance: 30, status: "Critical Review", lastLogged: "5m ago", meldScore: 32 },
  { name: "Sarah Jenkins", id: "P-105", risk: "Medium", compliance: 72, status: "On Plan", lastLogged: "3h ago", meldScore: 18 },
];

export const patientRepository = {
  async getAll(): Promise<PatientRecord[]> {
    if (!isSupabaseConfigured) {
      return Promise.resolve(mockPatients);
    }
    const { data, error } = await supabase.from('profiles').select('*').eq('role', 'PATIENT');
    if (error) throw error;
    return data as any;
  },

  async getById(id: string): Promise<PatientRecord | null> {
    if (!isSupabaseConfigured) {
      return Promise.resolve(mockPatients.find(p => p.id === id) || null);
    }
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (error) throw error;
    return data as any;
  }
};
