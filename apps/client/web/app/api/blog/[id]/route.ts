import { blogController } from '@livfit/lib';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return blogController.getById(params.id);
}

// ... other handlers (PUT/DELETE) can be added to controller similarly

