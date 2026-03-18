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
import { Menu, X } from "lucide-react";

const links = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Process", href: "#process" },
];

const LOGO_SRC = "/images/logo.png"; // change this to your actual logo path

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
              href="#home"
              className="relative z-10 flex items-center gap-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative h-10 w-34  overflow-hidden  ">
                <Image
                  src={LOGO_SRC}
                  alt="YuvaQ Logo"
                  fill
                  className="object-contain "
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
              <div className="hidden md:block">
                <Link href="#contact">
                  <Button size="sm" variant="primary">
                    Start a Project
                  </Button>
                </Link>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-4 top-4 z-[60] overflow-hidden rounded-[28px] border border-white/10 bg-black/95 shadow-[0_20px_80px_rgba(0,0,0,0.55)] md:hidden"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                <Link
                  href="#home"
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

              {/* Nav links */}
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

                <div className="pt-6">
                  <Link
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full" size="md" variant="primary">
                      Start a Project
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
