import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAdminSessionValid, supabaseRequest } from "@/lib/orders";

export async function GET() {
  const token = (await cookies()).get("ama_admin_session")?.value;
  if (!isAdminSessionValid(token)) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  try {
    const orders = await supabaseRequest<unknown[]>(
      "orders?select=*&order=created_at.desc",
    );
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: "Unable to load orders." }, { status: 503 });
  }
}
