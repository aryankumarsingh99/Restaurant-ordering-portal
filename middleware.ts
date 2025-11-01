import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if accessing admin panel
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // For now, just allow access (authentication handled client-side)
    // In production, implement proper JWT/session validation
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
