import { NextResponse } from 'next/server';
import { workoutService } from '../services/workout.service';

export const workoutController = {
  async getPlans() {
    try {
      const plans = await workoutService.getUserPlans();
      return NextResponse.json(plans);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
    }
  },

  async generate(request: Request) {
    try {
      const { meldScore } = await request.json();
      const plan = await workoutService.generatePlan(meldScore);
      return NextResponse.json(plan);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
    }
  },

  async log(request: Request) {
    try {
      const { workoutId, metrics } = await request.json();
      const result = await workoutService.logWorkout(workoutId, metrics);
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to log workout' }, { status: 500 });
    }
  }
};
