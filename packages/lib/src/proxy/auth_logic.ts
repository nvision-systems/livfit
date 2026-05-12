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

  // REDIRECT GUARD: Never run auth logic on login/signup to prevent loops
  if (pathname === '/login' || pathname === '/signup') {
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

  // SILENT AUTH BYPASS FOR DEMO (If no real user or no Supabase connection)
  if (!user) {
    let mockUser: any = mockDemoUsers.patient;
    
    if (pathname.includes('/admin')) {
      mockUser = mockDemoUsers.admin;
    } else if (pathname.includes('/dietician')) {
      mockUser = mockDemoUsers.dietician;
    }

    // Transform mockUser to match Supabase user/profile structure minimally
    const demoUser = {
      id: mockUser.id,
      email: mockUser.email,
      user_metadata: mockUser,
      app_metadata: { role: mockUser.role }
    };
    
    return { response, user: demoUser, profile: mockUser, supabase };
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
