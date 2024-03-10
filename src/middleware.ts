import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("cl-ds-session");

  if (isLoggedIn && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/pulpit", request.url));
  }

  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/pulpit")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/pulpit", "/"],
};
