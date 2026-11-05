"use client";

import { useState } from "react";
import Image from "next/image";
import { Instagram, X, ArrowUpRight, ShieldCheck, Mail } from "lucide-react";
import { SambalpuriBorder } from "@/components/ui/SambalpuriBorder";
import { MotifRosette } from "@/components/ui/Motif";
import {
  brand,
  footerGroups,
} from "@/data/content";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

type PolicyKey = "replacement" | "shipping" | "privacy";

const policyDetails: Record<
  PolicyKey,
  { title: string; subtitle: string; body: string; highlights: string[] }
> = {
  replacement: {
    title: "Replacement Policy",
    subtitle: "Odisha Handcrafted Keepsake Protection",
    body: "Because each Ama Parba box contains custom handcrafted cards and personalized keepsakes, we do not accept returns or issue cash refunds. However, we stand behind the quality of our craftsmanship 100%. If your order arrives damaged during courier transit, with missing items, or with printing defects, notify us within 48 hours of delivery and we will promptly dispatch a free replacement box to your address.",
    highlights: [
      "100% Free replacement for transit damages or defective items",
      "No returns or refunds for custom personalized cards",
      "Simply share a photo/unboxing video on WhatsApp for immediate replacement",
    ],
  },
  shipping: {
    title: "Shipping & Delivery Policy",
    subtitle: "Pan-India Tracked Courier Dispatch",
    body: "We provide tracked courier delivery across all serviceable pincodes in India. Standard boxes are dispatched within 2-3 business days. Personalised boxes are individually custom-printed and dispatched within 3-4 business days. Real-time courier tracking updates are sent directly to your WhatsApp number once shipped.",
    highlights: [
      "Tracked pan-India courier delivery",
      "Dispatched within 2-3 business days from Odisha",
      "Live tracking link shared on WhatsApp",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Your Celebrations Are Safe With Us",
    body: "We respect your personal privacy. Any special dates, names, personal occasion messages, phone numbers, or addresses shared with Ama Parba are used solely to illustrate, print, and courier your keepsake box. We never sell, rent, or share customer data with third parties.",
    highlights: [
      "Personal occasion details are kept strictly confidential",
      "No third-party data sharing or marketing spam",
      "Secure transactions and order handling",
    ],
  },
};

export function Footer() {
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href === "#replacement-policy") {
      e.preventDefault();
      setActivePolicy("replacement");
    } else if (href === "#shipping-policy") {
      e.preventDefault();
      setActivePolicy("shipping");
    } else if (href === "#privacy-policy") {
      e.preventDefault();
      setActivePolicy("privacy");
    }
  };

  return (
    <footer className="relative overflow-hidden bg-earth-900 text-ivory">
      <SambalpuriBorder className="w-full" />

      <div className="shell relative py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand block */}
          <div className="max-w-sm">
            <div className="relative aspect-[3/1] h-12 w-auto">
              <Image
                src="/images/ama-parba-logo-light.png"
                alt="Ama Parba - ଆମ ପର୍ବ"
                fill
                sizes="180px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-5 text-fluid-sm leading-relaxed text-ivory/70">
              {brand.promise} Illustrated festival cards and personalised
              special-date cards, made in Odisha.
            </p>

            <div className="mt-7">
              <a
                href="https://www.instagram.com/ama_parba_.official?psln=MTFibnJtbGEzbHZ4NQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Ama Parba on Instagram (@ama_parba_.official)"
                className="group inline-flex items-center gap-2.5 rounded-pill border border-ivory/20 bg-ivory/[0.06] px-4 py-2.5 text-ivory/90 shadow-soft transition-all duration-fast hover:border-saffron/70 hover:bg-saffron/20 hover:text-saffron hover:scale-105 active:scale-95"
              >
                <Instagram size={18} strokeWidth={1.8} className="text-saffron transition-transform duration-fast group-hover:scale-110" />
                <span className="font-sans text-xs font-semibold tracking-wide">@ama_parba_.official</span>
                <ArrowUpRight size={13} className="opacity-50 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Link columns + support */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="eyebrow flex items-center gap-2 text-saffron">
                  <MotifRosette size={11} className="text-saffron" />
                  <span>{group.title}</span>
                </h3>
                {/* Readable, pop-out small link badges */}
                <ul className="mt-4 flex flex-wrap gap-2 sm:flex-col sm:items-start sm:gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(link.href, e)}
                        className="group inline-flex items-center gap-1.5 rounded-pill border border-ivory/20 bg-ivory/[0.08] px-3 py-1.5 font-sans text-xs font-medium text-ivory shadow-soft transition-all duration-fast hover:border-saffron/70 hover:bg-saffron/25 hover:text-saffron-300 hover:scale-[1.04] hover:shadow-lift active:scale-95"
                      >
                        <span>{link.label}</span>
                        {link.href.startsWith("#") && !link.href.includes("policy") ? (
                          <ArrowUpRight
                            size={12}
                            strokeWidth={2}
                            className="opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          />
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Direct Support Column */}
            <div>
              <h3 className="eyebrow flex items-center gap-2 text-saffron">
                <MotifRosette size={11} className="text-saffron" />
                <span>Customer Support</span>
              </h3>
              <div className="mt-4 space-y-3 text-fluid-xs text-ivory/80">
                {/* Pop-out WhatsApp Support Button */}
                <div>
                  <a
                    href="https://wa.me/918249399817?text=Hi%20Ama%20Parba%2C%20I%20have%20a%20question%20about%20my%20order."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-pill border border-[#25D366]/40 bg-[#25D366]/20 px-3.5 py-2 font-sans text-xs font-semibold text-white shadow-soft transition-all duration-fast hover:border-[#25D366] hover:bg-[#25D366] hover:shadow-lift hover:scale-105 active:scale-95"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366] group-hover:text-white" />
                    <span>WhatsApp: +91 82493 99817</span>
                  </a>
                </div>

                {/* Email Support */}
                <div>
                  <a
                    href="mailto:amaparba84@gmail.com"
                    className="inline-flex items-center gap-2 rounded-pill border border-saffron/40 bg-saffron/15 px-3.5 py-2 font-sans text-xs font-semibold text-ivory shadow-soft transition-all duration-fast hover:border-saffron hover:bg-saffron/25 hover:text-saffron-300 hover:scale-105 active:scale-95"
                  >
                    <Mail size={14} className="text-saffron" />
                    <span>amaparba84@gmail.com</span>
                  </a>
                </div>

                <p className="pt-1 text-[11px] text-ivory/50">
                  Available for orders & custom card inquiries
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-fluid-xs text-ivory/60">
            © {new Date().getFullYear()} {brand.name} (ଆମ ପର୍ବ). All rights reserved by{" "}
            <a
              href="https://devsamaj.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-saffron transition-colors hover:text-saffron-300 hover:underline"
            >
              Dev Samaj
            </a>
            .
          </p>
          <div className="flex items-center gap-3 text-fluid-xs text-ivory/60">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
            <span>Made with love in Odisha · Celebrating our 13 festivals</span>
          </div>
        </div>
      </div>

      {/* ================= INTERACTIVE POP-OUT POLICY MODAL ================= */}
      {activePolicy && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          onClick={() => setActivePolicy(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-panel border-2 border-saffron/40 bg-[#FAF6EE] p-6 text-earth-900 shadow-deep sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top border trim */}
            <SambalpuriBorder height={6} className="absolute inset-x-0 top-0" />

            {/* Close Button */}
            <button
              onClick={() => setActivePolicy(null)}
              aria-label="Close dialog"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-earth/20 bg-ivory text-earth-600 transition-colors hover:bg-maroon hover:text-ivory"
            >
              <X size={16} strokeWidth={2.2} />
            </button>

            {/* Modal Header */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-maroon/10 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-maroon">
                <ShieldCheck size={12} strokeWidth={2.4} />
                Official Store Policy
              </span>
              <h3 className="mt-3 font-display text-fluid-2xl font-bold text-earth-900">
                {policyDetails[activePolicy].title}
              </h3>
              <p className="font-display text-fluid-xs italic text-maroon">
                {policyDetails[activePolicy].subtitle}
              </p>
            </div>

            {/* Modal Body */}
            <p className="mt-4 text-fluid-xs leading-relaxed text-earth-600">
              {policyDetails[activePolicy].body}
            </p>

            {/* Policy Highlights */}
            <div className="mt-5 rounded-card border border-maroon/15 bg-ivory-200/50 p-4">
              <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-earth-900">
                Key Points:
              </p>
              <ul className="mt-2 space-y-2 text-[11px] text-earth-600">
                {policyDetails[activePolicy].highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-maroon/10 text-maroon font-bold text-[9px]">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action / Help on WhatsApp */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-earth/10 pt-4">
              <a
                href="https://wa.me/918249399817?text=Hi%20Ama%20Parba%2C%20I%20have%20a%20question%20regarding%20your%20replacement%20and%20order%20policy."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-[#25D366] px-4 py-2 font-sans text-xs font-semibold text-white shadow-soft transition-all hover:bg-[#20ba59]"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                <span>Questions? Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => setActivePolicy(null)}
                className="rounded-pill border border-earth/20 px-4 py-2 font-sans text-xs font-semibold text-earth-600 hover:bg-earth/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
