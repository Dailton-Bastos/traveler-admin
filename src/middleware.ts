import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '~/@types/supabase';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.auth.getSession();

  const redirectToDashboard =
    (user && req.nextUrl.pathname === '/') ||
    (user && req.nextUrl.pathname === '/forgot');

  if (redirectToDashboard) {
    return NextResponse.redirect(new URL('/cities', req.url));
  }

  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/', '/forgot', '/cities'],
};
