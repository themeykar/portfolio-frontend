"use client";

import { motion, useReducedMotion } from "motion/react";

/*
 * Strong ease-out curve (from Emil Kowalski's design engineering philosophy).
 * Starts fast → settles slowly. Feels responsive, not sluggish.
 */
const EASE = [0.23, 1, 0.32, 1];

const STACK_DATA = [
  {
    category: "Backend Technologies",
    skills: [
      "Python",
      "Django",
      "Django REST Framework",
      "SimpleJWT",
      "Django Channels",
      "Redis (Upstash)",
    ],
  },
  {
    category: "Frontend Technologies",
    skills: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    category: "Infrastructure & Tools",
    skills: [
      "PostgreSQL",
      "Neon",
      "Git",
      "GitHub",
      "Render",
      "Vercel",
      "Cloudflare Pages",
      "Resend",
      "Cloudinary",
    ],
  },
];

export default function Stack() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="stack"
      className="flex min-h-[100dvh] flex-col justify-center px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-24"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto max-w-4xl lg:max-w-5xl">
          {/* ── Section Heading: Stack (General Sans display treatment matching About) ── */}
          <motion.div
            className="mb-12 flex items-center gap-3.5 sm:mb-14 sm:gap-4 md:mb-16"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div
              aria-hidden="true"
              className="h-7 w-[2px] shrink-0 rounded-full bg-accent sm:h-8 md:h-11"
            />
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-text sm:text-4xl md:text-5xl">
              Stack
            </h2>
          </motion.div>

          {/* ── Clusters container ── */}
          <div className="space-y-10 sm:space-y-12 md:space-y-14">
            {STACK_DATA.map((cluster, index) => (
              <motion.div
                key={cluster.category}
                className="grid grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-12 md:gap-10 lg:gap-14"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : 0.08 + index * 0.08,
                  ease: EASE,
                }}
              >
                {/* ── Left column: Mono sub-label + Accent mark ── */}
                <div className="flex items-center gap-2.5 sm:gap-3 md:col-span-5">
                  <div
                    aria-hidden="true"
                    className="h-3 w-[2px] shrink-0 rounded-full bg-accent sm:h-3.5"
                  />
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted md:text-xs">
                    {cluster.category}
                  </h3>
                </div>

                {/* ── Right column: Technology badges ── */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 md:col-span-7">
                  {cluster.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-md border border-surface-alt bg-surface/70 px-3 py-1.5 font-mono text-xs text-text transition-[border-color,background-color,color] duration-150 hover:border-accent-dim/50 hover:bg-surface-alt hover:text-accent sm:text-[13px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
