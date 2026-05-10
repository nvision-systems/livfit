import { workoutController } from '@livfit/lib';

export async function POST(request: Request) {
  return workoutController.log(request);
}

