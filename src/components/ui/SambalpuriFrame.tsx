"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface SambalpuriFrameProps {
  children: React.ReactNode;
  className?: string;
  caption?: React.ReactNode;
}

/**
 * Authentic Sambalpuri Bandha (Ikat) border frame.
 * Features:
 * - Stepped ikat diamond weave in traditional Maroon (#751F25), Saffron (#D88945), and Ivory (#FAF5EC)
 * - Traditional Kumbha (temple spires / teeth) pointing inward towards the artwork
 * - Corner rosettes (Bandha Phula) anchoring the four corners
 * - Double keyline gold trim
 */
export function SambalpuriFrame({
  children,
  className,
  caption,
}: SambalpuriFrameProps) {
  const uid = useId().replace(/:/g, "-");
  const topPatId = `sb-top-${uid}`;
  const btmPatId = `sb-btm-${uid}`;
  const leftPatId = `sb-left-${uid}`;
  const rightPatId = `sb-right-${uid}`;

  return (
    <div
      className={cn(
        "group relative mx-auto w-full max-w-[440px] select-none",
        className
      )}
    >
      {/* Outer card with deep warm shadow */}
      <div className="relative overflow-hidden rounded-[14px] bg-[#5A161B] p-[18px] xs:p-[22px] sm:p-[26px] shadow-deep ring-1 ring-[#D88945]/30">
        {/* Top Border Band */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[18px] xs:h-[22px] sm:h-[26px] overflow-hidden"
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={topPatId}
                width="28"
                height="26"
                patternUnits="userSpaceOnUse"
              >
                <rect width="28" height="26" fill="#5A161B" />
                {/* Outer gold line */}
                <line x1="0" y1="1" x2="28" y2="1" stroke="#D88945" strokeWidth="1.5" />
                {/* Stepped Sambalpuri Ikat diamond */}
                <polygon points="14,3 23,11 14,19 5,11" fill="#D88945" />
                <polygon points="14,5 20,11 14,17 8,11" fill="#751F25" />
                <polygon points="14,7 18,11 14,15 10,11" fill="#FAF5EC" />
                <polygon points="14,9 16,11 14,13 12,11" fill="#D88945" />
                {/* Small connecting accents */}
                <polygon points="0,11 2.5,8.5 5,11 2.5,13.5" fill="#D88945" />
                <polygon points="28,11 25.5,8.5 23,11 25.5,13.5" fill="#D88945" />
                {/* Kumbha (temple spires) pointing downward towards artwork */}
                <polygon points="0,20 3.5,25.5 7,20" fill="#FAF5EC" />
                <polygon points="7,20 10.5,25.5 14,20" fill="#D88945" />
                <polygon points="14,20 17.5,25.5 21,20" fill="#FAF5EC" />
                <polygon points="21,20 24.5,25.5 28,20" fill="#D88945" />
                {/* Inner gold keyline */}
                <line x1="0" y1="26" x2="28" y2="26" stroke="#D88945" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${topPatId})`} />
          </svg>
        </div>

        {/* Bottom Border Band */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[18px] xs:h-[22px] sm:h-[26px] overflow-hidden"
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={btmPatId}
                width="28"
                height="26"
                patternUnits="userSpaceOnUse"
              >
                <rect width="28" height="26" fill="#5A161B" />
                {/* Inner gold keyline */}
                <line x1="0" y1="0.5" x2="28" y2="0.5" stroke="#D88945" strokeWidth="1" />
                {/* Kumbha (temple spires) pointing upward towards artwork */}
                <polygon points="0,6 3.5,0.5 7,6" fill="#FAF5EC" />
                <polygon points="7,6 10.5,0.5 14,6" fill="#D88945" />
                <polygon points="14,6 17.5,0.5 21,6" fill="#FAF5EC" />
                <polygon points="21,6 24.5,0.5 28,6" fill="#D88945" />
                {/* Stepped Sambalpuri Ikat diamond */}
                <polygon points="14,7 23,15 14,23 5,15" fill="#D88945" />
                <polygon points="14,9 20,15 14,21 8,15" fill="#751F25" />
                <polygon points="14,11 18,15 14,19 10,15" fill="#FAF5EC" />
                <polygon points="14,13 16,15 14,17 12,15" fill="#D88945" />
                {/* Small connecting accents */}
                <polygon points="0,15 2.5,12.5 5,15 2.5,17.5" fill="#D88945" />
                <polygon points="28,15 25.5,12.5 23,15 25.5,17.5" fill="#D88945" />
                {/* Outer gold line */}
                <line x1="0" y1="25" x2="28" y2="25" stroke="#D88945" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${btmPatId})`} />
          </svg>
        </div>

        {/* Left Border Band */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[18px] xs:w-[22px] sm:w-[26px] overflow-hidden"
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={leftPatId}
                width="26"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <rect width="26" height="28" fill="#5A161B" />
                {/* Outer gold line */}
                <line x1="1" y1="0" x2="1" y2="28" stroke="#D88945" strokeWidth="1.5" />
                {/* Stepped Sambalpuri Ikat diamond */}
                <polygon points="11,5 19,14 11,23 3,14" fill="#D88945" />
                <polygon points="11,8 17,14 11,20 5,14" fill="#751F25" />
                <polygon points="11,10 15,14 11,18 7,14" fill="#FAF5EC" />
                <polygon points="11,12 13,14 11,16 9,14" fill="#D88945" />
                {/* Small connecting accents */}
                <polygon points="11,0 8.5,2.5 11,5 13.5,2.5" fill="#D88945" />
                <polygon points="11,28 8.5,25.5 11,23 13.5,25.5" fill="#D88945" />
                {/* Kumbha (temple spires) pointing rightward towards artwork */}
                <polygon points="20,0 25.5,3.5 20,7" fill="#FAF5EC" />
                <polygon points="20,7 25.5,10.5 20,14" fill="#D88945" />
                <polygon points="20,14 25.5,17.5 20,21" fill="#FAF5EC" />
                <polygon points="20,21 25.5,24.5 20,28" fill="#D88945" />
                {/* Inner gold keyline */}
                <line x1="26" y1="0" x2="26" y2="28" stroke="#D88945" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${leftPatId})`} />
          </svg>
        </div>

        {/* Right Border Band */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[18px] xs:w-[22px] sm:w-[26px] overflow-hidden"
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={rightPatId}
                width="26"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <rect width="26" height="28" fill="#5A161B" />
                {/* Inner gold keyline */}
                <line x1="0.5" y1="0" x2="0.5" y2="28" stroke="#D88945" strokeWidth="1" />
                {/* Kumbha (temple spires) pointing leftward towards artwork */}
                <polygon points="6,0 0.5,3.5 6,7" fill="#FAF5EC" />
                <polygon points="6,7 0.5,10.5 6,14" fill="#D88945" />
                <polygon points="6,14 0.5,17.5 6,21" fill="#FAF5EC" />
                <polygon points="6,21 0.5,24.5 6,28" fill="#D88945" />
                {/* Stepped Sambalpuri Ikat diamond */}
                <polygon points="15,5 23,14 15,23 7,14" fill="#D88945" />
                <polygon points="15,8 21,14 15,20 9,14" fill="#751F25" />
                <polygon points="15,10 19,14 15,18 11,14" fill="#FAF5EC" />
                <polygon points="15,12 17,14 15,16 13,14" fill="#D88945" />
                {/* Small connecting accents */}
                <polygon points="15,0 12.5,2.5 15,5 17.5,2.5" fill="#D88945" />
                <polygon points="15,28 12.5,25.5 15,23 17.5,25.5" fill="#D88945" />
                {/* Outer gold line */}
                <line x1="25" y1="0" x2="25" y2="28" stroke="#D88945" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${rightPatId})`} />
          </svg>
        </div>

        {/* Four Corner Medallions (Bandha Phula) */}
        {/* Top-Left */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-[18px] w-[18px] xs:h-[22px] xs:w-[22px] sm:h-[26px] sm:w-[26px] z-10"
        >
          <CornerMedallion rotate={0} />
        </div>
        {/* Top-Right */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[18px] w-[18px] xs:h-[22px] xs:w-[22px] sm:h-[26px] sm:w-[26px] z-10"
        >
          <CornerMedallion rotate={90} />
        </div>
        {/* Bottom-Right */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 h-[18px] w-[18px] xs:h-[22px] xs:w-[22px] sm:h-[26px] sm:w-[26px] z-10"
        >
          <CornerMedallion rotate={180} />
        </div>
        {/* Bottom-Left */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 bottom-0 h-[18px] w-[18px] xs:h-[22px] xs:w-[22px] sm:h-[26px] sm:w-[26px] z-10"
        >
          <CornerMedallion rotate={270} />
        </div>

        {/* Inner Content Area */}
        <div className="relative overflow-hidden rounded-[8px] bg-[#F1E7CE] ring-1 ring-[#D88945]/50 shadow-inner">
          {children}
        </div>

        {/* Optional subtle caption / footer strip */}
        {caption && (
          <div className="mt-2.5 flex items-center justify-center gap-2 px-1 text-center font-sans text-[9px] uppercase tracking-eyebrow text-ivory/80">
            <span>{caption}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Traditional Sambalpuri 4-petal flower / rosette corner medallion
 */
function CornerMedallion({ rotate = 0 }: { rotate?: number }) {
  return (
    <svg
      viewBox="0 0 26 26"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <rect width="26" height="26" fill="#5A161B" />
      {/* Outer corner frame lines */}
      <line x1="1" y1="1" x2="25" y2="1" stroke="#D88945" strokeWidth="1.5" />
      <line x1="1" y1="1" x2="1" y2="25" stroke="#D88945" strokeWidth="1.5" />
      {/* Diagonal corner tie */}
      <line x1="2" y1="2" x2="7" y2="7" stroke="#D88945" strokeWidth="1" />
      {/* Sambalpuri Bandha Rosette */}
      <polygon points="13,4 22,13 13,22 4,13" fill="#D88945" />
      <polygon points="13,6 20,13 13,20 6,13" fill="#751F25" />
      <polygon points="13,8 18,13 13,18 8,13" fill="#FAF5EC" />
      <polygon points="13,10.5 15.5,13 13,15.5 10.5,13" fill="#D88945" />
      <circle cx="13" cy="13" r="1.5" fill="#FAF5EC" />
      {/* Inner corner corner-tick */}
      <line x1="25" y1="25" x2="22" y2="25" stroke="#D88945" strokeWidth="1" />
      <line x1="25" y1="25" x2="25" y2="22" stroke="#D88945" strokeWidth="1" />
    </svg>
  );
}
