"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home",           href: "#hero" },
  { label: "About",          href: "#about" },
  { label: "Education",      href: "#education" },
  { label: "Skills",         href: "#skills" },
  { label: "Projects",       href: "#projects" },
  { label: "Experience",     href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",        href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState("hero");

  /* ── scroll → glass effect + active section ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const ids = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_2px_30px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("#hero")}
            aria-label="Back to top"
            className="font-heading text-2xl tracking-widest text-white hover:text-[var(--color-scarlet-red)] transition-colors duration-300 select-none"
            data-interactive="true"
          >
            GUS<span className="text-[var(--color-scarlet-red)]">.</span>
          </button>

          {/* ── Desktop Links ── */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    data-interactive="true"
                    className={`relative px-4 py-2 text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                      isActive
                        ? "text-[var(--color-scarlet-red)]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 bg-[var(--color-scarlet-red)] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── CTA (desktop) ── */}
          <a
            href="/Ujjwal_Shreyas_Resume.pdf"
            download
            data-interactive="true"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-full border-2 border-[var(--color-scarlet-red)] text-[var(--color-scarlet-red)] hover:bg-[var(--color-scarlet-red)] hover:text-white transition-all duration-300"
          >
            Resume
          </a>

          {/* ── Hamburger (mobile) ── */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            data-interactive="true"
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-lg hover:bg-white/5 transition-colors"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[2px] bg-white rounded-full origin-center"
            />
          </button>
        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-[999] w-72 bg-[#0f0f0f] border-l border-white/5 flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                <span className="font-heading text-xl tracking-widest text-white">
                  GUS<span className="text-[var(--color-scarlet-red)]">.</span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  data-interactive="true"
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Nav items */}
              <ul className="flex flex-col mt-4 px-4 gap-1">
                {navLinks.map(({ label, href }, i) => {
                  const id = href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <button
                        onClick={() => scrollTo(href)}
                        data-interactive="true"
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium uppercase tracking-widest transition-all duration-200 ${
                          isActive
                            ? "bg-[var(--color-scarlet-red)]/10 text-[var(--color-scarlet-red)] border border-[var(--color-scarlet-red)]/20"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="text-[var(--color-scarlet-red)]/60 mr-3 font-heading text-base">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {label}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Drawer CTA */}
              <div className="mt-auto px-6 pb-8">
                <a
                  href="/Ujjwal_Shreyas_Resume.pdf"
                  download
                  data-interactive="true"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold uppercase tracking-wider rounded-full bg-[var(--color-scarlet-red)] text-white hover:bg-red-700 transition-all duration-300"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
