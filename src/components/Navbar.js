"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

/*
 * Strong ease-out curve (from Emil Kowalski's design engineering philosophy).
 * Starts fast → settles slowly. Snappy, understated, not sluggish.
 */
const EASE = [0.23, 1, 0.32, 1];

const NAV_LINKS = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Stack", href: "#stack", id: "stack" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Handle scroll state (border/background appearance) and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Toggle background styling past top scroll threshold
      setIsScrolled(window.scrollY > 30);

      // Simple, lightweight active section detection
      const scrollPosition = window.scrollY + 200;
      let currentSection = "hero";

      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const sectionId = NAV_LINKS[i].id;
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBrandClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-200 ${isScrolled
          ? "border-b border-surface-alt/60 bg-bg/90 shadow-lg shadow-black/20"
          : "border-b border-transparent bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 sm:h-18 sm:px-8 md:px-12 lg:px-24">
        {/* ── Brand / Wordmark ── */}
        <button
          type="button"
          onClick={handleBrandClick}
          className="group inline-flex cursor-pointer items-center gap-2 font-display text-sm font-semibold tracking-[-0.02em] text-text transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Scroll to top of page"
        >
          <span>JO</span>
        </button>

        {/* ── Desktop Navigation Links ── */}
        <nav
          className="hidden items-center gap-7 md:flex lg:gap-8"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive
                    ? "font-medium text-accent"
                    : "text-text-muted hover:text-text"
                  }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* ── Mobile Menu Toggle Button ── */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-surface-alt bg-surface/60 text-text transition-[border-color,background-color] duration-150 hover:border-accent-dim/50 hover:bg-surface-alt active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
        >
          <div className="relative flex h-3.5 w-4.5 flex-col justify-between">
            <span
              className={`h-[1.5px] w-full rounded-full bg-current transition-transform duration-200 ${isMobileMenuOpen
                  ? "translate-y-[6px] rotate-45"
                  : ""
                }`}
            />
            <span
              className={`h-[1.5px] w-full rounded-full bg-current transition-opacity duration-150 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
            />
            <span
              className={`h-[1.5px] w-full rounded-full bg-current transition-transform duration-200 ${isMobileMenuOpen
                  ? "-translate-y-[6px] -rotate-45"
                  : ""
                }`}
            />
          </div>
        </button>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: -8 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.2, ease: EASE }}
            className="border-b border-surface-alt bg-bg/95 px-5 py-6 shadow-2xl md:hidden sm:px-8"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`flex items-center justify-between py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive
                        ? "font-medium text-accent"
                        : "text-text-muted hover:text-text"
                      }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
