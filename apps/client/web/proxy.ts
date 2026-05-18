import { type NextRequest } from 'next/server';
import { validateClinicalSession } from '@livfit/lib/server';

export default async function proxy(request: NextRequest) {
  const { response } = await validateClinicalSession(request, [
    '/dashboard',
    '/onboarding',
    '/admin',
    '/dietician'
  ]);
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

