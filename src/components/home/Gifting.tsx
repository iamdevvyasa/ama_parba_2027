import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SambalpuriBorder } from "@/components/ui/SambalpuriBorder";
import { MotifRosette } from "@/components/ui/Motif";
import { giftingAudiences } from "@/data/content";

function OdiaCornerMotif({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotateClass = {
    tl: "",
    tr: "rotate-90",
    br: "rotate-180",
    bl: "-rotate-90",
  }[position];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute h-8 w-8 select-none ${rotateClass} ${
        position.includes("t") ? "top-2.5" : "bottom-2.5"
      } ${position.includes("l") ? "left-2.5" : "right-2.5"}`}
    >
      <svg viewBox="0 0 32 32" className="h-full w-full" fill="none">
        {/* Odia temple corner keylines */}
        <path d="M 2 30 L 2 2 L 30 2" stroke="#751F25" strokeWidth="1.2" opacity="0.45" />
        <path d="M 6 26 L 6 6 L 26 6" stroke="#D88945" strokeWidth="0.8" opacity="0.6" />
        {/* Traditional Sambalpuri Bandha corner rosette */}
        <polygon points="14,8 19,13 14,18 9,13" fill="#D88945" opacity="0.55" />
        <polygon points="14,9.5 17.5,13 14,16.5 10.5,13" fill="#751F25" opacity="0.75" />
        <circle cx="14" cy="13" r="1.5" fill="#FAF5EC" />
      </svg>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function Gifting() {
  return (
    <section id="gifting" className="relative overflow-hidden bg-[#FAF6EE] py-section">
      <SambalpuriBorder className="absolute inset-x-0 top-0 z-10" />
      <div className="shell">
        <SectionHeading
          eyebrow="Gifting"
          heading="Someone is waiting for a parcel from home."
          lead="Six ways this box has been given. Pick the one that sounds like your people."
          className="max-w-2xl"
        />

        {/* Minimal typography-focused editorial layout */}
        <RevealGroup
          className="mt-10 grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
          gap={0.06}
        >
          {giftingAudiences.map((audience, i) => (
            <RevealItem key={audience.id}>
              <div className="group border-t border-earth/15 pt-5 transition-colors duration-fast hover:border-maroon/50">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-maroon">
                  {String(i + 1).padStart(2, "0")} · {audience.title}
                </span>
                <p className="mt-2 font-display text-fluid-lg italic text-earth-900">
                  {audience.line}
                </p>
                <p className="mt-2.5 text-fluid-xs leading-relaxed text-earth-400">
                  {audience.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Corporate & bulk ordering strip with Odia traditional design */}
        <Reveal className="mt-12 lg:mt-16">
          <div
            id="bulk-gifting"
            className="relative flex flex-col items-start gap-5 overflow-hidden rounded-panel border-2 border-maroon/25 bg-gradient-to-br from-[#FAF5EC] via-[#F8EFE1] to-[#F3E5D0] p-6 shadow-lift ring-1 ring-saffron/30 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            {/* Top & bottom authentic Sambalpuri Bandha borders */}
            <SambalpuriBorder height={7} className="absolute inset-x-0 top-0 opacity-90" />
            <SambalpuriBorder height={7} className="absolute inset-x-0 bottom-0 opacity-90" />

            {/* Four Odia corner motifs (Bandha Phula) */}
            <OdiaCornerMotif position="tl" />
            <OdiaCornerMotif position="tr" />
            <OdiaCornerMotif position="bl" />
            <OdiaCornerMotif position="br" />

            {/* Traditional Ikat diamond watermark texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-[0.035]"
            >
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="gifting-box-ikat" width="48" height="48" patternUnits="userSpaceOnUse">
                    <polygon points="24,4 44,24 24,44 4,24" fill="none" stroke="#751F25" strokeWidth="1" />
                    <polygon points="24,10 38,24 24,38 10,24" fill="none" stroke="#D88945" strokeWidth="0.8" />
                    <polygon points="24,16 32,24 24,32 16,24" fill="#751F25" opacity="0.4" />
                    <circle cx="24" cy="24" r="1.5" fill="#D88945" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#gifting-box-ikat)" />
              </svg>
            </div>

            {/* Festive ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-saffron/15 blur-2xl"
            />

            {/* Copy column */}
            <div className="relative z-10 max-w-xl">
              <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-pill border border-maroon/20 bg-maroon/[0.06] px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-maroon">
                <MotifRosette size={11} className="text-maroon" />
                <span>Bulk Gifting & Celebrations · ବୃହତ ଉପହାର</span>
              </div>
              <h3 className="font-display text-fluid-lg tracking-tightish text-earth-900">
                Ordering for an office or an event?
              </h3>
              <p className="mt-1 text-fluid-xs leading-relaxed text-earth-400">
                Bulk pricing starts at ten boxes. Larger orders can carry your own
                message on a custom card. Connect with our team directly on WhatsApp for custom quotes.
              </p>
            </div>

            {/* Action button */}
            <a
              href="https://wa.me/918249399817?text=Hi%20Ama%20Parba%2C%20I%20would%20like%20to%20request%20a%20quote%20for%20bulk%20gifting."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Request a quote on WhatsApp (opens in new window)"
              className="group relative z-10 inline-flex shrink-0 items-center gap-2.5 rounded-pill bg-[#25D366] px-6 py-3.5 font-sans text-fluid-xs font-semibold tracking-wide text-white shadow-lift ring-2 ring-white/70 transition-all duration-base ease-editorial hover:bg-[#20ba59] hover:shadow-deep hover:scale-[1.02] active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              <span>Request a Quote</span>
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="transition-transform duration-base ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
