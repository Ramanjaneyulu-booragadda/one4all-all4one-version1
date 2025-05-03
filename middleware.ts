import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserToken } from './src/utils/tokenService';
import { hasAnyRole } from './src/utils/roleUtils';
import { roleBasedRoutes } from './src/utils/rolesConfig';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Exclude specific routes from middleware checks
  const excludedRoutes = ['/unauthorized', '/logout'];
  if (excludedRoutes.some((route) => pathname.startsWith(route))) {
    console.log(`🟢 Middleware: Skipping checks for excluded route: ${pathname}`);
    return NextResponse.next();
  }

  // Check for user token
  const tokenString = getUserToken();
  console.log(`🟡 Middleware: Retrieved token: ${tokenString}`);
  const token = tokenString ? JSON.parse(tokenString) : null;
  if (!token) {
    console.log(`🔴 Middleware: No token found. Redirecting to /login.`);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check role-based access
  for (const [route, allowedRoles] of Object.entries(roleBasedRoutes)) {
    if (pathname.startsWith(route)) {
      const userRoles = token.roles || [];
      console.log(`🟡 Middleware: Checking roles for route ${route}. User roles: ${userRoles}`);
      if (!hasAnyRole(userRoles, allowedRoles)) {
        console.log(`🔴 Middleware: Access denied for route ${route}. Redirecting to /unauthorized.`);
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
      return NextResponse.next();
    }
  }

  // Redirect non-admin users to their first accessible route
  const userRoles = token.roles || [];
  for (const [route, allowedRoles] of Object.entries(roleBasedRoutes)) {
    if (hasAnyRole(userRoles, allowedRoles)) {
      console.log(`🟢 Middleware: Redirecting non-admin user to ${route}`);
      return NextResponse.redirect(new URL(route, request.url));
    }
  }

  console.log(`🔴 Middleware: No accessible routes found. Redirecting to /unauthorized.`);
  return NextResponse.redirect(new URL('/unauthorized', request.url));
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};