import { workoutController } from '@livfit/lib/server';

export async function GET(request: Request) {
  return workoutController.getPlans(request);
}

export async function POST(request: Request) {
  return workoutController.generate(request);
}

