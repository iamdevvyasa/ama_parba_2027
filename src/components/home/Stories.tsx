import { Play, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SambalpuriBorder } from "@/components/ui/SambalpuriBorder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { customerStories } from "@/data/content";
import type { CustomerStory } from "@/types";

/**
 * Customer story wall.
 *
 * Phase 1 ships the component with SAMPLE content only. Every tile is visibly
 * labelled - the brief forbids presenting invented testimonials as genuine.
 * Replace `customerStories` in src/data/content.ts with permissioned content.
 */
export function Stories() {
  return (
    <section id="stories" className="relative overflow-hidden bg-earth-900 py-section">
      <SambalpuriBorder className="absolute inset-x-0 top-0" />

      <div className="shell">
        <SectionHeading
          eyebrow="Stories"
          heading="The part we did not write."
          lead="Boxes opened on camera, sent home, put on desks. Customer stories appear here once we have permission to share them."
          align="center"
          tone="light"
        />

        <Reveal className="mt-6 flex justify-center">
          <p className="inline-flex items-center gap-2 rounded-pill border border-saffron/30 bg-saffron/10 px-4 py-2 font-sans text-fluid-xs text-saffron">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
            Sample layout · awaiting permissioned customer content
          </p>
        </Reveal>
      </div>

      {/* Full-bleed story rail */}
      <div
        className="rail mt-12 flex gap-4 overflow-x-auto pb-4 pl-gutter pr-gutter lg:mt-14 lg:gap-5"
        role="group"
        aria-label="Customer stories (sample)"
      >
        {customerStories.map((story, i) => (
          <div
            key={story.id}
            className="w-[62vw] shrink-0 snap-start xs:w-[48vw] sm:w-[36vw] md:w-[28vw] lg:w-[20vw] xl:w-[230px]"
          >
            <StoryCard story={story} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

function StoryCard({ story, index }: { story: CustomerStory; index: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-panel border border-ivory/12 bg-ivory/[0.04] transition-colors duration-base hover:border-ivory/25">
      {/* Portrait media slot - 9:16, matching the reel format these come from. */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-earth-700">
        <div
          aria-hidden
          className="motif-ikat absolute inset-0 text-ivory/[0.05]"
        />

        {/* Placeholder treatment, varied per index so the rail is not flat. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${150 + index * 24}deg, rgba(117,31,37,0.5), rgba(42,32,28,0.2))`,
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ivory/50">
          <Quote size={22} strokeWidth={1.4} />
          <span className="font-sans text-[9px] uppercase tracking-eyebrow">
            Sample image
          </span>
        </div>

        {story.hasVideo && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-earth-900/70 px-2.5 py-1 font-sans text-[9px] uppercase tracking-eyebrow text-ivory backdrop-blur-sm">
            <Play size={9} strokeWidth={2.4} fill="currentColor" />
            Video
          </span>
        )}

        <span className="absolute bottom-3 left-3 right-3">
          <span className="block font-sans text-[10px] uppercase tracking-eyebrow text-ivory/70">
            {story.preview}
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-fluid-xs leading-relaxed text-ivory/60">
          {story.quote}
        </p>
        <div className="mt-auto pt-4">
          <p className="font-sans text-fluid-xs font-medium text-ivory">
            {story.name}
          </p>
          <p className="mt-0.5 font-sans text-[11px] text-ivory/45">
            {story.handle} · {story.location}
          </p>
        </div>
      </div>
    </article>
  );
}
