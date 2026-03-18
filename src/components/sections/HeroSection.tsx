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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Ribbon aurora background */}
      <div className="absolute inset-0 z-0 bg-[#020a14]">
        <RibbonBackground />
      </div>

      {/* Overlays for readability */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/45" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06),rgba(0,0,0,0.6))]" />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-[url('/grid.svg')] bg-center opacity-[0.035]" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="pointer-events-none relative z-10 container mx-auto px-6 max-w-5xl text-center"
      >
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-10 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-[0.18em]">
            Enterprise Software Engineering
          </span>
        </motion.div>

        {/*
          ─── EDITORIAL HEADLINE ─────────────────────────────────────────
          Mixed typography: serif italic (Playfair Display) + extra-bold
          sans-serif (Inter Black), inspired by the reference image.
          ────────────────────────────────────────────────────────────────
        */}
        <motion.h1
          variants={fadeUp}
          className="mb-4 leading-[1.04] tracking-tight"
        >
          {/* Row 1 — italic serif + heavy sans (reference style contrast) */}
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

          {/* Row 2 — morphing particle canvas word */}
          <span className="block my-1">
            <span
              className="font-serif italic text-white/60 text-5xl md:text-6xl lg:text-7xl font-light"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              that are
            </span>
          </span>

          {/*
            Morphing particle canvas — cycles through key descriptors.
            Height is fixed so text above/below doesn't jump.
          */}
          <span className="block pointer-events-auto">
            <MorphingText
              words={["Scalable", "Secure", "Innovative", "Enterprise", "Reliable"]}
              holdMs={2400}
              gap={6}
              color="rgba(34,211,238,"
              className="h-[80px] md:h-[100px] lg:h-[120px]"
            />
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-white/55 mb-10 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
        >
          YuvaQ delivers premium custom software, SaaS products, and secure
          enterprise architecture that outpaces the speed of modern business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" variant="primary" withArrow>
            Start a Project
          </Button>
          <Button size="lg" variant="outline">
            View Case Studies
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}