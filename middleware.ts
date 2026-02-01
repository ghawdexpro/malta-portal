import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function isValidSession(req: NextRequest): Promise<boolean> {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookie || !process.env.ADMIN_PASSWORD) return false;
  const expected = await hashPassword(process.env.ADMIN_PASSWORD);
  return cookie === expected;
}

function hasBearerToken(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  const token = auth.slice(7);
  return token === process.env.BOT_API_KEY;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin pages (except login page)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const valid = await isValidSession(request);
    if (!valid) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // TikTok API routes: accept admin cookie OR Bearer token
  if (pathname.startsWith("/api/tiktok")) {
    const validSession = await isValidSession(request);
    if (!validSession && !hasBearerToken(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/tiktok/:path*"],
};
