import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { mockDemoUsers } from '../data';

export async function createSharedMiddleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL! || process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
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
  const { supabase, response } = await createSharedMiddleware(request);
  
  const { data: { user } } = await supabase.auth.getUser();

  // SILENT AUTH BYPASS FOR DEMO
  if (!user) {
    let mockUser: any = mockDemoUsers.patient;
    const pathname = request.nextUrl.pathname;
    
    if (pathname.includes('/admin')) {
      mockUser = mockDemoUsers.admin;
    } else if (pathname.includes('/dietician')) {
      mockUser = mockDemoUsers.dietician;
    }

    // Transform mockUser to match Supabase user structure minimally
    const demoUser = {
      id: mockUser.id,
      email: mockUser.email,
      user_metadata: mockUser,
      app_metadata: { role: mockUser.role }
    };

    return { response, user: demoUser, supabase };
  }

  return { response, user, supabase };
}
