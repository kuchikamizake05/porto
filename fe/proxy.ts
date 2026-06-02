import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/app/lib/jwt';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all routes starting with /admin, except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    if (!(await verifyAdminToken(token))) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (
    (pathname.startsWith('/api/projects') ||
      pathname.startsWith('/api/experiences') ||
      pathname.startsWith('/api/education')) &&
    !['GET', 'HEAD', 'OPTIONS'].includes(request.method)
  ) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    if (!(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/projects/:path*',
    '/api/experiences/:path*',
    '/api/education/:path*',
  ],
};
