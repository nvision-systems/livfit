import { dietController } from '@livfit/lib';

export async function GET() {
  return dietController.getPlans();
}

export async function POST(request: Request) {
  return dietController.update(request);
}

