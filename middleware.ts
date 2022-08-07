import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.JWT_SECRET;

export default async function middleware(req: NextRequest) {
  // token will exist if user is logged in
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;

  // allow the request if the following is true
  // 1) its a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // redirect them to login if they dont have token AND are requesting a protected route
  if (!token && pathname !== "/login") {
    // const url = req.nextUrl.clone();
    // url.pathname = "/login";
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/api/auth/:path*"],
};
