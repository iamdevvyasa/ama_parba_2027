import { NextResponse } from "next/server";
import { getCustomisedUnitPrice, getStandardUnitPrice } from "@/data/products";
import type { ProductVariant } from "@/types";
import {
  normaliseCustomerDetails,
  supabaseRequest,
  type CustomerDetails,
} from "@/lib/orders";

export const runtime = "nodejs";

const MAX_QUANTITY = 50;

function isProductVariant(value: unknown): value is ProductVariant {
  return value === "standard" || value === "customised";
}

export async function POST(request: Request) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_SECRET_ID;

  if (!keyId || !keySecret) {
    console.error("Razorpay credentials are not configured.");
    return NextResponse.json(
      { error: "Payments are not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  let body: { variant?: unknown; quantity?: unknown; customer?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payment request." }, { status: 400 });
  }

  const quantity = Number(body.quantity);
  const customer = normaliseCustomerDetails(body.customer);
  if (
    !isProductVariant(body.variant) ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > MAX_QUANTITY ||
    !customer
  ) {
    return NextResponse.json({ error: "Please provide valid delivery details." }, { status: 400 });
  }

  const unitPrice =
    body.variant === "standard"
      ? getStandardUnitPrice(quantity)
      : getCustomisedUnitPrice(quantity);
  const amount = unitPrice * quantity * 100;
  const receipt = `ama-${body.variant}-${Date.now()}`;

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt,
      notes: {
        product: body.variant,
        quantity: String(quantity),
      },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Razorpay order creation failed.", response.status, details);
    return NextResponse.json(
      { error: "Unable to start payment. Please try again." },
      { status: 502 },
    );
  }

  const order = (await response.json()) as { id: string; amount: number; currency: string };
  try {
    await supabaseRequest("orders", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        razorpay_order_id: order.id,
        product: body.variant,
        quantity,
        amount_paise: amount,
        ...customerToDatabase(customer),
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to save your order. Please try again." },
      { status: 503 },
    );
  }
  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId,
    product: body.variant,
    quantity,
  });
}

function customerToDatabase(customer: CustomerDetails) {
  return {
    customer_name: customer.name,
    customer_email: customer.email,
    customer_phone: customer.phone,
    address_line1: customer.addressLine1,
    address_line2: customer.addressLine2,
    city: customer.city,
    state: customer.state,
    postal_code: customer.postalCode,
  };
}
