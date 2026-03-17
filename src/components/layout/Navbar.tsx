"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const links = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div 
          className={`flex items-center justify-between transition-all duration-300 rounded-full px-6 py-3 ${
            isScrolled ? "glass shadow-2xl shadow-cyan-900/10" : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Y</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">YuvaQ</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button size="sm" variant="primary">Start a Project</Button>
            </div>
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Outline */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full glass border-t border-white/10 p-6 flex flex-col gap-4 mt-2"
        >
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-lg font-medium text-white/80 hover:text-white pb-2 border-b border-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="mt-4" size="md" variant="primary">Start a Project</Button>
        </motion.div>
      )}
    </motion.header>
  );
}
