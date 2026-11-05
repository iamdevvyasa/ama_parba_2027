"use client";

import Image from "next/image";
import type { Festival } from "@/types";
import { cn } from "@/lib/utils";
import { CardArtwork } from "./CardArtwork";

interface FestivalCardProps {
  festival: Festival;
  active?: boolean;
  onSelect?: (festival: Festival) => void;
  /** Index in the collection, shown as 01 / 12. */
  index?: number;
  total?: number;
}

export function FestivalCard({
  festival,
  active = false,
  onSelect,
  index,
  total,
}: FestivalCardProps) {
  const art = festival.cardIllustration;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(festival)}
      aria-pressed={active}
      aria-label={`${festival.name}, ${festival.month}`}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-panel text-left",
        "transition-[transform,box-shadow] duration-base ease-editorial",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
        active
          ? "shadow-lift ring-2 ring-maroon"
          : "shadow-soft ring-1 ring-earth/10 hover:-translate-y-1.5 hover:shadow-lift",
      )}
      style={{ backgroundColor: festival.theme.base }}
    >
      {/* Artwork */}
      <span className="relative block aspect-[5/7] w-full overflow-hidden">
        {art ? (
          <Image
            src={art.src}
            alt={art.alt}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 300px"
            className="object-cover transition-transform duration-slow ease-editorial group-hover:scale-[1.04]"
          />
        ) : (
          <span className="block h-full w-full transition-transform duration-slow ease-editorial group-hover:scale-[1.04]">
            <CardArtwork festival={festival} showLabel={false} />
          </span>
        )}

        {/* Month chip */}
        <span
          className="absolute left-3 top-3 rounded-pill px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-eyebrow"
          style={{
            backgroundColor: festival.theme.ink,
            color: festival.theme.base,
          }}
        >
          {festival.month.slice(0, 3)}
        </span>

        {index !== undefined && total !== undefined && (
          <span
            className="absolute right-3 top-3 font-sans text-[10px] tabular-nums"
            style={{ color: festival.theme.ink, opacity: 0.6 }}
          >
            {String(index + 1).padStart(2, "0")}/{total}
          </span>
        )}
      </span>

      {/* Caption */}
      <span
        className="flex flex-1 flex-col gap-1 border-t px-4 py-4"
        style={{ borderColor: `${festival.theme.ink}22` }}
      >
        <span
          lang="or"
          className="font-odia text-fluid-sm leading-tight"
          style={{ color: festival.theme.accent }}
        >
          {festival.odiaName}
        </span>
        <span
          className="font-display text-fluid-lg leading-tight tracking-tightish"
          style={{ color: festival.theme.ink }}
        >
          {festival.name}
        </span>
        <span
          className="mt-0.5 text-fluid-xs leading-snug"
          style={{ color: festival.theme.ink, opacity: 0.68 }}
        >
          {festival.shortDescription}
        </span>
      </span>
    </button>
  );
}
