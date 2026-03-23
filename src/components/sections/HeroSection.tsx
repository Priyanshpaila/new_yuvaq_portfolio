"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { RibbonBackground } from "@/components/ui/RibbonBackground";
import { MorphingText } from "@/components/ui/MorphingText";

export function HeroSection() {
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.15 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 44, damping: 14 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20"
    >
      <div className="absolute inset-0 z-0 bg-[#030303]">
        <RibbonBackground variant="hero" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-1 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,0.7))]" />
      <div className="pointer-events-none absolute inset-0 z-3 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="pointer-events-none relative z-10 container mx-auto px-6 max-w-5xl text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="mb-4 leading-[1.04] tracking-tight"
        >
          <span className="block">
            <span
              className="font-serif italic text-white/80 text-5xl md:text-6xl lg:text-7xl font-light"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              We build
            </span>
            {"  "}
            <span className="font-black text-white text-5xl md:text-6xl lg:text-7xl uppercase tracking-[-0.02em]">
              PRODUCTS
            </span>
          </span>

          <span className="block my-1">
            <span
              className="font-serif italic text-white/60 text-5xl md:text-6xl lg:text-7xl font-light"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              that are
            </span>
          </span>

          <span className="block pointer-events-auto">
            <MorphingText
              words={["Scalable", "Secure", "Innovative", "Enterprise", "Reliable"]}
              holdMs={2400}
              gap={6}
              color="rgba(34,211,238,"
              className="h-20 md:h-25 lg:h-30"
            />
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-white/55 mb-10 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
        >
          YuvaQ delivers premium custom software, SaaS products, and secure
          enterprise architecture that outpaces the speed of modern business.
        </motion.p>
      </motion.div>
    </section>
  );
}