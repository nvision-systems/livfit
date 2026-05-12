import { dietController } from '@livfit/lib';

export async function GET(request: Request) {
  return dietController.getPlans(request);
}

export async function POST(request: Request) {
  return dietController.update(request);
}

