import { Plus } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SambalpuriBorder } from "@/components/ui/SambalpuriBorder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/content";

/**
 * Native <details>/<summary> — keyboard accessible and open-by-default-free
 * without an accordion library or any client JS.
 */
export function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden bg-[#FAF6EE] py-section">
      <SambalpuriBorder className="absolute inset-x-0 top-0 z-10" />
      {/* Odisha art border background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <Image
          src="/images/odisha-art-border.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.08]"
        />
      </div>
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            eyebrow="Questions"
            heading="The short answers."
            lead="Anything else, and we are a message away."
          />

          <Reveal>
            <div className="divide-y divide-earth/12 border-y border-earth/12">
              {faqs.map((faq) => (
                <details key={faq.q} className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-display text-fluid-lg leading-snug text-earth-900 transition-colors duration-fast marker:content-none hover:text-maroon [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-earth/20 text-maroon transition-transform duration-base ease-editorial group-open:rotate-45">
                      <Plus size={14} strokeWidth={1.8} />
                    </span>
                  </summary>
                  <p className="max-w-prose pb-6 pr-12 text-fluid-sm leading-relaxed text-earth-400">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
