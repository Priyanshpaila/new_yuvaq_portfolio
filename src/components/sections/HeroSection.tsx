"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { SplinePlaceholder } from "@/components/spline/SplinePlaceholder";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplinePlaceholder variant="hero" className="h-full w-full" />,
});

type NavigatorWithDeviceMemory = Navigator & {
  deviceMemory?: number;
};

export function HeroSection() {
  const [showSpline, setShowSpline] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const nav = navigator as NavigatorWithDeviceMemory;
    const deviceMemory = nav.deviceMemory;
    const lowMemoryDevice =
      typeof deviceMemory === "number" && deviceMemory <= 4;

    // You can tune this rule:
    // - reduced motion => always fallback
    // - <=4 GB RAM heuristic => fallback
    const shouldFallback = prefersReducedMotion || lowMemoryDevice;

    setUseFallback(shouldFallback);

    if (shouldFallback) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;

    const mountSpline = () => setShowSpline(true);

    if ("requestIdleCallback" in window) {
      idleId = (window as Window & {
        requestIdleCallback: (
          cb: IdleRequestCallback,
          options?: IdleRequestOptions
        ) => number;
      }).requestIdleCallback(() => mountSpline(), { timeout: 1200 });
    } else {
      timeoutId = setTimeout(mountSpline, 300);
    }

    return () => {
      if (
        
        idleId !== null &&
        "cancelIdleCallback" in window
      ) {
        (
          window as Window & {
            cancelIdleCallback: (id: number) => void;
          }
        ).cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background layer */}
      <div className="absolute inset-0 z-0">
        {useFallback ? (
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),rgba(0,0,0,0.88)_60%)]" />
        ) : showSpline ? (
          <Spline
            scene="https://prod.spline.design/6Z6Bi6BWP9dwO1TD/scene.splinecode"
            className="h-full w-full"
          />
        ) : (
          <SplinePlaceholder variant="hero" className="h-full w-full" />
        )}
      </div>

      {/* Readability overlays */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.55))]" />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-[url('/grid.svg')] bg-center opacity-[0.04]" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="pointer-events-none relative z-10 container mx-auto px-6 max-w-5xl text-center"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-8 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            Enterprise Software Engineering
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]"
        >
          Building <span className="text-gradient">Scalable</span>{" "}
          <span className="text-gradient-brand">Digital Futures</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-white/75 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
        >
          YuvaQ delivers premium custom software, SaaS products, and secure
          enterprise architecture that outpaces the speed of modern business.
        </motion.p>

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