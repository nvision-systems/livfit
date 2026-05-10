import { workoutRepository } from '../repositories/workout.repository';
import { getWorkoutIntensity, WORKOUT_TEMPLATES } from '../core';

export class WorkoutService {
  async getUserPlans() {
    return workoutRepository.getPlans();
  }

  async generatePlan(meldScore: number) {
    const intensity = getWorkoutIntensity(meldScore);
    const exercises = this.buildExercisesFromRules(intensity);
    // Logic to save plan to repository would go here
    return { intensity, exercises };
  }

  buildExercisesFromRules(intensity: string) {
    return WORKOUT_TEMPLATES[intensity as keyof typeof WORKOUT_TEMPLATES] || WORKOUT_TEMPLATES.VERY_LOW;
  }

  async logWorkout(workoutId: number, metrics: any) {
    // Business validation (e.g. heart rate check) could happen here
    return workoutRepository.logCompletion(workoutId, metrics);
  }
}

export const workoutService = new WorkoutService();
