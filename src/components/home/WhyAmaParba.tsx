import { MotifRosette } from "@/components/ui/Motif";
import { SambalpuriBorder } from "@/components/ui/SambalpuriBorder";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyAmaParba } from "@/data/content";

export function WhyAmaParba() {
  return (
    <section className="relative overflow-hidden bg-[#FAF6EE] py-section">
      <SambalpuriBorder className="absolute inset-x-0 top-0 z-10" />
      <div className="shell">
        <SectionHeading
          eyebrow="Why Ama Parba · ପରମ୍ପରା"
          heading="Crafted like a Smruti (ସ୍ମୃତି) meant to be kept."
          className="max-w-2xl"
        />

        <RevealGroup
          className="mt-12 grid gap-px overflow-hidden rounded-panel border border-earth/12 bg-earth/12 sm:grid-cols-2 lg:mt-16"
          gap={0.06}
        >
          {whyAmaParba.map((item, i) => (
            <RevealItem key={item.id} className="bg-ivory">
              <div className="flex h-full flex-col p-7 lg:p-9">
                <div className="flex items-center gap-3">
                  <MotifRosette size={20} className="text-maroon/60" />
                  <span className="font-sans text-fluid-xs tabular-nums text-maroon/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-fluid-xl leading-tight tracking-tightish">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[40ch] text-fluid-sm leading-relaxed text-earth-400">
                  {item.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
