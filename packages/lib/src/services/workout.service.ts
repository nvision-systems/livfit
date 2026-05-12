import { workoutRepository } from '../repositories/workout.repository';
import { getWorkoutIntensity, WORKOUT_TEMPLATES } from '../core';
import { WorkoutPlan, WorkoutLog, WorkoutExercise } from '../types';

export class WorkoutService {
  async getUserPlans(userId: string) {
    return workoutRepository.getPlans(userId);
  }

  async generatePlan(userId: string, meldScore: number) {
    const intensity = getWorkoutIntensity(meldScore);
    const template = WORKOUT_TEMPLATES[intensity as keyof typeof WORKOUT_TEMPLATES] || WORKOUT_TEMPLATES.VERY_LOW;
    
    const plan: Partial<WorkoutPlan> = {
      user_id: userId,
      name: `Plan for MELD ${meldScore} (${intensity})`,
      intensity: intensity,
      is_active: true,
    };

    const exercises: Partial<WorkoutExercise>[] = template.map((ex) => ({
      name: ex.name,
      sets: ex.sets,
      reps: ex.reps,
      duration_secs: ex.duration,
    }));

    return workoutRepository.createPlan(plan, exercises);
  }

  async logExercise(log: Partial<WorkoutLog>) {
    return workoutRepository.logExercise(log);
  }

  async getLogs(userId: string) {
    return workoutRepository.getLogs(userId);
  }
}

export const workoutService = new WorkoutService();
