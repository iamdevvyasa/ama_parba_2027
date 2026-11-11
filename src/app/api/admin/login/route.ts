import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminSessionToken } from "@/lib/orders";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
  }
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const current = attempts.get(address);
  if (current && current.resetAt > now && current.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }
  if (current && current.resetAt <= now) attempts.delete(address);

  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const submitted = typeof body?.password === "string" ? body.password : "";
  const valid =
    submitted.length === password.length &&
    crypto.timingSafeEqual(Buffer.from(submitted), Buffer.from(password));
  if (!valid) {
    const state = attempts.get(address);
    attempts.set(address, {
      count: (state?.count ?? 0) + 1,
      resetAt: state?.resetAt && state.resetAt > now ? state.resetAt : now + WINDOW_MS,
    });
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }
  attempts.delete(address);

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set("ama_admin_session", createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
