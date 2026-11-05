import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MotifRosette } from "@/components/ui/Motif";
import { SambalpuriBorder } from "@/components/ui/SambalpuriBorder";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { occasions, personalise } from "@/data/content";

/** Three sample treatments for the personalised card. */
const sampleStyles = [
  {
    id: "traditional",
    name: "Traditional",
    detail: "Temple border, hand-lettered Odia",
    base: "#F3E3C8",
    ink: "#751F25",
    accent: "#D88945",
  },
  {
    id: "minimal",
    name: "Minimal",
    detail: "One rule, one date, nothing else",
    base: "#F8F3E9",
    ink: "#46362F",
    accent: "#7A8669",
  },
  {
    id: "festive",
    name: "Festive",
    detail: "Full colour, alpana border",
    base: "#751F25",
    ink: "#F8F3E9",
    accent: "#D88945",
  },
];

export function Personalise() {
  return (
    <section id="personalise" className="relative overflow-hidden bg-[#FAF6EE] py-section">
      <SambalpuriBorder className="absolute inset-x-0 top-0 z-10" />

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Copy */}
          <div>
            <SectionHeading
              eyebrow={personalise.eyebrow}
              heading={personalise.heading}
              lead={personalise.lead}
            />

            <RevealGroup className="mt-10 flex flex-col gap-5" gap={0.07}>
              {personalise.steps.map((step) => (
                <RevealItem key={step.step}>
                  <div className="flex gap-5">
                    <span className="font-display text-fluid-lg tabular-nums text-maroon/45">
                      {step.step}
                    </span>
                    <div className="border-l border-earth/12 pl-5">
                      <p className="font-sans text-fluid-sm font-semibold text-earth-900">
                        {step.title}
                      </p>
                      <p className="mt-1 max-w-[38ch] text-fluid-sm leading-relaxed text-earth-400">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="mt-10" delay={0.1}>
              <Button href={personalise.cta.href} size="lg">
                {personalise.cta.label}
                <ArrowRight
                  size={17}
                  strokeWidth={1.8}
                  className="transition-transform duration-base ease-editorial group-hover:translate-x-1"
                />
              </Button>
              <p className="mt-3 text-fluid-xs text-earth-400">
                {personalise.phaseNote}
              </p>
            </Reveal>
          </div>

          {/* Sample card styles */}
          <RevealGroup className="grid grid-cols-1 gap-5 xs:grid-cols-3 lg:gap-4" gap={0.09}>
            {sampleStyles.map((style, i) => (
              <RevealItem
                key={style.id}
                className={i === 1 ? "xs:mt-8 lg:mt-10" : ""}
              >
                <SampleCard style={style} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Occasions */}
        <div className="mt-20 border-t border-earth/10 pt-12 lg:mt-24">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span aria-hidden className="h-px w-7 bg-maroon/40" />
              Dates people choose
            </p>
          </Reveal>

          <RevealGroup className="flex flex-wrap gap-2.5" gap={0.04}>
            {occasions.map((occasion) => {
              const Icon =
                (Icons[occasion.icon as keyof typeof Icons] as React.ElementType) ??
                Icons.Calendar;
              return (
                <RevealItem key={occasion.id}>
                  <div className="group flex items-center gap-3 rounded-pill border border-earth/15 bg-ivory-50 py-2.5 pl-3.5 pr-5 transition-colors duration-base hover:border-maroon/40 hover:bg-maroon/[0.03]">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-maroon/8 text-maroon">
                      <Icon size={15} strokeWidth={1.7} />
                    </span>
                    <span>
                      <span className="block font-sans text-fluid-sm font-medium text-earth-900">
                        {occasion.title}
                      </span>
                      <span className="block text-fluid-xs text-earth-400">
                        {occasion.description}
                      </span>
                    </span>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

function SampleCard({ style }: { style: (typeof sampleStyles)[number] }) {
  return (
    <figure className="flex h-full flex-col">
      <div
        className="relative flex aspect-[5/7] flex-col items-center justify-center overflow-hidden rounded-panel px-4 text-center shadow-lift ring-1 ring-earth/10"
        style={{ backgroundColor: style.base }}
      >
        <div
          aria-hidden
          className="absolute inset-3 rounded-[3px] border"
          style={{ borderColor: `${style.ink}33` }}
        />

        <MotifRosette size={22} style={{ color: style.accent }} className="relative" />

        <p
          className="relative mt-3 font-sans text-[9px] uppercase tracking-eyebrow"
          style={{ color: style.ink, opacity: 0.6 }}
        >
          Your occasion
        </p>
        <p
          className="relative mt-1.5 font-display text-fluid-lg leading-tight"
          style={{ color: style.ink }}
        >
          Your names
        </p>
        <p
          className="relative mt-2 font-sans text-[11px] tabular-nums"
          style={{ color: style.accent }}
        >
          DD · MM · YYYY
        </p>

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1.5"
          style={{ backgroundColor: style.accent }}
        />
      </div>

      <figcaption className="mt-3.5">
        <p className="font-sans text-fluid-sm font-medium text-earth-900">
          {style.name}
        </p>
        <p className="mt-0.5 text-fluid-xs leading-snug text-earth-400">
          {style.detail}
        </p>
      </figcaption>
    </figure>
  );
}
