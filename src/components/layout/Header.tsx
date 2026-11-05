"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navItems } from "@/data/content";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock the page behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-[background-color,box-shadow,backdrop-filter] duration-base ease-editorial",
          scrolled
            ? "bg-ivory/90 shadow-soft backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="shell-wide flex h-[var(--header-h)] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.slice(1).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative inline-flex items-center rounded-pill px-3.5 py-2 font-sans text-fluid-sm text-earth-600 transition-colors duration-fast hover:text-maroon"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 xs:gap-2.5">
            <Button href="#pricing" size="sm" className="hidden xs:inline-flex">
              Shop Now
            </Button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full border border-earth/15 text-earth-700 transition-colors duration-fast hover:border-maroon/40 hover:text-maroon lg:hidden"
            >
              <Menu size={19} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <MobileDrawer onClose={() => setOpen(false)} reduced={!!reduced} />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileDrawer({
  onClose,
  reduced,
}: {
  onClose: () => void;
  reduced: boolean;
}) {
  const t = reduced ? { duration: 0 } : { duration: 0.42, ease: ease.entrance };

  return (
    <motion.div
      className="fixed inset-0 z-50 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div
        className="absolute inset-0 bg-earth-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        className="absolute inset-y-0 right-0 flex w-full max-w-[400px] flex-col bg-ivory shadow-deep"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={t}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between px-gutter">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            autoFocus
            className="grid h-11 w-11 place-items-center rounded-full border border-earth/15 text-earth-700 transition-colors hover:border-maroon/40 hover:text-maroon"
          >
            <X size={19} strokeWidth={1.6} />
          </button>
        </div>

        <div aria-hidden className="mx-gutter h-px bg-earth/10" />

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-gutter py-6">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <motion.li
                key={item.href}
                initial={reduced ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduced ? 0 : 0.1 + i * 0.05, ...t }}
                className="border-b border-earth/10 last:border-0"
              >
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex items-baseline gap-3 py-4 font-display text-fluid-xl text-earth-900 transition-colors hover:text-maroon"
                >
                  <span className="font-sans text-[11px] tabular-nums text-maroon/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-earth/10 px-gutter py-5">
          <Button href="#collection" size="lg" className="w-full" onClick={onClose}>
            Shop Now
          </Button>
        </div>

        <div aria-hidden className="h-2 w-full motif-band" />
      </motion.div>
    </motion.div>
  );
}
