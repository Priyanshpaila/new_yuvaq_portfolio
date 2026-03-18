"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
const LOGO_SRC = "/images/logo.png";

export default function Footer() {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Our Process", href: "#process" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ];

  const serviceLinks = [
    { label: "Custom Software", href: "#" },
    { label: "SaaS Development", href: "#" },
    { label: "AI Integration", href: "#" },
    { label: "Cloud Solutions", href: "#" },
    { label: "Enterprise Architecture", href: "#" },
  ];

  return (
    <footer className="relative pt-32 pb-12 overflow-hidden  mt-20">
      {/* Background Glow */}
      {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-cyan-900/30 blur-[120px] rounded-full pointer-events-none z-0" /> */}

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand Col */}
          <div className="lg:col-span-1 space-y-6">
            <Link
              href="/"
              className="relative z-10 flex items-center gap-3"
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
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Building scalable, secure, and modern software solutions for
              enterprises and ambitious startups globally.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Navigation</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Expertise</h3>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="text-white font-semibold mb-6">Connect</h3>
            <div className="space-y-4">
              <a
                href="mailto:connect@yuvaq.com"
                className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm w-fit"
              >
                connect@yuvaq.com
                <MoveUpRight className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <p className="text-white/60 text-sm">
                Nagpur, Maharashtra
                <br />
                Remote First | Global Reach
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} YuvaQ Software Solutions. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
