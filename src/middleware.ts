import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  // const refreshToken = req.cookies.get("refreshToken")?.value;
  const pathname = req.nextUrl.pathname;
  console.log("running---", pathname, accessToken);

  // ----------------------
  // Protected routes: /dashboard/*
  // ----------------------
  if (pathname.startsWith("/dashboard")) {
    // If no accessToken and no refreshToken, redirect to login
    if (!accessToken) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    // Optionally: you can implement refresh logic here if accessToken expired
    return NextResponse.next();
  }

  // ----------------------
  // Guest routes: /login
  // ----------------------
  if (pathname === "/login") {
    // If accessToken exists, redirect to dashboard
    if (accessToken) {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }

  // ----------------------
  // Default: allow all other routes
  // ----------------------
  return NextResponse.next();
}

// Apply middleware only to login and dashboard routes
export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
