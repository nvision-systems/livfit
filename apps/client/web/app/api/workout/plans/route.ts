import { workoutController } from '@livfit/lib';

export async function GET(request: Request) {
  return workoutController.getPlans(request);
}

export async function POST(request: Request) {
  return workoutController.generate(request);
}

