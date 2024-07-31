import * as jose from "jose";
import { NextResponse, NextRequest } from "next/server";

const verifyJwt = async (token: string | undefined) => {
  if (!token) {
    return false;
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    await jose.jwtVerify(token, secretKey);
    return true;
  } catch (error) {
    console.error("JWT verification error:", error);
    return false;
  }
};

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const {
    nextUrl: { pathname },
  } = req;

  if (["/", "/:path*"].includes(pathname) && !(await verifyJwt(token))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/login") && (await verifyJwt(token))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [`/((?!api|_next/static|_next/image|media).*)`],
};
