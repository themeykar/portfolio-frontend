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
      className={`flex min-h-[100dvh] flex-col justify-center px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 lg:max-w-5xl lg:gap-16">
          {/* ── Left column: Display heading + Proportionate accent mark ── */}
          <motion.div
            className="flex items-start md:col-span-4"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div
                aria-hidden="true"
                className="h-7 w-[2px] shrink-0 rounded-full bg-accent sm:h-8 md:h-11"
              />
              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-text sm:text-4xl md:text-5xl">
                {title}
              </h2>
            </div>
          </motion.div>

          {/* ── Right column: Section content ── */}
          <motion.div
            className="md:col-span-8"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: reduceMotion ? 0 : 0.1,
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
