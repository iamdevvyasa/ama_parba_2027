"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Info, UtensilsCrossed } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MotifRosette } from "@/components/ui/Motif";
import { festivalExplorer } from "@/data/content";
import { festivalDateDisclaimer, festivals } from "@/data/festivals";
import { ease } from "@/lib/motion";
import type { Festival } from "@/types";
import { FestivalCard } from "./FestivalCard";

/**
 * Phase 1 festival explorer: a horizontal rail of cards plus a detail panel
 * that swaps on selection. Rail uses native scroll-snap - no carousel library.
 * Phase 2 refines the transition between card and detail.
 */
export function FestivalExplorer() {
  const [selected, setSelected] = useState<Festival>(festivals[0]);
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const scrollRail = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    // Advance by one card plus its gap.
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  return (
    <section id="festivals" className="bg-ivory py-section">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={festivalExplorer.eyebrow}
            heading={festivalExplorer.heading}
            lead={festivalExplorer.lead}
            className="lg:max-w-2xl"
          />

          {/* Rail controls - desktop only; mobile swipes. */}
          <Reveal className="hidden shrink-0 gap-2 lg:flex">
            <RailButton direction="prev" onClick={() => scrollRail(-1)} />
            <RailButton direction="next" onClick={() => scrollRail(1)} />
          </Reveal>
        </div>
      </div>

      {/* Full-bleed rail: starts at the shell gutter, runs off the right edge. */}
      <div
        ref={railRef}
        className="rail mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 pl-gutter pr-gutter lg:mt-14"
        role="group"
        aria-label="Festival collection"
      >
        {/* Centring spacer so the rail aligns to the shell on wide screens. */}
        <div
          aria-hidden
          className="hidden shrink-0 2xl:block"
          style={{ width: "max(0px, calc((100vw - 1240px) / 2 - 2.5rem))" }}
        />

        {festivals.map((festival, i) => (
          <div
            key={festival.id}
            data-card
            className="w-[66vw] shrink-0 snap-start xs:w-[52vw] sm:w-[40vw] md:w-[31vw] lg:w-[23vw] xl:w-[270px]"
          >
            <FestivalCard
              festival={festival}
              active={selected.id === festival.id}
              onSelect={setSelected}
              index={i}
              total={festivals.length}
            />
          </div>
        ))}

        {/* The thirteenth card: acknowledged, not invented. */}
        <div
          data-card
          className="w-[66vw] shrink-0 snap-start xs:w-[52vw] sm:w-[40vw] md:w-[31vw] lg:w-[23vw] xl:w-[270px]"
        >
          <ThirteenthCard />
        </div>
      </div>

      {/* ---- Detail panel ---- */}
      <div className="shell mt-10 lg:mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: ease.editorial }}
            className="overflow-hidden rounded-panel border border-earth/10 bg-ivory-50 shadow-soft"
          >
            <div
              aria-hidden
              className="h-1.5 w-full"
              style={{ backgroundColor: selected.theme.accent }}
            />

            <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:p-12">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <p className="eyebrow">{selected.month}</p>
                  <DateBadge festival={selected} />
                </div>

                <h3 className="mt-3 text-fluid-2xl tracking-tighter2">
                  {selected.name}
                </h3>
                <p
                  lang="or"
                  className="mt-1.5 font-odia text-fluid-xl"
                  style={{ color: selected.theme.accent }}
                >
                  {selected.odiaName}
                </p>

                <p className="mt-6 max-w-prose text-fluid-base leading-relaxed text-earth-600">
                  {selected.story}
                </p>
              </div>

              <div className="flex flex-col gap-7">
                <div>
                  <h4 className="flex items-center gap-2 font-sans text-fluid-xs font-semibold uppercase tracking-eyebrow text-maroon">
                    <Info size={14} strokeWidth={1.8} />
                    Why it matters
                  </h4>
                  <p className="mt-3 text-fluid-sm leading-relaxed text-earth-400">
                    {selected.significance}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-sans text-fluid-xs font-semibold uppercase tracking-eyebrow text-maroon">
                    <UtensilsCrossed size={14} strokeWidth={1.8} />
                    On the plate
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {selected.traditionalFood.map((food) => (
                      <li
                        key={food}
                        className="rounded-pill border px-3 py-1.5 text-fluid-xs"
                        style={{
                          borderColor: `${selected.theme.accent}66`,
                          color: selected.theme.ink,
                          backgroundColor: `${selected.theme.accent}14`,
                        }}
                      >
                        {food}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="mt-5 flex items-start gap-2 text-fluid-xs leading-relaxed text-earth-400">
          <Info size={14} strokeWidth={1.6} className="mt-0.5 shrink-0" />
          {festivalDateDisclaimer}
        </p>
      </div>
    </section>
  );
}

/** Dates are only ever rendered once verified. */
function DateBadge({ festival }: { festival: Festival }) {
  if (festival.date.status === "confirmed" && festival.date.label) {
    return (
      <span className="font-sans text-fluid-xs tabular-nums text-earth-400">
        {festival.date.label}
      </span>
    );
  }
  return (
    <span className="font-sans text-fluid-xs italic text-earth-400/80">
      Date confirmed per edition
    </span>
  );
}

/**
 * The box holds 13 cards; the report names 12 festivals. Rather than inventing
 * a thirteenth or leaving an empty slot, the rail closes with a sealed card -
 * honest about the pending decision and attractive in its own right.
 */
function ThirteenthCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-panel border border-dashed border-maroon/30 bg-maroon/[0.04]">
      <div className="relative flex aspect-[5/7] w-full flex-col items-center justify-center gap-4 px-5 text-center">
        <div aria-hidden className="motif-ikat absolute inset-0 text-maroon/[0.06]" />
        <MotifRosette size={38} className="relative text-maroon/50" />
        <p className="relative font-display text-fluid-lg leading-tight text-maroon">
          The thirteenth card
        </p>
        <p className="relative text-fluid-xs leading-snug text-earth-400">
          Sealed until the collection is announced.
        </p>
      </div>
      <div className="border-t border-maroon/15 px-4 py-4">
        <p className="font-sans text-[10px] uppercase tracking-eyebrow text-maroon/70">
          Revealed at launch
        </p>
      </div>
    </div>
  );
}

function RailButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous festivals" : "Next festivals"}
      className="grid h-12 w-12 place-items-center rounded-full border border-earth/20 text-earth-600 transition-colors duration-fast hover:border-maroon hover:bg-maroon hover:text-ivory"
    >
      <Icon size={19} strokeWidth={1.6} />
    </button>
  );
}
