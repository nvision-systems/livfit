import { blogController } from '@livfit/lib';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return blogController.getById(id);
}

// ... other handlers (PUT/DELETE) can be added to controller similarly

