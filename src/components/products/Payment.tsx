"use client";

import { useState } from "react";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
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

  const standardWhatsAppText = encodeURIComponent(
`Hi Ama Parba, I would like to Pre-Order:

Product: The Ama Parba Box (Standard Edition)
Quantity: ${standardQty} Box${standardQty > 1 ? "es" : ""} (${standardCardCount} cards)
Total Amount: Rs ${standardTotal} (Rs ${standardUnitPrice}/box)

--- Pre-Order Receiver Details ---
Name: 
Email: 
Phone Number: 
City: 
PIN Code: 

Please confirm my pre-order and share dispatch updates!`
  );

  const customisedWhatsAppText = encodeURIComponent(
`Hi Ama Parba, I would like to Pre-Order:

Product: The Personalised Box (Exclusive 14 Cards)
Quantity: ${customisedQty} Box${customisedQty > 1 ? "es" : ""} (${customisedCardCount} cards)
Total Amount: Rs ${customisedTotal} (Rs ${customisedUnitPrice}/box)

--- Pre-Order Receiver Details ---
Name: 
Email: 
Phone Number: 
City: 
PIN Code: 

--- Custom Date & Occasion Details ---
Date & Occasion: 
Names & Message: 

Please confirm my pre-order and share dispatch updates!`
  );

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#FAF6EE] py-section">
      <SambalpuriBorder className="absolute inset-x-0 top-0 z-10" />

      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="Pricing · ମୂଲ୍ୟ"
          heading="Choose your Parba (ପର୍ବ) edition"
          lead="Pre-order a single Smruti (ସ୍ମୃତି), or save more with festival gifting rates."
          align="center"
        />

        {/* Pricing Cards Grid */}
        <div className="mt-12 flex justify-center">
          <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
            {/* ================= 1. STANDARD BOX ================= */}
            <div className="relative flex flex-col justify-between rounded-card border-2 border-maroon/25 bg-[#FDFBF7] p-6 shadow-soft sm:p-7">
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
                      { qty: 1, label: "1 Box", rate: 349, save: null },
                      { qty: 5, label: "5 Boxes", rate: 319, save: "Save ₹150" },
                      { qty: 10, label: "10 Boxes", rate: 289, save: "Save ₹600" },
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

                {/* Features (3 specific items, strictly parallel height) */}
                <ul className="mt-5 space-y-2 text-xs text-earth-700 min-h-[80px]">
                  <li className="flex min-h-[18px] items-start gap-2">
                    <Check size={14} className="mt-0.5 text-maroon shrink-0" strokeWidth={2.4} />
                    <span>13 parba illustrations with Odia & English stories</span>
                  </li>
                  <li className="flex min-h-[34px] items-start gap-2">
                    <Check size={14} className="mt-0.5 text-maroon shrink-0" strokeWidth={2.4} />
                    <span>Rigid keepsake box with wooden display stand</span>
                  </li>
                  <li className="flex min-h-[18px] items-start gap-2">
                    <Check size={14} className="mt-0.5 text-maroon shrink-0" strokeWidth={2.4} />
                    <span>Free delivery across India</span>
                  </li>
                </ul>
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
                        {formatINR(standardQty * 349)}
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

                <a
                  href={`https://wa.me/918249399817?text=${standardWhatsAppText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex h-[44px] w-full items-center justify-center gap-2 rounded-pill bg-maroon px-5 font-sans text-xs font-semibold text-ivory shadow-soft transition-all hover:bg-maroon-600 active:scale-98"
                >
                  <span>Pre-order on WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* ================= 2. PERSONALISED BOX ================= */}
            <div className="relative flex flex-col justify-between rounded-card border-2 border-saffron/40 bg-[#FFFDF9] p-6 shadow-soft sm:p-7">
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
                      { qty: 1, label: "1 Box", rate: 369, save: null },
                      { qty: 5, label: "5 Boxes", rate: 339, save: "Save ₹150" },
                      { qty: 10, label: "10 Boxes", rate: 299, save: "Save ₹700" },
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
                <ul className="mt-5 space-y-2 text-xs text-earth-700 min-h-[80px]">
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
                        {formatINR(customisedQty * 369)}
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

                <a
                  href={`https://wa.me/918249399817?text=${customisedWhatsAppText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex h-[44px] w-full items-center justify-center gap-2 rounded-pill bg-gradient-to-r from-maroon to-maroon-600 px-5 font-sans text-xs font-semibold text-ivory shadow-soft transition-all hover:shadow-lift active:scale-98"
                >
                  <span>Pre-order on WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist reassurance line (No AI boilerplate) */}
        <p className="mt-10 text-center font-sans text-xs text-earth-400">
          Free tracked delivery across India · Packed with sneha (ସ୍ନେହ) in Bhubaneswar · No hidden charges
        </p>
      </div>
    </section>
  );
}
