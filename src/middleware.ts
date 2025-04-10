import { NextRequest, NextResponse, userAgent } from 'next/server';

import { cookies } from 'next/headers';

import { v4 as uuidv4 } from 'uuid';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/auth/signin', '/auth/signup', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const accessToken = (await cookies()).get('access-token')?.value;

  const deviceToken = (await cookies()).get('device-token')?.value;

  if (!deviceToken) {
    const newDeviceToken = uuidv4();
    const cookieStore = await cookies();
    cookieStore.set('device-token', newDeviceToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/'
    });
  }

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // if (isPublicRoute && !accessToken && req.nextUrl.pathname.startsWith('/')) {
  //   return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
  // }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'] // checks all routes except for API routes and static files
};
