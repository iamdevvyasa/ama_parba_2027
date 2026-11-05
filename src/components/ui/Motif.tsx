import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { SambalpuriBorder } from "./SambalpuriBorder";

export { SambalpuriBorder };

/**
 * Original decorative primitives, inspired by temple friezes, ikat weaving and
 * pata-chitra borders. Drawn as CSS/SVG geometry — nothing is traced from an
 * existing artwork.
 */

/** Authentic Sambalpuri Bandha border section divider. */
export function MotifBand({
  className,
  height,
}: {
  className?: string;
  height?: number;
}) {
  return <SambalpuriBorder className={className} height={height} />;
}

/** Temple-arch frieze repeat. Takes its colour from `currentColor`. */
export function MotifFrieze({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("h-[11px] w-full motif-frieze", className)} />
  );
}

/** A single lotus rosette, used as a divider full-stop. */
export function MotifRosette({
  className,
  size = 28,
  style,
}: {
  className?: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      style={style}
      className={cn("shrink-0", className)}
    >
      {[0, 45, 90, 135].map((angle) => (
        <ellipse
          key={angle}
          cx="16"
          cy="16"
          rx="3.1"
          ry="13"
          transform={`rotate(${angle} 16 16)`}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />
      ))}
      <circle cx="16" cy="16" r="2.6" fill="currentColor" />
    </svg>
  );
}

/** Horizontal rule with a rosette at its centre. */
export function MotifDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center gap-4 text-maroon/50", className)}
    >
      <span className="h-px flex-1 bg-current opacity-30" />
      <MotifRosette size={22} />
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  );
}

/**
 * Large background ornament — a temple-shikhara silhouette built from stacked
 * arches. Sits behind content at low opacity.
 */
export function MotifShikhara({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 260"
      fill="none"
      className={cn("pointer-events-none select-none", className)}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const inset = i * 17;
        const top = 30 + i * 34;
        return (
          <path
            key={i}
            d={`M${20 + inset} 250 L${20 + inset} ${top + 40} Q100 ${top - 24} ${180 - inset} ${top + 40} L${180 - inset} 250`}
            stroke="currentColor"
            strokeWidth="1"
            opacity={0.5 - i * 0.06}
          />
        );
      })}
      <circle cx="100" cy="22" r="7" stroke="currentColor" strokeWidth="1" opacity="0.45" />
    </svg>
  );
}
