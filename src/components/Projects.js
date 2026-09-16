"use client";

import { motion, useReducedMotion } from "motion/react";

/*
 * Strong ease-out curve (from Emil Kowalski's design engineering philosophy).
 * Starts fast → settles slowly. Feels responsive, not sluggish.
 */
const EASE = [0.23, 1, 0.32, 1];

const PROJECTS_DATA = [
  {
    category: "REAL-TIME APP",
    name: "QuickPoll",
    description:
      "Real-time, no-login polling, votes push live to everyone watching, no refresh.",
    tags: [
      "Django",
      "DRF",
      "Django Channels",
      "Redis",
      "React",
      "Vite",
      "Tailwind",
      "Framer Motion",
    ],
    link: "https://quickpoll-now.pages.dev",
  },
  {
    category: "EVENT PLATFORM",
    name: "EventRSVP",
    description:
      "Event management for hosts, zero-friction RSVP for guests, QR codes, calendar sync, email confirmations.",
    tags: [
      "Next.js",
      "Django",
      "DRF",
      "SimpleJWT",
      "Resend",
      "Tailwind",
    ],
    link: "https://eventrsvp-now.vercel.app",
  },
  {
    category: "SAAS TOOL",
    name: "SubWatch",
    description:
      "Subscription tracker that flags renewals before they blindside you.",
    tags: [
      "React",
      "Vite",
      "Tailwind",
      "Django",
      "DRF",
      "SimpleJWT",
      "PostgreSQL",
    ],
    link: "https://subwatch-tr.pages.dev",
  },
];

export default function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="flex min-h-[100dvh] snap-start snap-always flex-col justify-center px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-24"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto max-w-4xl lg:max-w-5xl">
          {/* ── Section Heading: Projects (General Sans display treatment matching About & Stack) ── */}
          <div className="mb-12 flex items-center gap-3.5 sm:mb-14 sm:gap-4 md:mb-16">
            <motion.div
              aria-hidden="true"
              className="h-7 w-[2px] shrink-0 origin-top rounded-full bg-accent sm:h-8 md:h-11"
              initial={reduceMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: EASE }}
            />
            <motion.h2
              className="font-display text-3xl font-semibold tracking-[-0.03em] text-text sm:text-4xl md:text-5xl"
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : 0.08,
                ease: EASE,
              }}
            >
              Projects
            </motion.h2>
          </div>

          {/* ── 3-Column Grid on Desktop, 1-Column on Mobile ── */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
            {PROJECTS_DATA.map((project, index) => (
              <motion.article
                key={project.name}
                className="group flex flex-col justify-between rounded-xl border-t-2 border-accent bg-surface/50 p-6 transition-[background-color,box-shadow,border-color] duration-200 hover:bg-surface-alt/40 hover:shadow-lg hover:shadow-black/30 sm:p-7"
                initial={reduceMotion ? false : { opacity: 0, y: 38, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15, margin: "0px 0px -50px 0px" }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -4, transition: { duration: 0.2, ease: EASE } }
                }
                transition={{
                  duration: 0.55,
                  delay: reduceMotion ? 0 : index * 0.12,
                  ease: EASE,
                }}
              >
                <div>
                  {/* Category Label (IBM Plex Mono + Accent) */}
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                    {project.category}
                  </p>

                  {/* Project Name */}
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-text sm:text-2xl">
                    {project.name}
                  </h3>

                  {/* One-Line Description */}
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md border border-surface-alt bg-surface/70 px-2.5 py-1 font-mono text-[11px] text-text transition-[border-color,color] duration-150 hover:border-accent-dim/40 hover:text-accent sm:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actionable Live Link Button */}
                <div className="mt-8 border-t border-surface-alt/40 pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-accent-dim/30 bg-accent/[0.04] px-4 font-mono text-xs font-medium text-accent transition-[transform,border-color,background-color,color,filter] duration-150 hover:border-accent/60 hover:bg-accent/[0.08] hover:brightness-105 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span>Live Project</span>
                    <span aria-hidden="true" className="text-[13px]">↗</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
