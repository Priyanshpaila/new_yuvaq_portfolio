"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, Sparkles, X } from "lucide-react";
import PillNav from "@/components/ui/PillNav";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
];

const LOGO_SRC = "/images/logo.png";
const AI_CONSULTANCY_URL = "https://www.yuvaq.com/client-home";

function AiConsultancyButton({
  mobile = false,
  onClick,
}: {
  mobile?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={AI_CONSULTANCY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-full p-px ${
        mobile ? "w-full" : "shrink-0"
      }`}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 pointer-events-none select-none">
          <span
            className="absolute block size-24 -translate-x-1/2 -translate-y-1/3 blur-xl"
            style={{
              background:
                "linear-gradient(135deg, rgb(122,105,249), rgb(242,99,120), rgb(245,131,63))",
            }}
          />
        </span>
      </span>

      <span className="ai-border-glow absolute inset-0 pointer-events-none select-none">
        <span
          className="ai-border-scale block h-full w-12 -translate-x-1/2 rounded-full blur-xl"
          style={{
            background:
              "linear-gradient(135deg, rgb(122,105,249), rgb(242,99,120), rgb(245,131,63))",
          }}
        />
      </span>

      <span
        className={`relative z-[1] flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/85 ${
          mobile ? "w-full px-4 py-3" : "px-4 py-2"
        }`}
      >
        <span className="relative transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-105">
          <Sparkles className="ai-star-rotate h-[18px] w-[18px] text-white/90" />
          <span
            className="ai-star-shine absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-lg"
            style={{
              background:
                "linear-gradient(135deg, rgb(59,196,242), rgb(122,105,249), rgb(242,99,120), rgb(245,131,63))",
            }}
          />
        </span>

        <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-sm font-medium text-transparent transition-transform group-hover:scale-[1.03]">
          Try AI Consultancy
        </span>
      </span>
    </a>
  );
}

function StartProjectPill({
  mobile = false,
  onClick,
}: {
  mobile?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/start-project"
      onClick={onClick}
      className={`group inline-flex ${
        mobile ? "w-full" : ""
      } items-center justify-center`}
    >
      <div
        className={`flex h-[40px] items-center gap-2 rounded-full bg-[#00b2f8] px-4 py-2 text-sm font-medium text-white shadow-[inset_0_3px_2px_rgba(255,255,255,0.1),inset_0_-3px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.30),inset_0_-8px_12px_rgba(0,0,0,0.12),0_6px_14px_-8px_rgba(0,0,0,0.18)] transition-all hover:border-black/15 hover:bg-[#0094cf] hover:shadow-[inset_0_3px_2px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.40),inset_0_-10px_14px_rgba(0,0,0,0.16),0_8px_18px_-10px_rgba(0,0,0,0.22)] active:translate-y-[1px] active:shadow-[inset_0_3px_2px_rgba(255,255,255,0.1),inset_0_1px_3px_rgba(0,0,0,0.22),inset_0_-6px_10px_rgba(0,0,0,0.18)] dark:bg-[#6336f7]/55 ${
          mobile ? "w-full justify-center" : ""
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          Start a Project
        </span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (mobileMenuOpen) return;
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#home");
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={mobileMenuOpen ? "visible" : hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed inset-x-0 top-0 z-50 pt-6 px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/#home"
              className="relative z-10 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative h-10 w-[120px] overflow-hidden">
                <Image
                  src={LOGO_SRC}
                  alt="YuvaQ Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav - Using the Premium PillNav */}
            <div className="hidden md:block">
               <PillNav 
                  items={links} 
                  activeHref={activeHash} 
                  pillColor="#22d3ee"
                  pillTextColor="rgba(255,255,255,0.8)"
                  hoveredPillTextColor="#000"
               />
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 lg:flex">
                <AiConsultancyButton />
                <StartProjectPill />
              </div>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed inset-x-4 top-4 z-[60] overflow-hidden rounded-[32px] border border-white/10 bg-black/95 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
                <Link href="/#home" onClick={() => setMobileMenuOpen(false)}>
                  <div className="relative h-8 w-24">
                    <Image src={LOGO_SRC} alt="YuvaQ Logo" fill className="object-contain" />
                  </div>
                </Link>
                <button
                  type="button"
                  className="text-white p-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="px-6 py-8">
                <nav className="flex flex-col gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-bold text-white/80 hover:text-cyan-400 py-3 block"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="space-y-4 pt-10">
                  <AiConsultancyButton mobile onClick={() => setMobileMenuOpen(false)} />
                  <StartProjectPill mobile onClick={() => setMobileMenuOpen(false)} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .ai-border-glow { animation: border-glow-translate 10s ease-in-out infinite alternate; }
        .ai-border-scale { animation: border-glow-scale 10s ease-in-out infinite alternate; }
        .ai-star-rotate { animation: star-rotate 14s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite alternate; }
        .ai-star-shine { animation: star-shine 14s ease-in-out infinite alternate; }
        @keyframes border-glow-translate { 0% { transform: translateX(-10%); } 100% { transform: translateX(115%); } }
        @keyframes border-glow-scale { 0% { transform: translateX(-50%) scaleY(0.7); } 100% { transform: translateX(-50%) scaleY(1.25); } }
        @keyframes star-rotate { 0% { transform: rotate(0deg) scale(1); } 100% { transform: rotate(240deg) scale(1.08); } }
        @keyframes star-shine { 0% { opacity: 0.08; transform: translate(-50%, -50%) scale(0.8); } 100% { opacity: 0.28; transform: translate(-50%, -50%) scale(1.2); } }
      `}</style>
    </>
  );
}
