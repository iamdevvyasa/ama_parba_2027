"use client";

import React, { useId } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SambalpuriBorder } from "@/components/ui/SambalpuriBorder";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Full-section Sambalpuri Bandha (Ikat) inspired background overlay.
 * Renders a tiled pattern of stepped ikat diamonds, kumbha temple-teeth,
 * and rosette motifs in ivory/saffron on the maroon section bg.
 */
function SambalpuriBackground() {
  const uid = useId().replace(/:/g, "-");
  const patId = `sb-bg-${uid}`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-[0.07]"
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={patId}
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* ---- Central stepped Ikat diamond ---- */}
            {/* Outermost diamond */}
            <polygon points="60,8 112,60 60,112 8,60" fill="none" stroke="#FAF5EC" strokeWidth="1.2" />
            {/* Second step */}
            <polygon points="60,16 104,60 60,104 16,60" fill="none" stroke="#D88945" strokeWidth="1" />
            {/* Third step */}
            <polygon points="60,24 96,60 60,96 24,60" fill="none" stroke="#FAF5EC" strokeWidth="0.8" />
            {/* Fourth step */}
            <polygon points="60,32 88,60 60,88 32,60" fill="none" stroke="#D88945" strokeWidth="0.8" />
            {/* Inner diamond */}
            <polygon points="60,40 80,60 60,80 40,60" fill="none" stroke="#FAF5EC" strokeWidth="0.7" />
            {/* Core diamond fill */}
            <polygon points="60,48 72,60 60,72 48,60" fill="#D88945" opacity="0.4" />
            {/* Centre dot */}
            <circle cx="60" cy="60" r="3" fill="#FAF5EC" opacity="0.5" />

            {/* ---- Kumbha temple-teeth along top edge ---- */}
            <polygon points="0,0 10,12 20,0" fill="none" stroke="#D88945" strokeWidth="0.7" />
            <polygon points="20,0 30,12 40,0" fill="none" stroke="#FAF5EC" strokeWidth="0.7" />
            <polygon points="40,0 50,12 60,0" fill="none" stroke="#D88945" strokeWidth="0.7" />
            <polygon points="60,0 70,12 80,0" fill="none" stroke="#FAF5EC" strokeWidth="0.7" />
            <polygon points="80,0 90,12 100,0" fill="none" stroke="#D88945" strokeWidth="0.7" />
            <polygon points="100,0 110,12 120,0" fill="none" stroke="#FAF5EC" strokeWidth="0.7" />

            {/* ---- Kumbha temple-teeth along bottom edge ---- */}
            <polygon points="0,120 10,108 20,120" fill="none" stroke="#FAF5EC" strokeWidth="0.7" />
            <polygon points="20,120 30,108 40,120" fill="none" stroke="#D88945" strokeWidth="0.7" />
            <polygon points="40,120 50,108 60,120" fill="none" stroke="#FAF5EC" strokeWidth="0.7" />
            <polygon points="60,120 70,108 80,120" fill="none" stroke="#D88945" strokeWidth="0.7" />
            <polygon points="80,120 90,108 100,120" fill="none" stroke="#FAF5EC" strokeWidth="0.7" />
            <polygon points="100,120 110,108 120,120" fill="none" stroke="#D88945" strokeWidth="0.7" />

            {/* ---- Small corner rosettes (Bandha Phula) ---- */}
            {/* Top-left */}
            <circle cx="0" cy="0" r="5" fill="none" stroke="#D88945" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="2" fill="#FAF5EC" opacity="0.35" />
            {/* Top-right */}
            <circle cx="120" cy="0" r="5" fill="none" stroke="#D88945" strokeWidth="0.6" />
            <circle cx="120" cy="0" r="2" fill="#FAF5EC" opacity="0.35" />
            {/* Bottom-left */}
            <circle cx="0" cy="120" r="5" fill="none" stroke="#D88945" strokeWidth="0.6" />
            <circle cx="0" cy="120" r="2" fill="#FAF5EC" opacity="0.35" />
            {/* Bottom-right */}
            <circle cx="120" cy="120" r="5" fill="none" stroke="#D88945" strokeWidth="0.6" />
            <circle cx="120" cy="120" r="2" fill="#FAF5EC" opacity="0.35" />

            {/* ---- Side accent diamonds ---- */}
            {/* Left */}
            <polygon points="0,60 8,52 16,60 8,68" fill="none" stroke="#FAF5EC" strokeWidth="0.6" />
            <polygon points="0,60 4,56 8,60 4,64" fill="#D88945" opacity="0.3" />
            {/* Right */}
            <polygon points="120,60 112,52 104,60 112,68" fill="none" stroke="#FAF5EC" strokeWidth="0.6" />
            <polygon points="120,60 116,56 112,60 116,64" fill="#D88945" opacity="0.3" />
            {/* Top */}
            <polygon points="60,0 52,8 60,16 68,8" fill="none" stroke="#FAF5EC" strokeWidth="0.6" />
            <polygon points="60,0 56,4 60,8 64,4" fill="#D88945" opacity="0.3" />
            {/* Bottom */}
            <polygon points="60,120 52,112 60,104 68,112" fill="none" stroke="#FAF5EC" strokeWidth="0.6" />
            <polygon points="60,120 56,116 60,112 64,116" fill="#D88945" opacity="0.3" />

            {/* ---- Diagonal cross-hatch weave lines ---- */}
            <line x1="8" y1="8" x2="20" y2="20" stroke="#FAF5EC" strokeWidth="0.4" opacity="0.5" />
            <line x1="100" y1="8" x2="112" y2="20" stroke="#FAF5EC" strokeWidth="0.4" opacity="0.5" />
            <line x1="8" y1="112" x2="20" y2="100" stroke="#FAF5EC" strokeWidth="0.4" opacity="0.5" />
            <line x1="100" y1="112" x2="112" y2="100" stroke="#FAF5EC" strokeWidth="0.4" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patId})`} />
      </svg>
    </div>
  );
}

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-maroon py-section text-ivory">
      <SambalpuriBorder className="absolute inset-x-0 top-0" />

      {/* Sambalpuri Bandha inspired background overlay */}
      <SambalpuriBackground />

      <Reveal className="shell relative text-center">
        <div className="relative mx-auto mb-5 aspect-[3/1] h-12 xs:h-14 w-auto">
          <Image
            src="/images/ama-parba-logo-light.png"
            alt="Ama Parba - ଆମ ପର୍ବ"
            fill
            sizes="200px"
            className="object-contain object-center"
          />
        </div>
        <h2 className="mx-auto mt-4 max-w-[18ch] text-fluid-3xl tracking-tighter2 text-ivory balance">
          A little piece of our Ghara (ଘର), made personal.
        </h2>
        <p className="mx-auto mt-6 max-w-[44ch] text-fluid-lg leading-relaxed text-ivory/65">
          Thirteen Parba (ପର୍ବ) in a box, and one card that exists only because of
          a date you gave us.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 xs:flex-row">
          <Button
            href="#collection"
            variant="onDark"
            size="lg"
            className="border-transparent bg-ivory text-maroon hover:bg-ivory-200 hover:text-maroon"
          >
            Explore Collection
            <ArrowRight
              size={17}
              strokeWidth={1.8}
              className="transition-transform duration-base ease-editorial group-hover:translate-x-1"
            />
          </Button>
          <Button href="#pricing" variant="onDark" size="lg">
            Pre-Order Now
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
