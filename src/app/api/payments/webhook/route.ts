import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { supabaseRequest } from "@/lib/orders";

export const runtime = "nodejs";

interface RazorpayWebhook {
  event?: string;
  payload?: {
    payment?: { entity?: { id?: string; order_id?: string; status?: string } };
  };
}

function signaturesMatch(body: string, signature: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return (
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  );
}

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = request.headers.get("x-razorpay-signature");
  const eventId = request.headers.get("x-razorpay-event-id");
  if (!secret || !signature || !eventId) {
    return NextResponse.json({ error: "Invalid webhook configuration." }, { status: 400 });
  }

  const rawBody = await request.text();
  if (!signaturesMatch(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  let body: RazorpayWebhook;
  try {
    body = JSON.parse(rawBody) as RazorpayWebhook;
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  try {
    const existing = await supabaseRequest<{ id: string }[]>(
      `payment_events?select=id&event_id=eq.${encodeURIComponent(eventId)}&limit=1`,
    );
    if (existing.length > 0) return NextResponse.json({ received: true });

    if (body.event !== "payment.captured") {
      await recordWebhookEvent(eventId, body.event ?? "unknown");
      return NextResponse.json({ received: true });
    }

    const payment = body.payload?.payment?.entity;
    if (!payment?.id || !payment.order_id || payment.status !== "captured") {
      return NextResponse.json({ error: "Incomplete payment event." }, { status: 400 });
    }

    const orders = await supabaseRequest<
      { status: string; razorpay_payment_id: string | null }[]
    >(`orders?select=status,razorpay_payment_id&razorpay_order_id=eq.${encodeURIComponent(payment.order_id)}&limit=1`);
    const order = orders[0];
    if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    if (order.status === "paid" || order.status === "fulfilled") {
      if (order.razorpay_payment_id === payment.id) return NextResponse.json({ received: true });
      return NextResponse.json({ error: "Payment conflict." }, { status: 409 });
    }
    if (order.status === "cancelled") {
      return NextResponse.json({ error: "Cancelled order." }, { status: 409 });
    }

    await supabaseRequest(
      `orders?razorpay_order_id=eq.${encodeURIComponent(payment.order_id)}&status=eq.pending`,
      {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({
          razorpay_payment_id: payment.id,
          status: "paid",
          paid_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      },
    );
    await recordWebhookEvent(eventId, body.event);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook processing failed.", error);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}

async function recordWebhookEvent(eventId: string, eventType: string) {
  await supabaseRequest("payment_events", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ event_id: eventId, event_type: eventType }),
  });
}
