"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Check, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SambalpuriBorder } from "@/components/ui/SambalpuriBorder";
import { MotifRosette } from "@/components/ui/Motif";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { unboxing } from "@/data/content";
import { products, unconfirmedProductDetails } from "@/data/products";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/** Delicate traditional Odia corner medallion for the showcase frame */
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
      className={`pointer-events-none absolute z-20 h-6 w-6 select-none ${rotateClass} ${
        position.includes("t") ? "top-2" : "bottom-2"
      } ${position.includes("l") ? "left-2" : "right-2"}`}
    >
      <svg viewBox="0 0 28 28" className="h-full w-full" fill="none">
        <path d="M 2 26 L 2 2 L 26 2" stroke="#FAF5EC" strokeWidth="1" opacity="0.6" />
        <path d="M 5 22 L 5 5 L 22 5" stroke="#D88945" strokeWidth="0.8" opacity="0.8" />
        <polygon points="11,6 15,10 11,14 7,10" fill="#D88945" />
        <circle cx="11" cy="10" r="1.2" fill="#FAF5EC" />
      </svg>
    </div>
  );
}

export function InsideTheBox() {
  const [variant, setVariant] = useState<Product["id"]>("standard");
  const reduced = useReducedMotion();
  const product = products.find((p) => p.id === variant)!;

  return (
    <section id="collection" className="relative overflow-hidden bg-[#FAF6EE] py-section">
      <SambalpuriBorder className="absolute inset-x-0 top-0 z-10" />

      <div className="shell-wide relative z-10">
        <SectionHeading
          eyebrow={unboxing.eyebrow}
          heading={unboxing.heading}
          lead={unboxing.lead}
          align="center"
        />

        {/* ---- Two-Column Showcase: items-start keeps left side 100% stable ---- */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* ================= LEFT: Stable Packaging Showcase ================= */}
          <div className="relative flex flex-col self-start w-full lg:sticky lg:top-28">
            {/* Ambient warm golden glow behind frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-r from-saffron/20 via-maroon/15 to-saffron/20 blur-xl opacity-75"
            />

            <div className="relative overflow-hidden rounded-panel border-2 border-maroon/30 bg-black shadow-deep ring-2 ring-saffron/30">
              {/* Sambalpuri Bandha border accents along top & bottom */}
              <SambalpuriBorder height={7} className="absolute inset-x-0 top-0 z-10 opacity-85" />
              <SambalpuriBorder height={7} className="absolute inset-x-0 bottom-0 z-10 opacity-85" />

              {/* Odia Corner Medallions */}
              <OdiaCornerMotif position="tl" />
              <OdiaCornerMotif position="tr" />
              <OdiaCornerMotif position="bl" />
              <OdiaCornerMotif position="br" />

              {/* Exclusive Packaging Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-maroon/95 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-ivory shadow-soft backdrop-blur-sm ring-1 ring-saffron/40">
                  <Sparkles size={11} className="text-saffron" />
                  Official Packaging Reveal
                </span>
              </div>

              {/* Packaging Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[1000/750]">
                <Image
                  src="/images/packaging.jpg"
                  alt="Ama Parba Official Keepsake Packaging (2027 Edition) — Rigid Box Made in Odisha"
                  fill
                  sizes="(max-width: 1024px) 100vw, 580px"
                  className="object-contain object-center transition-transform duration-slow ease-editorial hover:scale-[1.03]"
                  priority
                />
              </div>

              {/* Bottom caption strip */}
              <div className="flex flex-col gap-1 border-t border-ivory/15 bg-earth-950/95 px-5 py-3 text-ivory backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="font-display text-fluid-xs font-semibold text-saffron flex items-center gap-1.5">
                  <MotifRosette size={11} className="text-saffron" />
                  The Keepsake Box & Outer Sleeve
                </span>
                <span className="font-sans text-[11px] text-ivory/65">
                  Heavyweight rigid box · Packed by hand in Odisha
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: Unboxing Details & Contents ================= */}
          <div className="relative flex flex-col w-full">
            {/* ---- Variant switch ---- */}
            <div className="mb-6 flex justify-start">
              <div
                role="tablist"
                aria-label="Box options"
                className="inline-flex rounded-pill border border-maroon/20 bg-ivory p-1.5 shadow-lift"
              >
                {products.map((p) => (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={variant === p.id}
                    aria-controls="box-panel"
                    onClick={() => setVariant(p.id)}
                    className={cn(
                      "relative min-h-[44px] rounded-pill px-4 font-sans text-fluid-xs font-medium transition-colors duration-base xs:px-5 xs:text-fluid-sm",
                      variant === p.id ? "text-ivory" : "text-earth-600 hover:text-maroon"
                    )}
                  >
                    {variant === p.id && (
                      <motion.span
                        layoutId="unboxing-pill"
                        className="absolute inset-0 rounded-pill bg-gradient-to-r from-maroon to-maroon-600 shadow-soft"
                        transition={
                          reduced ? { duration: 0 } : { duration: 0.35, ease: ease.editorial }
                        }
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">
                      {p.id === "standard"
                        ? "Standard Box (13 Cards)"
                        : "Personalised Box (14 Cards)"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ---- Product unboxing panel with stable min-height ---- */}
            <div
              id="box-panel"
              role="tabpanel"
              className="w-full"
            >
              <div className="rounded-panel border-2 border-maroon/20 bg-gradient-to-b from-[#FAF5EC] via-ivory to-[#F6EDDC] p-6 shadow-lift ring-1 ring-saffron/25 sm:p-8">
                {/* Stable container so height transitions don't shake the page */}
                <div className="min-h-[380px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={product.id}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: ease.editorial }}
                    >
                      <div className="min-h-[28px] mb-2 flex items-center">
                        {product.badge ? (
                          <span className="inline-flex items-center gap-1.5 rounded-pill bg-saffron/20 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-saffron-900">
                            <Sparkles size={11} strokeWidth={2.4} />
                            {product.badge} Edition
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-pill bg-maroon/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-maroon">
                            <MotifRosette size={10} className="text-maroon" />
                            Core Festival Collection
                          </span>
                        )}
                      </div>

                      <h3 className="text-fluid-2xl tracking-tighter2 text-earth-900 font-bold">
                        {product.name}
                      </h3>
                      <p className="mt-1 font-display text-fluid-base italic text-maroon">
                        {product.tagline}
                      </p>
                      <p className="mt-3 text-fluid-sm leading-relaxed text-earth-600">
                        {product.description}
                      </p>

                      <ul className="mt-6 flex flex-col divide-y divide-earth/10 border-y border-earth/10">
                        {product.contents.map((item) => (
                          <li key={item.label} className="flex gap-3.5 py-3.5">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon/10 font-display text-fluid-xs font-semibold text-maroon">
                              {item.count ?? <Check size={14} strokeWidth={2.4} />}
                            </span>
                            <span>
                              <span className="block font-sans text-fluid-sm font-semibold text-earth-900">
                                {item.label}
                              </span>
                              <span className="mt-0.5 block text-fluid-xs leading-relaxed text-earth-500">
                                {item.detail}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-earth/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-fluid-xs text-earth-500">
                    <Package size={13} strokeWidth={1.8} className="mr-1.5 inline text-maroon" />
                    Confirmed before launch: {unconfirmedProductDetails.join(", ").toLowerCase()}.
                  </p>
                  <Button
                    href="#pricing"
                    variant="secondary"
                    size="sm"
                    className="shrink-0 gap-1.5 border-maroon/30 text-maroon hover:bg-maroon/5 font-semibold"
                  >
                    View Pricing & Packs
                    <ArrowDown size={13} strokeWidth={2} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
