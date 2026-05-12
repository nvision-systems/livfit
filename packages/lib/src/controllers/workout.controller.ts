import { NextResponse } from 'next/server';
import { workoutService } from '../services/workout.service';

export const workoutController = {
  async getPlans(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get('userId') || 'patient-1';
      const plans = await workoutService.getUserPlans(userId);
      return NextResponse.json(plans);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
    }
  },

  async generate(request: Request) {
    try {
      const { userId, meldScore } = await request.json();
      const plan = await workoutService.generatePlan(userId || 'patient-1', meldScore);
      return NextResponse.json(plan);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
    }
  },

  async log(request: Request) {
    try {
      const logData = await request.json();
      const result = await workoutService.logExercise(logData);
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to log workout' }, { status: 500 });
    }
  }
};
