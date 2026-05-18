import { workoutController } from '@livfit/lib/server';

export async function POST(request: Request) {
  return workoutController.log(request);
}

