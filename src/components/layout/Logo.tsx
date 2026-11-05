import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Brand logo displaying the official Odia calligraphy wordmark.
 */
export function Logo({
  className,
  tone = "dark",
  compact = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const isLight = tone === "light";
  const logoSrc = isLight
    ? "/images/ama-parba-logo-light.png"
    : "/images/ama-parba-logo.png";

  return (
    <Link
      href="#top"
      aria-label={`${brand.name} — home`}
      className={cn(
        "group inline-flex items-center transition-opacity duration-fast hover:opacity-90",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[3/1] w-auto transition-transform duration-base ease-editorial group-hover:scale-[1.03]",
          compact ? "h-8 xs:h-9" : "h-9 xs:h-10 sm:h-11",
        )}
      >
        <Image
          src={logoSrc}
          alt="Ama Parba - ଆମ ପର୍ବ"
          fill
          priority
          sizes="(max-width: 640px) 130px, 160px"
          className="object-contain object-left"
        />
      </div>
    </Link>
  );
}
