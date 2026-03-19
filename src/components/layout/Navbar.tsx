"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { Menu, Sparkles, X } from "lucide-react";

const links = [
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/#work" },
  { name: "About", href: "/#about" },
  { name: "Process", href: "/#process" },
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
        className={`flex h-[50px] items-center gap-2 rounded-full  text-black transition-all  dark:text-white ${
          mobile ? "w-full justify-between" : ""
        }`}
      >
        <div
          className={`flex h-[40px] items-center justify-center gap-2 rounded-full bg-[#00b2f8] px-4 py-2 text-sm font-medium text-white shadow-[inset_0_3px_2px_rgba(255,255,255,0.1),inset_0_-3px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.30),inset_0_-8px_12px_rgba(0,0,0,0.12),0_6px_14px_-8px_rgba(0,0,0,0.18)] transition-all hover:border-black/15 hover:bg-[#0094cf] hover:shadow-[inset_0_3px_2px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.40),inset_0_-10px_14px_rgba(0,0,0,0.16),0_8px_18px_-10px_rgba(0,0,0,0.22)] active:translate-y-[1px] active:shadow-[inset_0_3px_2px_rgba(255,255,255,0.1),inset_0_1px_3px_rgba(0,0,0,0.22),inset_0_-6px_10px_rgba(0,0,0,0.18)] dark:bg-[#6336f7]/55 ${
            mobile ? "flex-1 justify-center" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 animate-spin"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m4.93 4.93 4.24 4.24" />
            <path d="m14.83 9.17 4.24-4.24" />
            <path d="m14.83 14.83 4.24 4.24" />
            <path d="m9.17 14.83-4.24 4.24" />
            <circle cx="12" cy="12" r="4" />
          </svg>

          <span className="flex items-center justify-center gap-2">
            Start a Project
          </span>
        </div>

        {/* <div className="flex size-[24px] items-center justify-center rounded-full border border-zinc-400 transition-all duration-300 ease-in-out group-hover:ml-4 dark:border-zinc-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300 ease-in-out group-hover:rotate-180"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div> */}
      </div>
    </Link>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={mobileMenuOpen ? "visible" : hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen ? "py-4" : "py-6"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div
            className={`flex items-center justify-between rounded-full px-4 py-3 transition-all duration-300 sm:px-6 ${
              isScrolled || mobileMenuOpen
                ? "glass border border-white/10 shadow-2xl shadow-cyan-900/10"
                : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <Link
              href="/#home"
              className="relative z-10 flex items-center gap-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative h-10 w-[136px] overflow-hidden">
                <Image
                  src={LOGO_SRC}
                  alt="YuvaQ Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden items-center gap-3 md:flex">
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
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-4 top-4 z-[60] overflow-hidden rounded-[28px] border border-white/10 bg-black/95 shadow-[0_20px_80px_rgba(0,0,0,0.55)] md:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                <Link
                  href="/#home"
                  className="flex items-center gap-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="relative h-10 w-20 overflow-hidden rounded-lg">
                    <Image
                      src={LOGO_SRC}
                      alt="YuvaQ Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>

              <div className="px-5 py-4">
                <nav className="flex flex-col">
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="border-b border-white/8 py-4 text-[1.15rem] font-semibold text-white/80 transition-colors hover:text-cyan-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="space-y-3 pt-6">
                  <AiConsultancyButton
                    mobile
                    onClick={() => setMobileMenuOpen(false)}
                  />

                  <StartProjectPill
                    mobile
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .ai-border-glow {
          animation: border-glow-translate 10s ease-in-out infinite alternate;
        }

        .ai-border-scale {
          animation: border-glow-scale 10s ease-in-out infinite alternate;
        }

        .ai-star-rotate {
          animation: star-rotate 14s cubic-bezier(0.68, -0.55, 0.27, 1.55)
            infinite alternate;
        }

        .ai-star-shine {
          animation: star-shine 14s ease-in-out infinite alternate;
        }

        @keyframes border-glow-translate {
          0% {
            transform: translateX(-10%);
          }
          100% {
            transform: translateX(115%);
          }
        }

        @keyframes border-glow-scale {
          0% {
            transform: translateX(-50%) scaleY(0.7);
          }
          100% {
            transform: translateX(-50%) scaleY(1.25);
          }
        }

        @keyframes star-rotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          100% {
            transform: rotate(240deg) scale(1.08);
          }
        }

        @keyframes star-shine {
          0% {
            opacity: 0.08;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 0.28;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </>
  );
}
