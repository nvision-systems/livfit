import { mockWorkouts, mockSummary } from '../data';

export class WorkoutRepository {
  async getPlans() {
    return mockWorkouts;
  }

  async getSummary() {
    return mockSummary;
  }

  async logCompletion(workoutId: number, metrics: any) {
    mockSummary.workoutCompleted = true;
    // Real Supabase logic would go here:
    // await supabase.from('workout_logs').insert({...})
    return { success: true, timestamp: new Date().toISOString() };
  }

  async skipSession(reason: string) {
    return { success: true, reason };
  }
}

export const workoutRepository = new WorkoutRepository();
