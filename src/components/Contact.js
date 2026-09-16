"use client";

import { motion, useReducedMotion } from "motion/react";

/*
 * Strong ease-out curve (from Emil Kowalski's design engineering philosophy).
 * Starts fast → settles slowly. Feels responsive, not sluggish.
 */
const EASE = [0.23, 1, 0.32, 1];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/themeykar",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/orjie007",
  },
  {
    label: "X",
    href: "https://x.com/themeykar_",
  },
];

export default function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="flex min-h-[100dvh] snap-start flex-col justify-center px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-24"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto max-w-4xl lg:max-w-5xl">
          {/* ── Section Heading: Contact (General Sans display treatment matching established pattern) ── */}
          <div className="mb-8 flex items-center gap-3.5 sm:mb-10 sm:gap-4 md:mb-12">
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
              Contact
            </motion.h2>
          </div>

          {/* ── Invitation copy (Inter body) ── */}
          <motion.p
            className="max-w-[54ch] text-base leading-relaxed text-text-muted md:text-lg md:leading-[1.8]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: reduceMotion ? 0 : 0.12,
              ease: EASE,
            }}
          >
            Feel free to hit me up if you want to talk about work, tech, or
            life in general.
          </motion.p>

          {/* ── Contact Links Row with sequential micro-stagger (Email primary first, socials follow) ── */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 md:mt-10">
            {/* Primary Contact: Email (weighted arrival) */}
            <motion.a
              href="mailto:workwithorjiemeka07@gmail.com"
              initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : 0.18,
                ease: EASE,
              }}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 font-mono text-xs font-medium text-bg transition-[transform,opacity,filter] duration-150 hover:opacity-90 hover:brightness-105 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:w-auto sm:text-sm"
            >
              <span className="truncate">workwithorjiemeka07@gmail.com</span>
              <span aria-hidden="true" className="text-xs">→</span>
            </motion.a>

            {/* Social Links: GitHub, LinkedIn, X (sequential micro-stagger) */}
            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:gap-4">
              {SOCIAL_LINKS.map((link, sIdx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: reduceMotion ? 0 : 0.26 + sIdx * 0.06,
                    ease: EASE,
                  }}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-surface-alt bg-surface/60 px-4 font-mono text-xs font-medium text-text transition-[transform,border-color,background-color,color,filter] duration-150 hover:border-accent-dim/50 hover:bg-surface-alt hover:text-accent hover:brightness-105 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:flex-none sm:text-sm"
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true" className="text-xs text-text-muted">↗</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
