import { NextResponse } from 'next/server';
import { dietService } from '../services/diet.service';

export const dietController = {
  async getPlans(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get('userId') || 'patient-1'; // Default to demo user if not provided
      const plans = await dietService.getPlans(userId);
      return NextResponse.json(plans);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch diet plans' }, { status: 500 });
    }
  },

  async update(request: Request) {
    try {
      const { planId, planData } = await request.json();
      const result = await dietService.updatePlan(planId, planData);
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update diet plan' }, { status: 500 });
    }
  }
};
