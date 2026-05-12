import { type NextRequest } from 'next/server';
import { validateClinicalSession } from '@livfit/lib';

export async function proxy(request: NextRequest) {
  // Protect all staff hub routes
  const { response } = await validateClinicalSession(request, [
    '/admin',
    '/dietician',
    '/content'
  ]);
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
