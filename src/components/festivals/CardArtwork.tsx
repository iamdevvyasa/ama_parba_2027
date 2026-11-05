import type { Festival } from "@/types";
import { cn } from "@/lib/utils";

/**
 * DEVELOPMENT PLACEHOLDER ARTWORK.
 *
 * Original generative concept visuals standing in for the final illustrations.
 * Each festival gets one of six compositions, picked by month index, recoloured
 * from the festival's own theme - so the carousel reads as a varied set rather
 * than one card repeated twelve times.
 *
 * To swap in real artwork: set `cardIllustration` on the festival in
 * src/data/festivals.ts. `FestivalCard` renders the image instead and this
 * component is bypassed. No other change is needed.
 */

type Motif = 0 | 1 | 2 | 3 | 4 | 5;

export function CardArtwork({
  festival,
  className,
  showLabel = true,
}: {
  festival: Festival;
  className?: string;
  showLabel?: boolean;
}) {
  const { theme, monthIndex } = festival;
  const motif = (monthIndex % 6) as Motif;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ backgroundColor: theme.base }}
    >
      <svg
        viewBox="0 0 300 420"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label={`Concept illustration for ${festival.name}`}
      >
        <defs>
          <linearGradient id={`sky-${festival.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.accent} stopOpacity="0.28" />
            <stop offset="100%" stopColor={theme.base} stopOpacity="0" />
          </linearGradient>
          <clipPath id={`frame-${festival.id}`}>
            <rect x="18" y="18" width="264" height="384" rx="2" />
          </clipPath>
        </defs>

        <rect width="300" height="420" fill={theme.base} />
        <rect width="300" height="420" fill={`url(#sky-${festival.id})`} />

        <g clipPath={`url(#frame-${festival.id})`}>
          <MotifComposition motif={motif} theme={theme} />
        </g>

        {/* Double keyline border, the collection's constant. */}
        <rect
          x="14"
          y="14"
          width="272"
          height="392"
          fill="none"
          stroke={theme.ink}
          strokeWidth="1"
          opacity="0.5"
        />
        <rect
          x="20"
          y="20"
          width="260"
          height="380"
          fill="none"
          stroke={theme.ink}
          strokeWidth="0.6"
          opacity="0.3"
        />

        {/* Corner ticks - a quiet nod to pata-chitra corner marks. */}
        {[
          [20, 20, 1, 1],
          [280, 20, -1, 1],
          [20, 400, 1, -1],
          [280, 400, -1, -1],
        ].map(([x, y, dx, dy], i) => (
          <path
            key={i}
            d={`M${x} ${y + dy * 14} L${x} ${y} L${x + dx * 14} ${y}`}
            stroke={theme.ink}
            strokeWidth="1.4"
            fill="none"
            opacity="0.75"
          />
        ))}
      </svg>

      {showLabel && (
        <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-earth-900/70 px-2 py-0.5 font-sans text-[9px] uppercase tracking-eyebrow text-ivory/90">
          Concept visual
        </span>
      )}
    </div>
  );
}

function MotifComposition({
  motif,
  theme,
}: {
  motif: Motif;
  theme: Festival["theme"];
}) {
  const { ink, accent } = theme;

  // Shared ground line and ikat footer band across all compositions.
  const ground = (
    <>
      <line x1="18" y1="330" x2="282" y2="330" stroke={ink} strokeWidth="0.8" opacity="0.35" />
      {Array.from({ length: 13 }).map((_, i) => (
        <path
          key={i}
          d={`M${26 + i * 20} 352 l9 -9 l9 9 l-9 9 Z`}
          fill={i % 2 ? accent : "none"}
          stroke={ink}
          strokeWidth="0.7"
          opacity="0.5"
        />
      ))}
    </>
  );

  switch (motif) {
    // Sun over a temple arch - solar festivals.
    case 0:
      return (
        <>
          <circle cx="150" cy="140" r="52" fill={accent} opacity="0.85" />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 24;
            return (
              <line
                key={i}
                x1={150 + Math.cos(a) * 62}
                y1={140 + Math.sin(a) * 62}
                x2={150 + Math.cos(a) * (i % 2 ? 78 : 70)}
                y2={140 + Math.sin(a) * (i % 2 ? 78 : 70)}
                stroke={ink}
                strokeWidth="1.2"
                opacity="0.6"
              />
            );
          })}
          <path
            d="M70 330 L70 250 Q150 190 230 250 L230 330"
            fill="none"
            stroke={ink}
            strokeWidth="1.6"
            opacity="0.8"
          />
          <path d="M150 330 L150 232" stroke={ink} strokeWidth="1" opacity="0.4" />
          {ground}
        </>
      );

    // Chariot wheel - journey and procession.
    case 1:
      return (
        <>
          <circle cx="150" cy="180" r="76" fill="none" stroke={ink} strokeWidth="2" opacity="0.85" />
          <circle cx="150" cy="180" r="58" fill="none" stroke={ink} strokeWidth="0.9" opacity="0.5" />
          <circle cx="150" cy="180" r="18" fill={accent} opacity="0.9" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 16;
            return (
              <line
                key={i}
                x1={150 + Math.cos(a) * 18}
                y1={180 + Math.sin(a) * 18}
                x2={150 + Math.cos(a) * 76}
                y2={180 + Math.sin(a) * 76}
                stroke={ink}
                strokeWidth="1.1"
                opacity="0.55"
              />
            );
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 8 + Math.PI / 8;
            return (
              <circle
                key={i}
                cx={150 + Math.cos(a) * 67}
                cy={180 + Math.sin(a) * 67}
                r="5"
                fill={accent}
                opacity="0.7"
              />
            );
          })}
          {ground}
        </>
      );

    // Lotus medallion - devotional festivals.
    case 2:
      return (
        <>
          {[0, 1].map((ring) =>
            Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 360) / 12 + ring * 15;
              return (
                <ellipse
                  key={`${ring}-${i}`}
                  cx="150"
                  cy="178"
                  rx={ring ? 13 : 17}
                  ry={ring ? 56 : 80}
                  transform={`rotate(${a} 150 178)`}
                  fill={ring ? accent : "none"}
                  fillOpacity={ring ? 0.16 : 0}
                  stroke={ink}
                  strokeWidth="0.9"
                  opacity={ring ? 0.5 : 0.65}
                />
              );
            }),
          )}
          <circle cx="150" cy="178" r="20" fill={accent} opacity="0.9" />
          <circle cx="150" cy="178" r="9" fill={theme.base} opacity="0.85" />
          {ground}
        </>
      );

    // Swing between two trees - Raja, Dola.
    case 3:
      return (
        <>
          <path d="M72 330 L72 150" stroke={ink} strokeWidth="2.4" opacity="0.8" />
          <path d="M228 330 L228 150" stroke={ink} strokeWidth="2.4" opacity="0.8" />
          <path d="M72 150 Q150 122 228 150" stroke={ink} strokeWidth="1.6" fill="none" opacity="0.7" />
          {[-1, 1].map((s) => (
            <path
              key={s}
              d={`M${150 + s * 34} 148 L${150 + s * 34} 236`}
              stroke={ink}
              strokeWidth="1.3"
              opacity="0.7"
            />
          ))}
          <rect x="108" y="236" width="84" height="11" rx="2" fill={accent} opacity="0.9" />
          <rect x="108" y="236" width="84" height="11" rx="2" fill="none" stroke={ink} strokeWidth="0.9" opacity="0.6" />
          {[72, 228].map((x) =>
            [0, 1, 2].map((j) => (
              <ellipse
                key={`${x}-${j}`}
                cx={x + (j - 1) * 20}
                cy={150 - j * 10 - 14}
                rx="20"
                ry="13"
                fill={accent}
                opacity={0.22 + j * 0.08}
                stroke={ink}
                strokeWidth="0.6"
              />
            )),
          )}
          {ground}
        </>
      );

    // Full moon over water - Purnima festivals.
    case 4:
      return (
        <>
          <circle cx="150" cy="134" r="46" fill={accent} opacity="0.9" />
          <circle cx="150" cy="134" r="46" fill="none" stroke={ink} strokeWidth="1" opacity="0.5" />
          {Array.from({ length: 7 }).map((_, i) => (
            <path
              key={i}
              d={`M${56 + (i % 2) * 14} ${228 + i * 15} q24 -10 48 0 t48 0 t48 0`}
              stroke={ink}
              strokeWidth="1"
              fill="none"
              opacity={0.5 - i * 0.045}
            />
          ))}
          {/* a small boat, for Bali Jatra and the river nights */}
          <path d="M118 212 L182 212 L170 226 L130 226 Z" fill={ink} opacity="0.8" />
          <path d="M150 212 L150 182 L176 206 Z" fill={accent} opacity="0.9" stroke={ink} strokeWidth="0.7" />
          {ground}
        </>
      );

    // Harvest sheaf and grain - Nuakhai, Sankranti.
    default:
      return (
        <>
          {[-1, 0, 1].map((s) => (
            <path
              key={s}
              d={`M${150 + s * 40} 320 Q${150 + s * 46} 230 ${150 + s * 26} 150`}
              stroke={ink}
              strokeWidth="1.8"
              fill="none"
              opacity="0.75"
            />
          ))}
          {[-1, 0, 1].map((s) =>
            Array.from({ length: 9 }).map((_, i) => {
              const t = i / 9;
              const x = 150 + s * (26 + t * 18);
              const y = 160 + t * 150;
              return (
                <ellipse
                  key={`${s}-${i}`}
                  cx={x}
                  cy={y}
                  rx="6.5"
                  ry="11"
                  transform={`rotate(${s * 22} ${x} ${y})`}
                  fill={accent}
                  opacity="0.72"
                  stroke={ink}
                  strokeWidth="0.5"
                />
              );
            }),
          )}
          <path
            d="M104 300 q46 -22 92 0 l-8 30 l-76 0 Z"
            fill={accent}
            opacity="0.25"
            stroke={ink}
            strokeWidth="1"
          />
          {ground}
        </>
      );
  }
}
