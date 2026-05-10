import { blogController } from '@livfit/lib';

export async function GET() {
  return blogController.getAll();
}

export async function POST(request: Request) {
  return blogController.create(request);
}

