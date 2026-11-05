import { announcement } from "@/data/content";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-maroon text-ivory">
      <div className="shell flex min-h-[34px] items-center justify-center py-1.5">
        <p className="text-center font-sans text-[11px] font-medium uppercase tracking-eyebrow text-ivory/90 xs:text-fluid-xs">
          {announcement.message}
        </p>
      </div>
      {/* Thin woven edge, tying the bar to the brand's textile motif. */}
      <div aria-hidden className="h-2 w-full motif-band opacity-90" />
    </div>
  );
}
