import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: any) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // If no token and not navigating to the home ("/") page, redirect to "/"
  if (!token && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow requests if the token exists
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create-item",
    "/edit-item/:path*", 
  ],
};
