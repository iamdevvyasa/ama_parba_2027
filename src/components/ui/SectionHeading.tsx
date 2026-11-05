import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  /** Rendered under the lead - usually a CTA or a note. */
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  heading,
  lead,
  align = "left",
  tone = "dark",
  className,
  children,
}: SectionHeadingProps) {
  const centred = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centred && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "eyebrow mb-4 flex items-center gap-3",
              centred && "justify-center",
              tone === "light" && "text-saffron",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "h-px w-7",
                tone === "light" ? "bg-saffron/60" : "bg-maroon/40",
              )}
            />
            {eyebrow}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <h2
          className={cn(
            "max-w-[20ch] text-fluid-3xl tracking-tighter2 balance",
            centred && "mx-auto",
            tone === "light" && "text-ivory",
          )}
        >
          {heading}
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 max-w-prose text-fluid-lg leading-relaxed",
              centred && "mx-auto",
              tone === "light" ? "text-ivory/70" : "text-earth-400",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}

      {children && <Reveal delay={0.18}>{children}</Reveal>}
    </div>
  );
}
