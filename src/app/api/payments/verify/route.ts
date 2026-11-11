import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { supabaseRequest } from "@/lib/orders";

export const runtime = "nodejs";

interface PaymentVerificationRequest {
  razorpay_order_id?: unknown;
  razorpay_payment_id?: unknown;
  razorpay_signature?: unknown;
}

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_SECRET_ID;
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!secret || !keyId) {
    console.error("Razorpay secret is not configured.");
    return NextResponse.json(
      { error: "Payments are not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  let body: PaymentVerificationRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payment verification request." }, { status: 400 });
  }

  const orderId = body.razorpay_order_id;
  const paymentId = body.razorpay_payment_id;
  const signature = body.razorpay_signature;
  if (
    typeof orderId !== "string" ||
    typeof paymentId !== "string" ||
    typeof signature !== "string" ||
    !orderId ||
    !paymentId ||
    !signature
  ) {
    return NextResponse.json({ error: "Incomplete payment confirmation." }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  const signaturesMatch =
    signature.length === expectedSignature.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));

  if (!signaturesMatch) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  const paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${keyId}:${secret}`,
      ).toString("base64")}`,
    },
  });
  if (!paymentResponse.ok) {
    const details = await paymentResponse.text();
    console.error("Razorpay payment lookup failed.", paymentResponse.status, details);
    return NextResponse.json({ error: "Unable to confirm payment status." }, { status: 502 });
  }

  const payment = (await paymentResponse.json()) as {
    order_id?: string;
    status?: string;
  };
  if (payment.order_id !== orderId || payment.status !== "captured") {
    return NextResponse.json({ error: "Payment has not been captured." }, { status: 400 });
  }

  try {
    const existing = await supabaseRequest<
      { status: string; razorpay_payment_id: string | null }[]
    >(`orders?select=status,razorpay_payment_id&razorpay_order_id=eq.${encodeURIComponent(orderId)}&limit=1`);
    const current = existing[0];
    if (!current) {
      return NextResponse.json({ error: "Order was not found." }, { status: 404 });
    }
    if (current.status === "paid" || current.status === "fulfilled") {
      if (current.razorpay_payment_id === paymentId) {
        return NextResponse.json({ verified: true, paymentId });
      }
      return NextResponse.json({ error: "Order is already linked to another payment." }, { status: 409 });
    }
    if (current.status === "cancelled") {
      return NextResponse.json({ error: "Cancelled orders cannot be paid." }, { status: 409 });
    }
    await supabaseRequest(`orders?razorpay_order_id=eq.${encodeURIComponent(orderId)}&status=eq.pending`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
          razorpay_payment_id: paymentId,
          status: "paid",
          paid_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
    });
  } catch {
    return NextResponse.json({ error: "Payment received but order saving failed." }, { status: 503 });
  }

  return NextResponse.json({ verified: true, paymentId });
}
