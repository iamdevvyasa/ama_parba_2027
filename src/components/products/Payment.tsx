"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, CheckCircle2, MessageCircle, Minus, Plus, X } from "lucide-react";
import { SambalpuriBorder } from "@/components/ui/SambalpuriBorder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatINR } from "@/lib/utils";
import {
  getStandardUnitPrice,
  getCustomisedUnitPrice,
  getStandardTierSavings,
  getCustomisedTierSavings,
} from "@/data/products";

/** Subtle traditional corner motif */
function OdiaCornerMotif({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotateClass = {
    tl: "",
    tr: "rotate-90",
    br: "rotate-180",
    bl: "-rotate-90",
  }[position];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute h-5 w-5 select-none opacity-40 ${rotateClass} ${
        position.includes("t") ? "top-2.5" : "bottom-2.5"
      } ${position.includes("l") ? "left-2.5" : "right-2.5"}`}
    >
      <svg viewBox="0 0 28 28" className="h-full w-full" fill="none">
        <path d="M 2 26 L 2 2 L 26 2" stroke="#751F25" strokeWidth="1.2" />
        <polygon points="10,6 14,10 10,14 6,10" fill="#D88945" />
      </svg>
    </div>
  );
}

export function Payment() {
  const [standardQty, setStandardQty] = useState<number>(1);
  const [customisedQty, setCustomisedQty] = useState<number>(1);
  const [paymentState, setPaymentState] = useState<{
    variant: "standard" | "customised";
    status: "loading" | "success" | "error";
    message: string;
  } | null>(null);
  const [checkoutVariant, setCheckoutVariant] = useState<"standard" | "customised" | null>(null);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  async function startPayment(
    event: React.FormEvent<HTMLFormElement>,
    variant: "standard" | "customised",
    quantity: number,
  ) {
    event.preventDefault();
    setCheckoutVariant(null);
    setPaymentState({ variant, status: "loading", message: "Preparing secure checkout..." });

    try {
      const orderResponse = await fetch("/api/payments/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant, quantity, customer }),
      });
      const order = (await orderResponse.json()) as { error?: string; orderId?: string; amount?: number; currency?: string; keyId?: string };
      if (!orderResponse.ok || !order.orderId || !order.amount || !order.currency || !order.keyId) {
        throw new Error(order.error ?? "Unable to start payment.");
      }

      await new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
        );
        if (existingScript) {
          if (window.Razorpay) resolve();
          else existingScript.addEventListener("load", () => resolve(), { once: true });
          return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Unable to load payment checkout."));
        document.body.appendChild(script);
      });

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Ama Parba",
        description: variant === "standard" ? "The Ama Parba Box" : "The Personalised Ama Parba Box",
        order_id: order.orderId,
        theme: { color: "#751F25" },
        handler: async (response) => {
          try {
            const verificationResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verification = (await verificationResponse.json()) as { error?: string };
            if (!verificationResponse.ok) {
              throw new Error(verification.error ?? "Payment verification failed.");
            }
            setPaymentState({
              variant,
              status: "success",
              message:
                variant === "standard"
                  ? "Your order is confirmed. It will be dispatched soon, and further updates will be shared on your phone and email."
                  : "Your payment is confirmed. Our team will message you on WhatsApp for the personalisation details.",
            });
          } catch (error) {
            setPaymentState({
              variant,
              status: "error",
              message: error instanceof Error ? error.message : "Payment verification failed.",
            });
          }
        },
        modal: {
          ondismiss: () =>
            setPaymentState({ variant, status: "error", message: "Payment was cancelled." }),
        },
      });
      razorpay.open();
    } catch (error) {
      setPaymentState({
        variant,
        status: "error",
        message: error instanceof Error ? error.message : "Unable to start payment.",
      });
    }
  }

  // Simple / Standard Box Pricing calculations
  const standardUnitPrice = getStandardUnitPrice(standardQty);
  const standardTotal = standardQty * standardUnitPrice;
  const standardCardCount = standardQty * 13;
  const standardSavings = getStandardTierSavings(standardQty);

  // Customised / Personalised Box Pricing calculations
  const customisedUnitPrice = getCustomisedUnitPrice(customisedQty);
  const customisedTotal = customisedQty * customisedUnitPrice;
  const customisedCardCount = customisedQty * 14;
  const customisedSavings = getCustomisedTierSavings(customisedQty);

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#FAF6EE] py-section">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/ama-parba-product.jpg"
          alt=""
          fill
          sizes="100vw"
          className="scale-[1.12] rotate-[4deg] object-cover opacity-60 blur-[3px] saturate-100"
        />
      </div>
      <SambalpuriBorder className="absolute inset-x-0 top-0 z-10" />

      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="Pricing · ମୂଲ୍ୟ"
          heading="Choose your Parba (ପର୍ବ) edition"
          lead="Buy a single Smruti (ସ୍ମୃତି), or save more with festival gifting rates."
          align="center"
        />

        {/* Pricing Cards Grid */}
        <div className="mt-12 flex justify-center">
          <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
            {/* ================= 1. STANDARD BOX ================= */}
            <div className="relative flex flex-col justify-between rounded-card border-2 border-maroon/25 bg-[#FDFBF7]/60 p-6 shadow-soft backdrop-blur-[3px] sm:p-7">
              <OdiaCornerMotif position="tl" />
              <OdiaCornerMotif position="tr" />
              <OdiaCornerMotif position="bl" />
              <OdiaCornerMotif position="br" />

              <div>
                {/* Header */}
                <div className="border-b border-earth/10 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-maroon">
                      Standard Parba Edition
                    </span>
                    <span className="shrink-0 rounded-pill bg-maroon/10 px-3 py-1 font-sans text-xs font-semibold text-maroon">
                      13 Cards
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-fluid-xl font-bold text-earth-900 sm:whitespace-nowrap">
                    The Ama Parba Box
                  </h3>
                  <p className="mt-2 flex min-h-[38px] items-center text-fluid-xs text-earth-600">
                    13 illustrated cards celebrating Odisha&apos;s cultural Barsha (ବର୍ଷ).
                  </p>
                </div>

                {/* Lower price for more orders tier buttons */}
                <div className="mt-5">
                  <div className="flex h-7 items-center justify-between text-[11px] font-semibold text-earth-500">
                    <span>Order more, pay less:</span>
                    {standardSavings > 0 ? (
                      <span className="inline-flex items-center rounded-pill border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                        Save {formatINR(standardSavings)}
                      </span>
                    ) : (
                      <span className="text-[11px] text-earth-400">Bulk discount rates</span>
                    )}
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {[
                      { qty: 1, label: "1 Box", rate: 249, save: null },
                      { qty: 5, label: "5 Boxes", rate: 219, save: "Save ₹150" },
                      { qty: 10, label: "10 Boxes", rate: 199, save: "Save ₹500" },
                    ].map((tier) => {
                      const active =
                        tier.qty === 10
                          ? standardQty >= 10
                          : tier.qty === 5
                          ? standardQty >= 5 && standardQty < 10
                          : standardQty < 5;

                      return (
                        <button
                          key={tier.qty}
                          type="button"
                          onClick={() => setStandardQty(tier.qty)}
                          className={`flex h-[76px] flex-col items-center justify-center rounded-panel border p-2 transition-all ${
                            active
                              ? "border-maroon bg-maroon text-ivory shadow-soft"
                              : "border-earth/15 bg-ivory/60 text-earth-800 hover:border-maroon/30 hover:bg-white"
                          }`}
                        >
                          <span className="text-[11px] font-semibold">{tier.label}</span>
                          <span className="mt-0.5 font-display text-base font-bold">
                            {formatINR(tier.rate)}
                            <span className={`text-[10px] font-normal ${active ? "text-ivory/80" : "text-earth-400"}`}>
                              /ea
                            </span>
                          </span>
                          {tier.save ? (
                            <span
                              className={`mt-1 rounded-pill px-1.5 py-0.5 text-[9px] font-bold ${
                                active
                                  ? "bg-emerald-400 text-earth-900"
                                  : "border border-emerald-300/80 bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {tier.save}
                            </span>
                          ) : (
                            <span className="mt-1 invisible text-[9px] py-0.5">Base</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Compact Quantity Stepper */}
                <div className="mt-5 flex h-[48px] items-center justify-between rounded-panel border border-earth/15 bg-white px-4">
                  <span className="text-xs font-semibold text-earth-600">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStandardQty((q) => Math.max(1, q - 1))}
                      disabled={standardQty <= 1}
                      aria-label="Decrease quantity"
                      className="grid h-8 w-8 place-items-center rounded-full border border-earth/20 bg-ivory text-earth-800 transition-colors hover:border-maroon hover:text-maroon disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="min-w-[40px] text-center font-display text-lg font-bold text-earth-900">
                      {standardQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setStandardQty((q) => Math.min(50, q + 1))}
                      aria-label="Increase quantity"
                      className="grid h-8 w-8 place-items-center rounded-full border border-earth/20 bg-ivory text-earth-800 transition-colors hover:border-maroon hover:text-maroon"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                {/* Features (strictly parallel height) */}
                <ul className="mt-5 space-y-2 text-xs text-earth-700 min-h-[86px]">
                  <li className="flex min-h-[18px] items-start gap-2">
                    <Check size={14} className="mt-0.5 text-maroon shrink-0" strokeWidth={2.4} />
                    <span>13 parba illustrations with Odia & English stories</span>
                  </li>
                  <li className="flex min-h-[18px] items-start gap-2">
                    <Check size={14} className="mt-0.5 text-maroon shrink-0" strokeWidth={2.4} />
                    <span>Free delivery across India</span>
                  </li>
                </ul>
                <div className="mt-4 rounded-panel border border-maroon/15 bg-maroon/[0.04] px-3 py-3 text-xs leading-relaxed text-earth-700">
                  <span className="font-semibold text-maroon">After you buy:</span> Your order is
                  confirmed instantly. We will dispatch it soon and share further updates on your
                  phone and email.
                </div>
              </div>

              {/* Total & Action */}
              <div className="mt-6 border-t border-earth/10 pt-4">
                <div className="flex min-h-[36px] items-baseline justify-between">
                  <span className="text-xs text-earth-500">
                    Total ({standardCardCount} cards):
                  </span>
                  <div className="flex items-baseline gap-2">
                    {standardSavings > 0 && (
                      <span className="font-sans text-sm font-medium line-through text-earth-400">
                        {formatINR(standardQty * 249)}
                      </span>
                    )}
                    <span className="font-display text-fluid-2xl font-bold text-maroon">
                      {formatINR(standardTotal)}
                    </span>
                  </div>
                </div>

                <div className="mt-1 flex h-6 items-center justify-between text-xs">
                  <span className="text-earth-400">
                    ({formatINR(standardUnitPrice)}/box)
                  </span>
                  {standardSavings > 0 ? (
                    <span className="inline-flex items-center rounded-pill border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 font-sans text-[11px] font-bold text-emerald-700">
                      You Save {formatINR(standardSavings)}
                    </span>
                  ) : (
                    <span className="invisible text-[11px]">Save</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutVariant("standard")}
                  disabled={paymentState?.status === "loading"}
                  className="mt-3 flex h-[44px] w-full items-center justify-center gap-2 rounded-pill bg-maroon px-5 font-sans text-xs font-semibold text-ivory shadow-soft transition-all hover:bg-maroon-600 active:scale-98"
                >
                  <span>{paymentState?.variant === "standard" && paymentState.status === "loading" ? "Opening checkout..." : "Pay securely"}</span>
                  <ArrowRight size={14} />
                </button>
                {paymentState?.variant === "standard" && (
                  <p className={`mt-2 text-center text-xs ${paymentState.status === "success" ? "text-emerald-700" : "text-earth-500"}`}>
                    {paymentState.message}
                  </p>
                )}
              </div>
            </div>

            {/* ================= 2. PERSONALISED BOX ================= */}
            <div className="relative flex flex-col justify-between rounded-card border-2 border-saffron/40 bg-[#FFFDF9]/60 p-6 shadow-soft backdrop-blur-[3px] sm:p-7">
              <OdiaCornerMotif position="tl" />
              <OdiaCornerMotif position="tr" />
              <OdiaCornerMotif position="bl" />
              <OdiaCornerMotif position="br" />

              <div>
                {/* Header */}
                <div className="border-b border-earth/10 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-saffron-900">
                      Personalised (ନିଜର) Edition
                    </span>
                    <span className="shrink-0 rounded-pill bg-saffron/25 px-3 py-1 font-sans text-xs font-semibold text-saffron-900">
                      14 Cards
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-fluid-xl font-bold text-earth-900 sm:whitespace-nowrap">
                    The Personalised Box
                  </h3>
                  <p className="mt-2 flex min-h-[38px] items-center text-fluid-xs text-earth-600">
                    13 parba cards + 1 card illustrated around your personal date.
                  </p>
                </div>

                {/* Lower price for more orders tier buttons */}
                <div className="mt-5">
                  <div className="flex h-7 items-center justify-between text-[11px] font-semibold text-earth-500">
                    <span>Order more, pay less:</span>
                    {customisedSavings > 0 ? (
                      <span className="inline-flex items-center rounded-pill border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                        Save {formatINR(customisedSavings)}
                      </span>
                    ) : (
                      <span className="text-[11px] text-earth-400">Bulk discount rates</span>
                    )}
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {[
                      { qty: 1, label: "1 Box", rate: 279, save: null },
                      { qty: 5, label: "5 Boxes", rate: 229, save: "Save ₹250" },
                      { qty: 10, label: "10 Boxes", rate: 219, save: "Save ₹600" },
                    ].map((tier) => {
                      const active =
                        tier.qty === 10
                          ? customisedQty >= 10
                          : tier.qty === 5
                          ? customisedQty >= 5 && customisedQty < 10
                          : customisedQty < 5;

                      return (
                        <button
                          key={tier.qty}
                          type="button"
                          onClick={() => setCustomisedQty(tier.qty)}
                          className={`flex h-[76px] flex-col items-center justify-center rounded-panel border p-2 transition-all ${
                            active
                              ? "border-maroon bg-maroon text-ivory shadow-soft"
                              : "border-earth/15 bg-ivory/60 text-earth-800 hover:border-saffron/40 hover:bg-white"
                          }`}
                        >
                          <span className="text-[11px] font-semibold">{tier.label}</span>
                          <span className="mt-0.5 font-display text-base font-bold">
                            {formatINR(tier.rate)}
                            <span className={`text-[10px] font-normal ${active ? "text-ivory/80" : "text-earth-400"}`}>
                              /ea
                            </span>
                          </span>
                          {tier.save ? (
                            <span
                              className={`mt-1 rounded-pill px-1.5 py-0.5 text-[9px] font-bold ${
                                active
                                  ? "bg-emerald-400 text-earth-900"
                                  : "border border-emerald-300/80 bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {tier.save}
                            </span>
                          ) : (
                            <span className="mt-1 invisible text-[9px] py-0.5">Base</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Compact Quantity Stepper */}
                <div className="mt-5 flex h-[48px] items-center justify-between rounded-panel border border-earth/15 bg-white px-4">
                  <span className="text-xs font-semibold text-earth-600">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCustomisedQty((q) => Math.max(1, q - 1))}
                      disabled={customisedQty <= 1}
                      aria-label="Decrease quantity"
                      className="grid h-8 w-8 place-items-center rounded-full border border-earth/20 bg-ivory text-earth-800 transition-colors hover:border-maroon hover:text-maroon disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="min-w-[40px] text-center font-display text-lg font-bold text-earth-900">
                      {customisedQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCustomisedQty((q) => Math.min(50, q + 1))}
                      aria-label="Increase quantity"
                      className="grid h-8 w-8 place-items-center rounded-full border border-earth/20 bg-ivory text-earth-800 transition-colors hover:border-maroon hover:text-maroon"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                {/* Features (3 specific items, strictly parallel height) */}
                <ul className="mt-5 space-y-2 text-xs text-earth-700 min-h-[86px]">
                  <li className="flex min-h-[18px] items-start gap-2">
                    <Check size={14} className="mt-0.5 text-saffron-900 shrink-0" strokeWidth={2.4} />
                    <span>13 parba cards + 1 personalised special-date card</span>
                  </li>
                  <li className="flex min-h-[34px] items-start gap-2">
                    <Check size={14} className="mt-0.5 text-saffron-900 shrink-0" strokeWidth={2.4} />
                    <span>Personalized names, date and message in Odia or English</span>
                  </li>
                  <li className="flex min-h-[18px] items-start gap-2">
                    <Check size={14} className="mt-0.5 text-saffron-900 shrink-0" strokeWidth={2.4} />
                    <span>Free delivery across India</span>
                  </li>
                </ul>
                <div className="mt-4 flex gap-2 rounded-panel border border-saffron/35 bg-saffron/[0.08] px-3 py-3 text-xs leading-relaxed text-earth-700">
                  <MessageCircle size={15} className="mt-0.5 shrink-0 text-maroon" />
                  <span>
                    <span className="font-semibold text-maroon">How personalisation works:</span>{" "}
                    after payment, our team will message you on WhatsApp for your date, occasion,
                    names and message. We will then create your special card.
                  </span>
                </div>
              </div>

              {/* Total & Action */}
              <div className="mt-6 border-t border-earth/10 pt-4">
                <div className="flex min-h-[36px] items-baseline justify-between">
                  <span className="text-xs text-earth-500">
                    Total ({customisedCardCount} cards):
                  </span>
                  <div className="flex items-baseline gap-2">
                    {customisedSavings > 0 && (
                      <span className="font-sans text-sm font-medium line-through text-earth-400">
                        {formatINR(customisedQty * 279)}
                      </span>
                    )}
                    <span className="font-display text-fluid-2xl font-bold text-maroon">
                      {formatINR(customisedTotal)}
                    </span>
                  </div>
                </div>

                <div className="mt-1 flex h-6 items-center justify-between text-xs">
                  <span className="text-earth-400">
                    ({formatINR(customisedUnitPrice)}/box)
                  </span>
                  {customisedSavings > 0 ? (
                    <span className="inline-flex items-center rounded-pill border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 font-sans text-[11px] font-bold text-emerald-700">
                      You Save {formatINR(customisedSavings)}
                    </span>
                  ) : (
                    <span className="invisible text-[11px]">Save</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutVariant("customised")}
                  disabled={paymentState?.status === "loading"}
                  className="mt-3 flex h-[44px] w-full items-center justify-center gap-2 rounded-pill bg-gradient-to-r from-maroon to-maroon-600 px-5 font-sans text-xs font-semibold text-ivory shadow-soft transition-all hover:shadow-lift active:scale-98"
                >
                  <span>{paymentState?.variant === "customised" && paymentState.status === "loading" ? "Opening checkout..." : "Pay securely"}</span>
                  <ArrowRight size={14} />
                </button>
                {paymentState?.variant === "customised" && (
                  <p className={`mt-2 text-center text-xs ${paymentState.status === "success" ? "text-emerald-700" : "text-earth-500"}`}>
                    {paymentState.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist reassurance line (No AI boilerplate) */}
        <p className="mt-10 text-center font-sans text-xs text-earth-400">
          Free tracked delivery across India · Packed with sneha (ସ୍ନେହ) in Bhubaneswar · No hidden charges
        </p>
      </div>

      {checkoutVariant && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-earth-900/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
        >
          <form
            onSubmit={(event) =>
              startPayment(
                event,
                checkoutVariant,
                checkoutVariant === "standard" ? standardQty : customisedQty,
              )
            }
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-card bg-[#FDFBF7] p-6 shadow-lift sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
                  Secure delivery details
                </p>
                <h2 id="checkout-title" className="mt-1 font-display text-2xl font-bold text-earth-900">
                  Where should we deliver?
                </h2>
                <p className="mt-2 text-sm text-earth-600">
                  Your address is used only to fulfil this order.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutVariant(null)}
                className="rounded-full px-3 py-1 text-2xl leading-none text-earth-500 hover:bg-earth/10"
                aria-label="Close checkout"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["name", "Full name", "text"],
                ["email", "Email address", "email"],
                ["phone", "10-digit phone number", "tel"],
                ["addressLine1", "Address line 1", "text"],
                ["addressLine2", "Address line 2 (optional)", "text"],
                ["city", "City", "text"],
                ["state", "State", "text"],
                ["postalCode", "PIN code", "text"],
              ].map(([field, label, type]) => (
                <label key={field} className={field === "addressLine1" || field === "addressLine2" ? "sm:col-span-2" : ""}>
                  <span className="text-xs font-semibold text-earth-700">{label}</span>
                  <input
                    required={field !== "addressLine2"}
                    type={type}
                    inputMode={field === "phone" || field === "postalCode" ? "numeric" : undefined}
                    maxLength={field === "phone" ? 10 : field === "postalCode" ? 6 : undefined}
                    value={customer[field as keyof typeof customer]}
                    onChange={(event) =>
                      setCustomer((current) => ({ ...current, [field]: event.target.value }))
                    }
                    className="mt-1 min-h-11 w-full rounded-panel border border-earth/20 bg-white px-3 text-sm text-earth-900 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20"
                  />
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-maroon px-5 font-sans text-sm font-semibold text-ivory shadow-soft hover:bg-maroon-600"
            >
              Continue to secure payment
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      )}
      {paymentState?.status === "success" && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-earth-900/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-success-title"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-card bg-[#FDFBF7] p-7 text-center shadow-lift sm:p-9">
            <button
              type="button"
              onClick={() => setPaymentState(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-earth-500 transition-colors hover:bg-earth/10 hover:text-earth-900"
              aria-label="Close payment confirmation"
            >
              <X size={18} />
            </button>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={36} strokeWidth={2} />
            </div>
            <p className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-maroon">
              Payment successful
            </p>
            <h2 id="payment-success-title" className="mt-2 font-display text-3xl font-bold text-earth-900">
              Thank you for choosing Ama Parba
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-earth-600">{paymentState.message}</p>
            {paymentState.variant === "customised" && (
              <div className="mt-5 flex items-center gap-3 rounded-panel bg-saffron/[0.1] px-4 py-3 text-left text-xs leading-relaxed text-earth-700">
                <MessageCircle size={20} className="shrink-0 text-maroon" />
                <span>
                  Please keep your phone available. Our WhatsApp message will contain the next
                  personalisation steps.
                </span>
              </div>
            )}
            {paymentState.variant === "standard" && (
              <div className="mt-5 rounded-panel bg-maroon/[0.05] px-4 py-3 text-left text-xs leading-relaxed text-earth-700">
                <span className="font-semibold text-maroon">What happens next?</span> We will
                dispatch your order soon and share further information through your phone number
                and email.
              </div>
            )}
            <button
              type="button"
              onClick={() => setPaymentState(null)}
              className="mt-6 min-h-11 w-full rounded-pill bg-maroon px-5 font-sans text-sm font-semibold text-ivory transition-colors hover:bg-maroon-600"
            >
              Continue exploring
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
