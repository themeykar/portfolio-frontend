"use client";

import { motion, useReducedMotion } from "motion/react";

/*
 * Strong ease-out curve (from Emil Kowalski's design engineering philosophy).
 * Starts fast → settles slowly. Feels responsive, not sluggish.
 */
const EASE = [0.23, 1, 0.32, 1];

/**
 * Reusable Section Layout Template:
 * - Full viewport height (min-h-[100dvh]) + vertical centering prevents overlap
 *   and ensures each section owns its viewport cleanly during scroll.
 * - Symmetrical horizontal centering on wide desktop displays (1440px, 1920px+)
 *   via outer max-w-[1400px] + inner max-w-4xl / lg:max-w-5xl mx-auto wrapper.
 * - Asymmetric two-column grid on desktop (narrow left col, wide right col).
 * - Mobile: collapses cleanly to single column with heading stacked above body.
 * - Left column: General Sans display heading + proportionate accent mark.
 * - Right column: wide container holding section children.
 * - Responsive horizontal gutters aligned with Hero section (px-5 sm:px-8 md:px-12 lg:px-24).
 */
export default function SectionLayout({
  id,
  title,
  children,
  className = "",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      className={`flex min-h-[100dvh] snap-start snap-always flex-col justify-center px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 lg:max-w-5xl lg:gap-16">
          {/* ── Left column: Display heading + Proportionate accent mark with rule-draw reveal ── */}
          <div className="flex items-start md:col-span-4">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <motion.div
                aria-hidden="true"
                className="h-7 w-[2px] shrink-0 origin-top rounded-full bg-accent sm:h-8 md:h-11"
                initial={reduceMotion ? false : { scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
              <motion.h2
                className="font-display text-3xl font-semibold tracking-[-0.03em] text-text sm:text-4xl md:text-5xl"
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : 0.08,
                  ease: EASE,
                }}
              >
                {title}
              </motion.h2>
            </div>
          </div>

          {/* ── Right column: Section content ── */}
          <motion.div
            className="md:col-span-8"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
            transition={{
              duration: 0.55,
              delay: reduceMotion ? 0 : 0.14,
              ease: EASE,
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
