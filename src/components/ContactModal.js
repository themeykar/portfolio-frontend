"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/*
 * Strong ease-out curve (from Emil Kowalski's design engineering philosophy).
 * Starts fast → settles slowly. Snappy, understated, not sluggish.
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

export default function ContactModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Ensure portal only renders on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Escape key and lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-focus close control for keyboard accessibility
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* ── Backdrop Overlay (Semi-transparent dark overlay, no blur) ── */}
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 bg-black/75"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />

          {/* ── Modal Card ── */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            aria-describedby="contact-modal-desc"
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-xl border border-surface-alt bg-surface p-6 shadow-2xl sm:p-8"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 6 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.97, y: 4 }
            }
            transition={{ duration: 0.2, ease: EASE }}
          >
            {/* Header: Title + Close Control */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="h-6 w-[2px] shrink-0 rounded-full bg-accent sm:h-7"
                />
                <h2
                  id="contact-modal-title"
                  className="font-display text-2xl font-semibold tracking-[-0.03em] text-text sm:text-3xl"
                >
                  Contact
                </h2>
              </div>

              {/* Close Control (Icon-free IBM Plex Mono button) */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs text-text-muted transition-colors duration-150 hover:bg-surface-alt hover:text-text active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Close
              </button>
            </div>

            {/* Invitation copy (reusing About / Contact section voice) */}
            <p
              id="contact-modal-desc"
              className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base sm:leading-[1.7]"
            >
              Feel free to hit me up if you want to talk about work, tech, or
              life in general.
            </p>

            {/* Four contact links (reusing exact Contact styling) */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-3.5">
              {/* Primary Contact: Email (Solid Accent) */}
              <a
                href="mailto:workwithorjiemeka07@gmail.com"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 font-mono text-xs font-medium text-bg transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:text-sm"
              >
                <span className="truncate">workwithorjiemeka07@gmail.com</span>
                <span aria-hidden="true" className="text-xs">
                  →
                </span>
              </a>

              {/* Secondary Social Links: GitHub, LinkedIn, X */}
              <div className="flex w-full items-center gap-2.5 sm:gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-surface-alt bg-surface/60 px-3 font-mono text-xs font-medium text-text transition-[transform,border-color,background-color,color] duration-150 hover:border-accent-dim/50 hover:bg-surface-alt hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:h-11 sm:text-sm"
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className="text-xs text-text-muted"
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
