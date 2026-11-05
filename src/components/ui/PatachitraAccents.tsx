import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Authentic Odisha Tala Pattachitra (Palm Leaf Etching) decorative motifs.
 * Rendered with fine hairline strokes to emulate traces carved into palm leaves
 * using a traditional iron stylus (lekhani) and rubbed with natural soot pigment.
 */

interface AccentProps {
  className?: string;
  size?: number;
}

/**
 * Tala Patra Lotus Mandala (Padma Chakra)
 * Inspired by the sacred lotus mandalas and Konark sun wheels in Odia palm leaf manuscripts.
 */
export function PatachitraMandala({ className, size = 460 }: AccentProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "pointer-events-none select-none text-[#3B2B24] opacity-[0.075]",
        className
      )}
    >
      {/* Outer concentric rings & lekhani stipple */}
      <circle cx="200" cy="200" r="192" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="200" cy="200" r="186" strokeWidth="1.2" />
      <circle cx="200" cy="200" r="178" strokeWidth="0.8" />
      <circle cx="200" cy="200" r="168" strokeWidth="0.6" strokeDasharray="1.5 2.5" />

      {/* 16 Outer Lotus Petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = i * 22.5;
        return (
          <g key={i} transform={`rotate(${angle} 200 200)`}>
            {/* Outer petal contour */}
            <path
              d="M200 22 C210 50 224 85 220 115 C215 130 208 140 200 148 C192 140 185 130 180 115 C176 85 190 50 200 22 Z"
              strokeWidth="0.9"
            />
            {/* Central lekhani vein and etched hatching */}
            <line x1="200" y1="35" x2="200" y2="135" strokeWidth="0.6" />
            <line x1="194" y1="65" x2="200" y2="72" strokeWidth="0.5" />
            <line x1="206" y1="65" x2="200" y2="72" strokeWidth="0.5" />
            <line x1="192" y1="85" x2="200" y2="92" strokeWidth="0.5" />
            <line x1="208" y1="85" x2="200" y2="92" strokeWidth="0.5" />
            <line x1="190" y1="105" x2="200" y2="112" strokeWidth="0.5" />
            <line x1="210" y1="105" x2="200" y2="112" strokeWidth="0.5" />
          </g>
        );
      })}

      {/* Middle ring divider */}
      <circle cx="200" cy="200" r="118" strokeWidth="1" />
      <circle cx="200" cy="200" r="112" strokeWidth="0.7" strokeDasharray="2 3" />
      <circle cx="200" cy="200" r="106" strokeWidth="0.8" />

      {/* 8 Intermediate Lotus Petals with fine scrolled tips */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = i * 45 + 22.5;
        return (
          <g key={i} transform={`rotate(${angle} 200 200)`}>
            <path
              d="M200 96 C214 115 222 135 216 155 C210 168 200 174 200 178 C200 174 190 168 184 155 C178 135 186 115 200 96 Z"
              strokeWidth="0.85"
            />
            <line x1="200" y1="105" x2="200" y2="170" strokeWidth="0.6" />
            <circle cx="200" cy="115" r="2" strokeWidth="0.5" />
          </g>
        );
      })}

      {/* Inner sacred lotus core */}
      <circle cx="200" cy="200" r="64" strokeWidth="1" />
      <circle cx="200" cy="200" r="58" strokeWidth="0.6" strokeDasharray="2 2" />

      {/* 8 Core Petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = i * 45;
        return (
          <path
            key={i}
            d="M200 144 C208 156 212 170 208 182 C204 190 200 194 200 196 C200 194 196 190 192 182 C188 170 192 156 200 144 Z"
            transform={`rotate(${angle} 200 200)`}
            strokeWidth="0.8"
          />
        );
      })}

      {/* Lotus Seed Pod (Karnika) */}
      <circle cx="200" cy="200" r="24" strokeWidth="1" />
      <circle cx="200" cy="200" r="18" strokeWidth="0.6" strokeDasharray="1.5 2" />
      <circle cx="200" cy="200" r="8" strokeWidth="0.8" />
      <circle cx="200" cy="200" r="2.5" fill="currentColor" stroke="none" />

      {/* Radiating sun-points in seed pod */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x = 200 + 13 * Math.cos(angle);
        const y = 200 + 13 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="1" fill="currentColor" stroke="none" />;
      })}
    </svg>
  );
}

/**
 * Tala Patra Mayura (Etched Peacock with Kalpavriksha Foliage)
 * Depicts the sacred Odia peacock with fan plume, crest, and floral tendrils.
 */
export function PatachitraPeacock({ className, size = 480 }: AccentProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 450 450"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "pointer-events-none select-none text-[#3B2B24] opacity-[0.07]",
        className
      )}
    >
      {/* Peacock Body & S-Curve Neck */}
      <path
        d="M240 180 C235 150 220 120 200 95 C192 85 180 75 168 76 C158 77 154 88 156 98 C160 115 174 135 188 150 C200 162 215 174 228 190 C242 208 250 230 248 255 C245 285 225 310 195 320 C170 328 142 320 125 302"
        strokeWidth="1.2"
      />
      {/* Breast & Underbelly contour */}
      <path
        d="M168 76 C160 77 150 82 144 90 C138 98 140 110 148 122 C160 140 178 165 192 195 C204 220 208 248 202 275 C196 300 180 320 158 332 C135 344 105 340 85 322"
        strokeWidth="0.9"
      />

      {/* Head, Beak & Crest (Chula) */}
      <path d="M144 90 L125 94 L142 98 Z" strokeWidth="0.9" />
      <circle cx="152" cy="88" r="2.5" strokeWidth="0.8" />
      <circle cx="152" cy="88" r="0.8" fill="currentColor" />
      {/* 3 Crest Feathers */}
      <path d="M158 77 Q150 55 140 45 Q152 48 156 65" strokeWidth="0.75" />
      <circle cx="140" cy="45" r="2.5" strokeWidth="0.75" />
      <path d="M164 76 Q164 50 160 38 Q168 44 167 65" strokeWidth="0.75" />
      <circle cx="160" cy="38" r="2.5" strokeWidth="0.75" />
      <path d="M170 77 Q178 55 184 45 Q178 52 174 68" strokeWidth="0.75" />
      <circle cx="184" cy="45" r="2.5" strokeWidth="0.75" />

      {/* Wing Feathers & Lekhani Cross-hatching */}
      <path
        d="M210 205 C240 200 270 215 285 240 C295 258 292 280 278 298 C260 320 228 328 198 322"
        strokeWidth="1.1"
      />
      <path d="M225 220 C250 220 270 235 278 255 C282 268 278 282 268 295" strokeWidth="0.75" />
      <path d="M238 238 C255 240 268 252 272 268" strokeWidth="0.6" />
      {/* Lekhani Wing Hatching */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={i}
          x1={220 + i * 10}
          y1={240 + i * 8}
          x2={205 + i * 11}
          y2={275 + i * 6}
          strokeWidth="0.6"
        />
      ))}

      {/* Ornate Tail Ocelli (Peacock Eyes & Plumes) */}
      <g strokeWidth="0.85">
        {/* Plume 1 */}
        <path d="M250 250 C290 235 340 240 375 270 C395 288 405 315 398 340 C390 368 360 388 328 385 C295 382 272 355 270 325" />
        <circle cx="355" cy="320" r="18" />
        <circle cx="355" cy="320" r="10" strokeDasharray="1.5 2" />
        <circle cx="355" cy="320" r="4" fill="currentColor" stroke="none" />

        {/* Plume 2 */}
        <path d="M245 270 C300 280 345 315 365 360 C378 390 368 420 342 435 C315 448 280 438 262 412 C248 390 252 360 262 335" />
        <circle cx="325" cy="390" r="16" />
        <circle cx="325" cy="390" r="9" strokeDasharray="1.5 2" />
        <circle cx="325" cy="390" r="3.5" fill="currentColor" stroke="none" />

        {/* Plume 3 (Top arching plume) */}
        <path d="M235 220 C270 180 320 160 370 170 C410 180 435 215 430 255 C425 290 395 315 360 312" />
        <circle cx="385" cy="225" r="16" />
        <circle cx="385" cy="225" r="8" strokeDasharray="1.5 2" />
        <circle cx="385" cy="225" r="3" fill="currentColor" stroke="none" />

        {/* Plume 4 (High crest plume) */}
        <path d="M220 180 C250 130 300 100 355 105 C395 110 422 138 420 175 C418 205 392 225 365 220" />
        <circle cx="370" cy="145" r="14" />
        <circle cx="370" cy="145" r="7" strokeDasharray="1.5 2" />
        <circle cx="370" cy="145" r="2.5" fill="currentColor" stroke="none" />
      </g>

      {/* Traditional Odia Lata (Floral Creeper) at base */}
      <path
        d="M60 380 C90 360 125 365 155 385 C185 405 220 410 250 395 C280 380 300 350 320 360 C340 370 350 400 375 410"
        strokeWidth="1"
      />
      {/* Small etched buds & curls */}
      <path d="M100 365 C95 345 110 330 125 340 C135 348 130 365 118 368" strokeWidth="0.75" />
      <path d="M190 398 C192 378 212 370 224 382 C232 392 225 408 210 405" strokeWidth="0.75" />
    </svg>
  );
}

/**
 * Tala Patra Gaja (Royal Odia Caparisoned Elephant with Lotus)
 * Classical motif of Gajapati heritage found in Puri palm leaf manuscripts.
 */
export function PatachitraElephant({ className, size = 440 }: AccentProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 420 380"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "pointer-events-none select-none text-[#3B2B24] opacity-[0.07]",
        className
      )}
    >
      {/* Elephant Back, Head & Rump Curve */}
      <path
        d="M100 240 C95 210 98 175 118 150 C140 120 180 110 215 115 C265 120 305 130 330 165 C345 185 350 210 345 235 L345 320 L315 320 L315 270 C300 275 285 275 270 270 L270 320 L240 320 L240 265 C220 268 200 268 180 265 L180 320 L150 320 L150 270 C135 275 120 275 108 270 L108 320 L80 320 L80 250 Z"
        strokeWidth="1.2"
      />

      {/* Trunk (Sundha) curling upward with Lotus */}
      <path
        d="M330 165 C360 175 385 198 392 228 C398 255 388 282 368 298 C352 310 332 308 325 292 C320 280 328 268 340 265 C355 262 368 272 364 285"
        strokeWidth="1.1"
      />
      {/* Tusk (Danta) */}
      <path d="M352 210 C375 215 390 205 395 190 C380 195 360 200 348 202" strokeWidth="1" />

      {/* Eye & Headplate (Jhula / Gajapata) */}
      <circle cx="318" cy="168" r="3" strokeWidth="0.8" />
      <circle cx="318" cy="168" r="1" fill="currentColor" stroke="none" />
      <path d="M305 145 C320 148 332 158 335 175" strokeWidth="0.8" />
      {/* Ear with lekhani internal curl */}
      <path
        d="M275 155 C295 155 305 170 302 195 C298 220 275 235 252 228 C242 224 245 208 255 202 C268 195 272 178 268 165 Z"
        strokeWidth="0.9"
      />

      {/* Lotus held in Trunk */}
      <g transform="translate(350, 240) rotate(-25)">
        <path d="M0 0 C-10 -15 -12 -30 0 -45 C12 -30 10 -15 0 0 Z" strokeWidth="0.85" />
        <path d="M-5 -10 C-20 -20 -22 -35 -10 -42 C-2 -32 -2 -20 -5 -10 Z" strokeWidth="0.75" />
        <path d="M5 -10 C20 -20 22 -35 10 -42 C2 -32 2 -20 5 -10 Z" strokeWidth="0.75" />
      </g>

      {/* Saddlecloth (Jhula / Houda) with Pattachitra decorative cross-hatch */}
      <rect x="180" y="145" width="80" height="75" rx="4" strokeWidth="1" />
      <line x1="180" y1="160" x2="260" y2="160" strokeWidth="0.6" strokeDasharray="2 2" />
      <line x1="180" y1="205" x2="260" y2="205" strokeWidth="0.6" strokeDasharray="2 2" />
      {/* Diamond etching inside saddle */}
      <polygon points="220,165 245,182.5 220,200 195,182.5" strokeWidth="0.8" />
      <circle cx="220" cy="182.5" r="3" strokeWidth="0.6" />

      {/* Bell / Ghanti pendant */}
      <path d="M150 175 C145 205 135 220 120 230" strokeWidth="0.75" />
      <circle cx="120" cy="233" r="4" strokeWidth="0.75" />
    </svg>
  );
}

/**
 * Tala Patra Matsya Yugma (Auspicious Twin Fish of Odisha Tradition)
 * Classical symbol of prosperity and divine flow, etched with fine lekhani scales.
 */
export function PatachitraFishPair({ className, size = 420 }: AccentProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 380 380"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "pointer-events-none select-none text-[#3B2B24] opacity-[0.07]",
        className
      )}
    >
      {/* Concentric ripples */}
      <circle cx="190" cy="190" r="175" strokeWidth="0.7" strokeDasharray="3 4" />
      <circle cx="190" cy="190" r="162" strokeWidth="0.9" />
      <circle cx="190" cy="190" r="148" strokeWidth="0.6" strokeDasharray="2 3" />

      {/* Fish 1 (Arching clockwise at top) */}
      <g>
        {/* Body */}
        <path
          d="M110 150 C125 105 170 85 215 90 C255 95 285 125 295 160 C275 155 240 148 200 150 C160 152 130 162 110 170 Z"
          strokeWidth="1.1"
        />
        {/* Head & Eye */}
        <path d="M110 150 C95 152 82 160 75 168 C88 174 100 172 110 170" strokeWidth="1" />
        <circle cx="95" cy="162" r="2.5" strokeWidth="0.75" />
        <circle cx="95" cy="162" r="0.8" fill="currentColor" stroke="none" />
        {/* Fins */}
        <path d="M165 92 C175 75 195 70 210 75" strokeWidth="0.8" />
        <path d="M175 150 C165 170 150 178 135 175" strokeWidth="0.8" />
        {/* Fan Tail */}
        <path d="M295 160 C320 145 342 140 355 145 C345 160 345 175 355 188 C340 185 320 175 295 160 Z" strokeWidth="0.9" />
        {/* Lekhani scale etchings */}
        <path d="M160 115 C170 125 180 125 190 115" strokeWidth="0.6" />
        <path d="M185 118 C195 128 205 128 215 118" strokeWidth="0.6" />
        <path d="M210 120 C220 130 230 130 240 120" strokeWidth="0.6" />
        <path d="M172 130 C182 140 192 140 202 130" strokeWidth="0.6" />
        <path d="M198 132 C208 142 218 142 228 132" strokeWidth="0.6" />
      </g>

      {/* Fish 2 (Arching counter-clockwise at bottom) */}
      <g transform="rotate(180 190 190)">
        {/* Body */}
        <path
          d="M110 150 C125 105 170 85 215 90 C255 95 285 125 295 160 C275 155 240 148 200 150 C160 152 130 162 110 170 Z"
          strokeWidth="1.1"
        />
        {/* Head & Eye */}
        <path d="M110 150 C95 152 82 160 75 168 C88 174 100 172 110 170" strokeWidth="1" />
        <circle cx="95" cy="162" r="2.5" strokeWidth="0.75" />
        <circle cx="95" cy="162" r="0.8" fill="currentColor" stroke="none" />
        {/* Fins */}
        <path d="M165 92 C175 75 195 70 210 75" strokeWidth="0.8" />
        <path d="M175 150 C165 170 150 178 135 175" strokeWidth="0.8" />
        {/* Fan Tail */}
        <path d="M295 160 C320 145 342 140 355 145 C345 160 345 175 355 188 C340 185 320 175 295 160 Z" strokeWidth="0.9" />
        {/* Lekhani scale etchings */}
        <path d="M160 115 C170 125 180 125 190 115" strokeWidth="0.6" />
        <path d="M185 118 C195 128 205 128 215 118" strokeWidth="0.6" />
        <path d="M210 120 C220 130 230 130 240 120" strokeWidth="0.6" />
      </g>

      {/* Central Water Lily Blossom */}
      <circle cx="190" cy="190" r="14" strokeWidth="0.8" />
      <circle cx="190" cy="190" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Tala Patra Lekhani Manuscript Rules & Palm Leaf Folio Slats
 * Horizontal etched seams and stitched palm-leaf bindings simulating
 * authentic Tala Pattachitra manuscript folios.
 */
export function PalmLeafManuscriptLines({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const strokeColor = tone === "light" ? "#FAF6EE" : "#3B2B24";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 select-none overflow-hidden",
        tone === "light" ? "opacity-[0.05]" : "opacity-[0.055]",
        className
      )}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={tone === "light" ? "tala-patra-slats-light" : "tala-patra-slats-dark"}
            width="240"
            height="52"
            patternUnits="userSpaceOnUse"
          >
            {/* Primary horizontal slat seam */}
            <line x1="0" y1="51.5" x2="240" y2="51.5" stroke={strokeColor} strokeWidth="0.75" />
            {/* Secondary faint guideline */}
            <line x1="0" y1="50.5" x2="240" y2="50.5" stroke={strokeColor} strokeWidth="0.35" strokeDasharray="3 5" />
            {/* Binding stitch punctures / thread holes */}
            <circle cx="30" cy="51.5" r="1.5" fill={strokeColor} />
            <line x1="28" y1="48" x2="32" y2="55" stroke={strokeColor} strokeWidth="0.6" />
            <circle cx="150" cy="51.5" r="1.5" fill={strokeColor} />
            <line x1="148" y1="48" x2="152" y2="55" stroke={strokeColor} strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${tone === "light" ? "tala-patra-slats-light" : "tala-patra-slats-dark"})`}
        />
      </svg>
    </div>
  );
}

/**
 * Authentic Tala Pattachitra Temple Torana (Arched Kadamba Sanctum)
 * Faithfully designed after traditional Odishan palm-leaf engravings (Tala Pattachitra):
 * features an ornate cusped temple torana arch flanked by carved pillars and dense
 * Lata (creeper vine) scrollwork, with the sacred Kadamba tree canopy and horizontal
 * stitched palm-leaf slats.
 */
export function TalaPattachitraTorana({
  className,
  size = 520,
  tone = "dark",
}: AccentProps & { tone?: "dark" | "light" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 440 560"
      width={size}
      height={Math.round((size * 560) / 440)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "pointer-events-none select-none",
        tone === "light" ? "text-ivory opacity-[0.08]" : "text-[#3B2B24] opacity-[0.085]",
        className
      )}
    >
      {/* ================= 1. HORIZONTAL PALM-LEAF SLAT SEAMS ================= */}
      {/* Traditional Tala Pattachitra is etched across stitched palm-leaf strips */}
      {[70, 140, 210, 280, 350, 420, 490].map((y) => (
        <g key={y} opacity="0.85">
          <line x1="10" y1={y} x2="430" y2={y} strokeWidth="0.8" />
          <line x1="10" y1={y + 1} x2="430" y2={y + 1} strokeWidth="0.4" strokeDasharray="2 4" />
          {/* Thread stitch knots across palm leaves */}
          <circle cx="45" cy={y} r="1.6" fill="currentColor" stroke="none" />
          <circle cx="220" cy={y} r="1.6" fill="currentColor" stroke="none" />
          <circle cx="395" cy={y} r="1.6" fill="currentColor" stroke="none" />
        </g>
      ))}

      {/* ================= 2. OUTER LATA-PATRA BORDER ================= */}
      {/* Outer framing double border with Odia scrollwork */}
      <rect x="20" y="20" width="400" height="520" rx="3" strokeWidth="1.2" />
      <rect x="28" y="28" width="384" height="504" rx="2" strokeWidth="0.7" strokeDasharray="3 3" />
      <rect x="34" y="34" width="372" height="492" rx="2" strokeWidth="0.9" />

      {/* Top Lata Scrollwork (Floral Vine) */}
      <path
        d="M 40 46 Q 65 36 90 46 T 140 46 T 190 46 T 220 46 T 250 46 T 300 46 T 350 46 T 400 46"
        strokeWidth="0.8"
      />
      {/* Scrolled leaf curls in top border */}
      {[60, 110, 160, 210, 260, 310, 360].map((x) => (
        <path
          key={x}
          d={`M ${x} 46 C ${x - 5} 38 ${x + 8} 36 ${x + 6} 44 C ${x + 4} 48 ${x - 2} 48 ${x} 46 Z`}
          strokeWidth="0.6"
        />
      ))}

      {/* ================= 3. ARCHED TEMPLE TORANA (SANCTUM) ================= */}
      {/* Outer Cusped Arch */}
      <path
        d="M 75 490 L 75 250 C 75 160 145 100 220 75 C 295 100 365 160 365 250 L 365 490"
        strokeWidth="1.3"
      />
      {/* Inner Cusped Arch Rib */}
      <path
        d="M 90 490 L 90 255 C 90 180 150 125 220 102 C 290 125 350 180 350 255 L 350 490"
        strokeWidth="0.9"
      />
      {/* Multi-cusped Scallop Detailing */}
      <path
        d="M 90 250 C 90 225 110 205 130 195 C 150 185 168 168 185 145 C 200 128 212 115 220 102 C 228 115 240 128 255 145 C 272 168 290 185 310 195 C 330 205 350 225 350 250"
        strokeWidth="0.8"
        strokeDasharray="2 3"
      />

      {/* Arch Spandrel Floral Tendrils (Lata in upper left & right corners) */}
      <g strokeWidth="0.75">
        {/* Left Spandrel */}
        <path d="M 45 60 C 65 65 75 95 65 125 C 60 140 45 150 50 170" />
        <circle cx="62" cy="85" r="4" strokeWidth="0.6" />
        <path d="M 62 81 C 56 75 68 70 70 78 Z" strokeWidth="0.5" />
        <circle cx="54" cy="140" r="3.5" strokeWidth="0.6" />

        {/* Right Spandrel */}
        <path d="M 395 60 C 375 65 365 95 375 125 C 380 140 395 150 390 170" />
        <circle cx="378" cy="85" r="4" strokeWidth="0.6" />
        <path d="M 378 81 C 384 75 372 70 370 78 Z" strokeWidth="0.5" />
        <circle cx="386" cy="140" r="3.5" strokeWidth="0.6" />
      </g>

      {/* ================= 4. CARVED PILLARS & PEDESTALS ================= */}
      {/* Left Pillar Column */}
      <rect x="58" y="240" width="28" height="180" strokeWidth="0.9" />
      <line x1="67" y1="240" x2="67" y2="420" strokeWidth="0.6" strokeDasharray="3 3" />
      <line x1="77" y1="240" x2="77" y2="420" strokeWidth="0.6" />
      {/* Left Capital (Molded Top) */}
      <polygon points="52,240 92,240 86,225 58,225" strokeWidth="0.9" />
      {/* Left Plinth Base */}
      <rect x="52" y="420" width="40" height="70" strokeWidth="1" />
      {/* Plinth Chevron Cross-Hatching */}
      <line x1="52" y1="435" x2="92" y2="475" strokeWidth="0.6" />
      <line x1="52" y1="455" x2="92" y2="490" strokeWidth="0.6" />
      <line x1="92" y1="435" x2="52" y2="475" strokeWidth="0.6" />

      {/* Right Pillar Column */}
      <rect x="354" y="240" width="28" height="180" strokeWidth="0.9" />
      <line x1="363" y1="240" x2="363" y2="420" strokeWidth="0.6" strokeDasharray="3 3" />
      <line x1="373" y1="240" x2="373" y2="420" strokeWidth="0.6" />
      {/* Right Capital */}
      <polygon points="348,240 388,240 382,225 354,225" strokeWidth="0.9" />
      {/* Right Plinth Base */}
      <rect x="348" y="420" width="40" height="70" strokeWidth="1" />
      {/* Plinth Chevron Cross-Hatching */}
      <line x1="348" y1="435" x2="388" y2="475" strokeWidth="0.6" />
      <line x1="348" y1="455" x2="388" y2="490" strokeWidth="0.6" />
      <line x1="388" y1="435" x2="348" y2="475" strokeWidth="0.6" />

      {/* ================= 5. KADAMBA TREE CANOPY (KALPAVRIKSHA) ================= */}
      {/* Central Tree Trunk & Radiating Boughs */}
      <g strokeWidth="0.95">
        <path d="M 215 330 C 215 270 205 240 185 200" />
        <path d="M 225 330 C 225 270 235 240 255 200" />
        <path d="M 220 250 L 220 170" strokeWidth="1.1" />
        <path d="M 200 230 C 180 215 160 205 145 195" />
        <path d="M 240 230 C 260 215 280 205 295 195" />
      </g>

      {/* Dense Kadamba Leaf Clusters (Fine Lekhani Stippled Rosettes) */}
      {[
        { cx: 220, cy: 155, r: 24 },
        { cx: 185, cy: 168, r: 21 },
        { cx: 255, cy: 168, r: 21 },
        { cx: 155, cy: 190, r: 19 },
        { cx: 285, cy: 190, r: 19 },
        { cx: 135, cy: 218, r: 17 },
        { cx: 305, cy: 218, r: 17 },
        { cx: 200, cy: 135, r: 18 },
        { cx: 240, cy: 135, r: 18 },
        { cx: 220, cy: 118, r: 15 },
      ].map((cluster, i) => (
        <g key={i}>
          <circle cx={cluster.cx} cy={cluster.cy} r={cluster.r} strokeWidth="0.75" />
          <circle
            cx={cluster.cx}
            cy={cluster.cy}
            r={cluster.r - 4}
            strokeWidth="0.5"
            strokeDasharray="1.5 2"
          />
          <circle
            cx={cluster.cx}
            cy={cluster.cy}
            r={cluster.r - 8}
            strokeWidth="0.5"
            strokeDasharray="1 2"
          />
          <circle cx={cluster.cx} cy={cluster.cy} r="1.5" fill="currentColor" stroke="none" />
        </g>
      ))}

      {/* ================= 6. RADHA-KRISHNA LEKHANI FIGURE CONTOURS ================= */}
      {/* Iconic Tala Pattachitra Tribhanga Contours under the Kadamba Tree */}
      <g strokeWidth="0.85">
        {/* Krishna Mukuta (Ornate Peacock Crown) */}
        <polygon points="230,225 240,205 244,226" strokeWidth="0.8" />
        <circle cx="240" cy="202" r="2.5" strokeWidth="0.6" />
        {/* Divine Visage Contours */}
        <path d="M 230 228 C 238 226 242 232 242 238 C 242 246 235 252 228 254" />
        {/* Large Pattachitra Eye (Almond Nayana) */}
        <path d="M 234 234 C 237 232 240 234 240 236 C 237 238 235 237 234 234 Z" strokeWidth="0.6" />
        <circle cx="237" cy="235" r="0.8" fill="currentColor" />

        {/* Radha Visage & Mukhabharana */}
        <path d="M 210 236 C 204 234 200 240 201 246 C 203 252 210 256 216 256" />
        <path d="M 205 241 C 207 239 210 241 210 243 C 208 245 206 244 205 241 Z" strokeWidth="0.6" />
        <circle cx="207.5" cy="242" r="0.7" fill="currentColor" />
        {/* Radha Bindi & Chignon (Khosa) */}
        <circle cx="212" cy="239" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="194" cy="246" r="6" strokeWidth="0.75" />

        {/* Flute (Venu) held high */}
        <line x1="218" y1="262" x2="255" y2="215" strokeWidth="1.2" />

        {/* Embracing Arms & Posture */}
        <path d="M 226 256 C 220 270 212 285 210 305" />
        <path d="M 235 255 C 245 272 248 290 244 315" />

        {/* Traditional Odia Dhoti & Sari Etchings with Lekhani Dots */}
        <path d="M 205 305 C 195 335 190 375 198 415" />
        <path d="M 222 305 C 222 340 220 380 225 415" />
        <path d="M 242 315 C 255 350 258 385 248 420" />

        {/* Waving Uttariya Scarves (Wind-swept Sashes) */}
        <path d="M 195 285 C 170 290 145 280 128 295 C 118 305 130 325 142 320 C 158 312 170 330 185 325" />
        <path d="M 250 280 C 275 285 295 275 310 290 C 320 300 310 320 298 315 C 285 310 275 325 260 322" />

        {/* Tribhanga Bent Ankles & Lotus Feet */}
        <path d="M 205 415 C 205 435 195 445 185 450" />
        <path d="M 225 415 C 228 435 238 445 245 450" />
      </g>

      {/* ================= 7. FLOWERING BASE & SACRED LOTUS BUDS ================= */}
      {/* Ground Line with Grass Tufts */}
      <path d="M 90 490 Q 220 480 350 490" strokeWidth="1" />
      {/* Etched Lotus Blossoms & Foliage at Sanctum Base */}
      <g strokeWidth="0.75">
        <path d="M 125 490 C 122 472 130 460 135 452 C 140 460 148 472 145 490" />
        <circle cx="135" cy="450" r="2.5" strokeWidth="0.6" />
        <path d="M 295 490 C 292 472 300 460 305 452 C 310 460 318 472 315 490" />
        <circle cx="305" cy="450" r="2.5" strokeWidth="0.6" />
        {/* Grass tufts */}
        <path d="M 170 488 L 173 475 L 176 488 M 174 476 L 178 480" strokeWidth="0.6" />
        <path d="M 265 488 L 268 475 L 271 488 M 269 476 L 273 480" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

/**
 * Universal Section Sketch Background
 * Integrates authentic Odisha Tala Pattachitra sketch artwork across EVERY section:
 * - Emulates hand-drawn iron stylus (lekhani) pen sketch traces on palm leaf
 * - Respects the existing colors of each section (dark lekhani on light sections,
 *   luminous ivory lekhani on dark sections)
 * - Combines high-resolution etched palm leaf texture canvas with crisp vector Torana
 *   and classical Odia motifs.
 */
export interface SectionSketchProps {
  tone?: "dark" | "light"; // "dark" = dark lekhani ink on offwhite; "light" = ivory ink on dark earth/maroon
  variant?:
    | "hero"
    | "collection"
    | "personalise"
    | "gifting"
    | "why"
    | "stories"
    | "faq"
    | "closing"
    | "footer";
  className?: string;
  showTexture?: boolean;
}

export function SectionSketchBackground({
  tone = "dark",
  variant = "hero",
  className,
  showTexture = true,
}: SectionSketchProps) {
  const isDarkTone = tone === "dark";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 select-none overflow-hidden",
        className
      )}
    >
      {/* 1. Authentic palm-leaf manuscript slat seams & stitch punctures */}
      <PalmLeafManuscriptLines tone={tone} />

      {/* 2. High-resolution authentic Tala Pattachitra sketch canvas overlay */}
      {showTexture && (
        <div
          className={cn(
            "absolute inset-0 select-none",
            isDarkTone
              ? "opacity-[0.06] mix-blend-multiply"
              : "invert brightness-150 opacity-[0.055] mix-blend-screen"
          )}
        >
          <Image
            src="/images/tala-pattachitra-sketch.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={variant === "hero"}
          />
        </div>
      )}

      {/* 3. Authentic vector Tala Pattachitra Torana & Odia motifs tuned per section */}
      <div className="absolute inset-0">
        {variant === "hero" && (
          <>
            <TalaPattachitraTorana
              tone={tone}
              className="absolute -left-12 top-4 h-[560px] w-[430px] opacity-[0.08] lg:left-[2%]"
            />
            <PatachitraMandala
              className={cn(
                "absolute -right-16 top-[10%] h-[480px] w-[480px]",
                isDarkTone ? "text-maroon opacity-[0.05]" : "text-ivory opacity-[0.05]"
              )}
            />
          </>
        )}

        {variant === "collection" && (
          <>
            <TalaPattachitraTorana
              tone={tone}
              className="absolute -left-14 bottom-4 h-[500px] w-[400px] opacity-[0.075] lg:left-[-2%]"
            />
            <PatachitraFishPair
              className={cn(
                "absolute -right-16 top-16 h-[440px] w-[440px]",
                isDarkTone ? "text-[#3B2B24] opacity-[0.065]" : "text-ivory opacity-[0.06]"
              )}
            />
          </>
        )}

        {variant === "personalise" && (
          <>
            <TalaPattachitraTorana
              tone={tone}
              className="absolute -left-14 top-14 h-[500px] w-[400px] opacity-[0.075] lg:left-[-2%]"
            />
            <PatachitraPeacock
              className={cn(
                "absolute -right-16 top-8 h-[480px] w-[480px]",
                isDarkTone ? "text-[#3B2B24] opacity-[0.07]" : "text-ivory opacity-[0.065]"
              )}
            />
          </>
        )}

        {variant === "gifting" && (
          <>
            <PatachitraElephant
              className={cn(
                "absolute -left-14 bottom-8 h-[440px] w-[440px]",
                isDarkTone ? "text-[#3B2B24] opacity-[0.065]" : "text-ivory opacity-[0.06]"
              )}
            />
            <TalaPattachitraTorana
              tone={tone}
              className="absolute -right-14 top-8 h-[500px] w-[400px] opacity-[0.07] lg:right-[-2%]"
            />
          </>
        )}

        {variant === "why" && (
          <>
            <TalaPattachitraTorana
              tone={tone}
              className="absolute -left-14 top-1/2 h-[500px] w-[400px] -translate-y-1/2 opacity-[0.07] lg:left-[-2%]"
            />
            <PatachitraMandala
              className={cn(
                "absolute -right-14 top-1/2 h-[480px] w-[480px] -translate-y-1/2",
                isDarkTone ? "text-maroon opacity-[0.055]" : "text-ivory opacity-[0.055]"
              )}
            />
          </>
        )}

        {variant === "stories" && (
          <>
            <TalaPattachitraTorana
              tone="light"
              className="absolute -left-14 top-10 h-[520px] w-[410px] text-ivory opacity-[0.08] lg:left-[1%]"
            />
            <PatachitraPeacock
              className="absolute -right-14 top-6 h-[480px] w-[480px] text-ivory opacity-[0.07] lg:right-[-2%]"
            />
          </>
        )}

        {variant === "faq" && (
          <>
            <TalaPattachitraTorana
              tone={tone}
              className="absolute -left-14 top-8 h-[480px] w-[390px] opacity-[0.07] lg:left-[-2%]"
            />
            <PatachitraFishPair
              className={cn(
                "absolute -right-14 top-10 h-[440px] w-[440px]",
                isDarkTone ? "text-[#3B2B24] opacity-[0.065]" : "text-ivory opacity-[0.06]"
              )}
            />
          </>
        )}

        {variant === "closing" && (
          <>
            <TalaPattachitraTorana
              tone="light"
              className="absolute -left-12 top-1/2 h-[500px] w-[400px] -translate-y-1/2 text-ivory opacity-[0.08] lg:left-[2%]"
            />
            <TalaPattachitraTorana
              tone="light"
              className="absolute -right-12 top-1/2 h-[500px] w-[400px] -translate-y-1/2 text-ivory opacity-[0.08] lg:right-[2%]"
            />
            <PatachitraMandala
              className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 text-ivory opacity-[0.06]"
            />
          </>
        )}

        {variant === "footer" && (
          <>
            <TalaPattachitraTorana
              tone="light"
              className="absolute -left-14 top-8 h-[460px] w-[380px] text-ivory opacity-[0.07] lg:left-[-1%]"
            />
            <PatachitraElephant
              className="absolute -right-10 top-8 h-[380px] w-[380px] text-ivory opacity-[0.065]"
            />
          </>
        )}
      </div>
    </div>
  );
}
