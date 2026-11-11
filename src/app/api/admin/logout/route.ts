import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set("ama_admin_session", "", { httpOnly: true, expires: new Date(0), path: "/" });
  return response;
}
