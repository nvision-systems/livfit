import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { mockDemoUsers } from '../data';

export async function createSharedProxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url === 'your-project-url') {
    return { supabase: null, response };
  }

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  return { supabase, response };
}

export async function validateClinicalSession(request: NextRequest, protectedPaths: string[]) {
  const pathname = request.nextUrl.pathname;

  // REDIRECT GUARD: Never run auth logic on login/signup or the public landing page to prevent loops
  if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
    return { response: NextResponse.next(), user: null, profile: null, supabase: null };
  }

  const { supabase, response } = await createSharedProxy(request);
  
  let user = null;
  let profile = null;

  if (supabase) {
    const { data } = await supabase.auth.getUser();
    user = data.user;

    if (user) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      profile = profileData;
    }
  }

  // Check if current path is protected
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  // If no real session and path is protected, redirect to login
  if (!user && isProtected) {
    // In strict demo mode, we might want to skip redirection for now to allow local dev
    // but for the landing page task, we must ensure unauthenticated users land on /
    return { response: NextResponse.redirect(new URL('/login', request.url)), user: null, profile: null, supabase };
  }

  // If no real session and path is NOT protected (like /), allow access
  if (!user && !isProtected) {
    return { response: NextResponse.next(), user: null, profile: null, supabase };
  }

  // RBAC Role Categories
  const clinicalRoles = ['HEPATOLOGIST', 'TRANSPLANT_COORDINATOR', 'GASTROENTEROLOGIST', 'SURGEON', 'DIETICIAN', 'DOCTOR', 'SPECIALIST'];
  const staffRoles = ['ADMIN', 'SUPERADMIN', 'HEALTH_EDUCATOR'];
  const externalStakeholders = ['RESEARCHER', 'INSURANCE'];

  // Role-based Access Control (RBAC)
  if (pathname.startsWith('/admin') && profile?.role !== 'ADMIN' && profile?.role !== 'SUPERADMIN') {
    return { response: NextResponse.redirect(new URL('/login', request.url)), user, profile, supabase };
  }

  if (pathname.startsWith('/dietician') && !clinicalRoles.includes(profile?.role || '') && profile?.role !== 'ADMIN') {
    return { response: NextResponse.redirect(new URL('/login', request.url)), user, profile, supabase };
  }

  if (pathname.startsWith('/external')) {
    const allowedExternal = [...clinicalRoles, ...externalStakeholders, ...staffRoles];
    if (!profile?.role || !allowedExternal.includes(profile.role)) {
      return { response: NextResponse.redirect(new URL('/login', request.url)), user, profile, supabase };
    }
  }

  if (pathname.startsWith('/content')) {
    const allowedContentRoles = ['HEALTH_EDUCATOR', 'ADMIN', 'SUPERADMIN'];
    if (!profile?.role || !allowedContentRoles.includes(profile.role)) {
      return { response: NextResponse.redirect(new URL('/login', request.url)), user, profile, supabase };
    }
  }

  return { response, user, profile, supabase };
}
