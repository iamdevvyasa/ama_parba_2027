"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SambalpuriFrame } from "@/components/ui/SambalpuriFrame";
import { hero } from "@/data/content";
import { duration, ease, lineReveal } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#FAF6EE]"
    >
      {/* Odisha art border background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <Image
          src="/images/odisha-art-border.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.08]"
          priority
        />
      </div>

      <div className="shell-wide relative grid items-center gap-12 pb-section-sm pt-12 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:pb-section lg:pt-16">
        {/* ---- Copy column ---- */}
        <div className="relative z-10 max-w-xl">
          <motion.p
            className="eyebrow mb-5 flex items-center gap-3"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.slow, delay: 0.1 }}
          >
            <span aria-hidden className="h-px w-8 bg-maroon/40" />
            {hero.eyebrow}
          </motion.p>

          <h1 className="font-display text-fluid-4xl tracking-tighter2 text-earth-900">
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  variants={lineReveal}
                  initial={reduced ? false : "hidden"}
                  animate="show"
                  transition={{ delay: 0.18 + i * 0.12 }}
                >
                  {i === 1 ? (
                    <em className="not-italic text-maroon">{line}</em>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-9 flex flex-col gap-3 xs:flex-row xs:items-center"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, delay: 0.5, ease: ease.entrance }}
          >
            <Button href={hero.secondaryCta.href} size="lg">
              {hero.secondaryCta.label}
              <ArrowRight
                size={17}
                strokeWidth={1.8}
                className="transition-transform duration-base ease-editorial group-hover:translate-x-1"
              />
            </Button>
          </motion.div>

          <motion.dl
            className="mt-12 flex gap-8 border-t border-earth/10 pt-6 xs:gap-12"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.slow, delay: 0.78 }}
          >
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-fluid-2xl text-maroon">
                    {stat.value}
                  </span>
                  <span className="mt-1 block max-w-[12ch] text-fluid-xs leading-snug text-earth-400">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---- Product composition ---- */}
        <HeroComposition reduced={!!reduced} />
      </div>

      {/* Scroll indicator - desktop only, where there is room for it. */}
      <motion.a
        href="#collection"
        aria-label="Scroll to next section"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-earth-400 transition-colors hover:text-maroon lg:flex"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="font-sans text-[10px] uppercase tracking-eyebrow">
          Scroll
        </span>
        <MoveDown size={15} strokeWidth={1.5} className="animate-float" />
      </motion.a>
    </section>
  );
}

function HeroComposition({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[460px] items-center justify-center">
      {/* Framed hero illustration with authentic Sambalpuri design border */}
      <motion.div
        className="w-full"
        initial={reduced ? false : { opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: ease.entrance }}
      >
        <SambalpuriFrame
          caption={
            <div className="relative aspect-[3/1] h-6 xs:h-7 w-auto">
              <Image
                src="/images/ama-parba-logo-light.png"
                alt="Ama Parba - ଆମ ପର୍ବ"
                fill
                sizes="100px"
                className="object-contain object-center"
              />
            </div>
          }
        >
          <div className="relative aspect-[853/1024] w-full overflow-hidden">
            <Image
              src="/images/hero-illustration.jpg"
              alt="Father and daughter in traditional Sambalpuri attire celebrating Odisha's festivals"
              fill
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 440px"
              className="object-cover object-top transition-transform duration-slow ease-editorial hover:scale-[1.02]"
            />
          </div>
        </SambalpuriFrame>
      </motion.div>
    </div>
  );
}
