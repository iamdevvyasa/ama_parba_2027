"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface SambalpuriBorderProps {
  className?: string;
  height?: number;
}

/**
 * Authentic Sambalpuri Bandha (Ikat) horizontal border.
 * Features:
 * - Stepped ikat diamond weave in traditional Maroon (#751F25), Saffron (#D88945), and Ivory (#FAF5EC)
 * - Kumbha (temple spires / teeth) along both top and bottom edges
 * - Top and bottom double keyline gold accents
 * - Seamless 100% horizontal repeat across all screen resolutions
 */
export function SambalpuriBorder({
  className,
  height = 16,
}: SambalpuriBorderProps) {
  const uid = useId().replace(/:/g, "-");
  const patternId = `sb-band-${uid}`;

  return (
    <div
      aria-hidden
      className={cn("relative w-full overflow-hidden select-none", className)}
      style={{ height: `${height}px` }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={patternId}
            width="32"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <rect width="32" height="16" fill="#5A161B" />
            {/* Top gold keyline */}
            <line x1="0" y1="0.5" x2="32" y2="0.5" stroke="#D88945" strokeWidth="1" />
            {/* Top Kumbha (temple teeth) */}
            <polygon points="0,4 2,1 4,4" fill="#FAF5EC" />
            <polygon points="4,4 6,1 8,4" fill="#D88945" />
            <polygon points="8,4 10,1 12,4" fill="#FAF5EC" />
            <polygon points="12,4 14,1 16,4" fill="#D88945" />
            <polygon points="16,4 18,1 20,4" fill="#FAF5EC" />
            <polygon points="20,4 22,1 24,4" fill="#D88945" />
            <polygon points="24,4 26,1 28,4" fill="#FAF5EC" />
            <polygon points="28,4 30,1 32,4" fill="#D88945" />
            {/* Center Sambalpuri Ikat Diamond */}
            <polygon points="16,3 25,8 16,13 7,8" fill="#D88945" />
            <polygon points="16,4.5 22,8 16,11.5 10,8" fill="#751F25" />
            <polygon points="16,6 19.5,8 16,10 12.5,8" fill="#FAF5EC" />
            <circle cx="16" cy="8" r="1.2" fill="#D88945" />
            {/* Connection accents */}
            <polygon points="0,8 2.5,6 5,8 2.5,10" fill="#D88945" />
            <polygon points="32,8 29.5,6 27,8 29.5,10" fill="#D88945" />
            {/* Bottom Kumbha (temple teeth) */}
            <polygon points="0,12 2,15 4,12" fill="#FAF5EC" />
            <polygon points="4,12 6,15 8,12" fill="#D88945" />
            <polygon points="8,12 10,15 12,12" fill="#FAF5EC" />
            <polygon points="12,12 14,15 16,12" fill="#D88945" />
            <polygon points="16,12 18,15 20,12" fill="#FAF5EC" />
            <polygon points="20,12 22,15 24,12" fill="#D88945" />
            <polygon points="24,12 26,15 28,12" fill="#FAF5EC" />
            <polygon points="28,12 30,15 32,12" fill="#D88945" />
            {/* Bottom gold keyline */}
            <line x1="0" y1="15.5" x2="32" y2="15.5" stroke="#D88945" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
