import { workoutController } from '@livfit/lib';

export async function GET() {
  return workoutController.getPlans();
}

export async function POST(request: Request) {
  return workoutController.generate(request);
}

