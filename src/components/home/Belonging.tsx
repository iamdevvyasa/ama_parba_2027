import { MotifDivider, MotifShikhara } from "@/components/ui/Motif";
import { Reveal } from "@/components/ui/Reveal";
import { belonging } from "@/data/content";

/**
 * Emotional storytelling section. Deliberately sparse: staggered text blocks,
 * large negative space, one decorative anchor. No product pitch here.
 */
export function Belonging() {
  return (
    <section
      id="belonging"
      className="relative overflow-hidden bg-earth-900 py-section text-ivory"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <MotifShikhara className="absolute left-1/2 top-1/2 h-[700px] w-[520px] -translate-x-1/2 -translate-y-1/2 text-ivory/[0.045]" />
        <div className="motif-dots absolute right-[8%] top-[14%] h-32 w-32 text-ivory/15" />
      </div>

      <div className="shell relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5 text-saffron">{belonging.eyebrow}</p>
          <h2 className="text-fluid-3xl tracking-tighter2 text-ivory balance">
            {belonging.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-[38ch] text-fluid-lg leading-relaxed text-ivory/60">
            {belonging.lead}
          </p>
        </Reveal>

        <MotifDivider className="mx-auto mt-14 max-w-xs text-saffron/60" />

        {/* Staggered passages - alternating alignment, never a wall of text. */}
        <div className="mt-16 flex flex-col gap-14 lg:mt-20 lg:gap-20">
          {belonging.passages.map((passage, i) => {
            const alignment =
              i === 0
                ? "lg:mr-auto lg:text-left"
                : i === 1
                  ? "lg:ml-auto lg:text-right"
                  : "lg:mx-auto lg:text-center";

            return (
              <Reveal
                key={passage.id}
                delay={i * 0.05}
                className={`max-w-[46ch] ${alignment}`}
              >
                <p className="font-display text-fluid-xl leading-[1.5] text-ivory/90 balance">
                  <span
                    aria-hidden
                    className="mr-3 font-sans text-fluid-xs tabular-nums text-saffron/70"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {passage.text}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mx-auto mt-20 max-w-[40ch] text-center">
          <MotifDivider className="mb-10 text-saffron/50" />
          <p className="font-display text-fluid-2xl leading-snug text-saffron balance">
            {belonging.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
