"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import ContactModal from "@/components/ContactModal";

/*
 * Strong ease-out curve (from Emil Kowalski's design engineering philosophy).
 * Starts fast → settles slowly. Feels responsive, not sluggish.
 */
const EASE = [0.23, 1, 0.32, 1];

export default function Hero() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  /** Returns Motion props for a staggered fade-up reveal. */
  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: EASE },
      };

  return (
    <section
      id="hero"
      className="flex min-h-[100dvh] snap-start flex-col justify-center px-5 pt-16 sm:px-8 sm:pt-18 md:px-12 md:pt-0 lg:px-24"
    >
      <div className="mx-auto w-full max-w-[1400px]">

        {/* ── Name ── */}
        <motion.h1
          className="font-display text-[clamp(2.75rem,9vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.04em]"
          {...reveal(0)}
        >
          Joseph Orji
        </motion.h1>

        {/* ── Role ── */}
        <motion.p
          className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted md:mt-6 md:text-xs"
          {...reveal(0.12)}
        >
          Backend Engineer
        </motion.p>

        {/* ── Tagline ── */}
        <motion.p
          className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-text-muted md:mt-5 md:text-lg"
          {...reveal(0.24)}
        >
          One year in, still hooked. Building things, breaking things,
          occasionally fixing them.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-10"
          {...reveal(0.38)}
        >
          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex h-12 cursor-pointer items-center justify-center rounded-lg bg-accent px-7 text-sm font-medium text-bg transition-[transform,opacity,filter] duration-150 hover:opacity-90 hover:brightness-105 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Contact Me
          </button>
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-accent-dim/30 px-7 text-sm font-medium text-accent transition-[transform,border-color,background-color,color,filter] duration-150 hover:border-accent/50 hover:bg-accent/[0.04] hover:brightness-105 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Explore Projects
          </a>
        </motion.div>
      </div>

      {/* ── Contact Modal Dialog ── */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
}
