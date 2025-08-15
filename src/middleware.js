import { NextResponse } from "next/server";

// Admin auth pages that logged-in admins shouldn't access
const adminAuthPages = ["/admin/login"];

// Admin protected routes
const adminProtectedRoutes = ["/admin", "/admin/:path*"];

// Regular protected routes for users
const userProtectedRoutes = ["/user-profile", "/user-profile/:path*"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("hamza_web_token")?.value || null;
  // const userToken = request.cookies.get("hamza_web_token")?.value || null;

  // 1. Handle admin auth pages redirect
  if (adminAuthPages.some((page) => pathname.startsWith(page))) {
    if (token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // 2. Handle admin protected routes
  if (adminProtectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (!token) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    return NextResponse.next();
  }

  // 3. Handle user protected routes
  if (userProtectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user-profile/:path*"],
};
