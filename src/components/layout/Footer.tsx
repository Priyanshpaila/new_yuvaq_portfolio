"use client";

import { MoveUpRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { RibbonBackground } from "@/components/ui/RibbonBackground";

const LOGO_SRC = "/images/logo.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "Our Process", href: "/#process" },
    { label: "Portfolio", href: "/#work" },
    { label: "Contact", href: "/#contact" },
  ];

  const serviceLinks = [
    { label: "Custom Software", href: "/#services" },
    { label: "SaaS Development", href: "/#services" },
    { label: "AI Integration", href: "/#services" },
    { label: "Cloud Solutions", href: "/#services" },
    { label: "Enterprise Architecture", href: "/#services" },
  ];

  return (
    <footer className="relative pt-32 pb-12 overflow-hidden bg-[#030303] border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <RibbonBackground variant="subtle" opacityMultiplier={0.2} />
        {/* Darkening Overlays */}
        <div className="pointer-events-none absolute inset-0 z-1 bg-black/40" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.01]" />
      </div>

      {/* Top Gradient Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand Col */}
          <div className="lg:col-span-1 space-y-8">
            <Link href="/" className="relative z-10 flex items-center gap-3">
              <div className="relative h-10 w-36 overflow-hidden">
                <Image
                  src={LOGO_SRC}
                  alt="YuvaQ Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <p className="text-white/50 text-base leading-relaxed max-w-xs font-light">
              Architecting scalable, secure, and future-proof digital products for the next generation of global leaders.
            </p>
            <div className="flex gap-4">
               {/* Placeholder for social icons if needed */}
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="text-white font-bold mb-8 tracking-tight">Navigation</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-all text-base font-light"
                  >
                    <span className="w-0 h-[1px] bg-cyan-500 transition-all group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="text-white font-bold mb-8 tracking-tight">Expertise</h3>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-all text-base font-light"
                  >
                    <span className="w-0 h-[1px] bg-cyan-500 transition-all group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="text-white font-bold mb-8 tracking-tight">Connect</h3>
            <div className="space-y-6">
              <a
                href="mailto:connect@yuvaq.com"
                className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors text-lg font-medium w-fit"
              >
                connect@yuvaq.com
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <MoveUpRight className="w-4 h-4" />
                </div>
              </a>
              <p className="text-white/40 text-base font-light leading-relaxed">
                Foundry HQ: Nagpur, Maharashtra
                <br />
                Operating Globally. Remote-First.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-white/30 text-sm font-light">
              © {new Date().getFullYear()} YuvaQ Software Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-white/30 hover:text-white text-xs transition-colors font-light">
                Privacy Policy
              </Link>
              <Link href="#" className="text-white/30 hover:text-white text-xs transition-colors font-light">
                Terms of Service
              </Link>
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/5 hover:bg-white hover:text-black transition-all duration-500"
          >
            <span className="text-sm font-medium">To the top</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 group-hover:border-black/20 transition-all">
              <ArrowUp className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
      
      {/* Decorative Glow at bottom */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
}
