"use client";

import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Application } from "@splinetool/runtime";

export function AboutSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const app = new Application(canvas);
    app.load("https://prod.spline.design/tPC5DCb5MuGeBzhi/scene.splinecode");

    return () => {
      try {
        app.stop?.();
      } catch {}
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      {/* Background visual */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-cyan-900/10 blur-[90px] sm:h-[380px] sm:w-[380px] lg:h-[520px] lg:w-[520px] lg:blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24"
        >
          {/* Left Text Content */}
          <div className="order-2 max-w-2xl lg:order-1">
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
              <span className="font-mono text-[11px] tracking-[0.24em] text-cyan-400 uppercase sm:text-sm">
                The Company
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mb-6 text-3xl font-bold leading-[1.15] text-white sm:mb-8 sm:text-4xl md:text-5xl"
            >
              A full-scale architecture firm for your{" "}
              <span className="text-gradient font-serif italic">
                digital products.
              </span>
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-5 sm:space-y-6"
            >
              <ScrollReveal
                baseOpacity={0.08}
                enableBlur
                blurStrength={5}
                baseRotation={2}
                textClassName="text-base sm:text-lg text-white/60 font-light leading-relaxed"
              >
                We aren't just developers. We are strategic product builders who
                understand that enterprise software needs to be as beautiful as
                it is robust.
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0.08}
                enableBlur
                blurStrength={5}
                baseRotation={2}
                textClassName="text-base sm:text-lg text-white/60 font-light leading-relaxed"
              >
                YuvaQ bridges the gap between visionary startup agility and
                enterprise-grade security. Whether you are building an
                AI-integrated SaaS, a next-generation web application, or custom
                cloud infrastructure, we build it to scale globally securely.
              </ScrollReveal>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-2 gap-5 border-t border-white/10 pt-6 sm:mt-10 sm:gap-8 sm:pt-8"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-0 sm:border-0 sm:bg-transparent">
                <div className="mb-1 text-2xl font-bold text-white sm:mb-2 sm:text-3xl">
                  50+
                </div>
                <div className="text-sm text-white/50">Products Shipped</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-0 sm:border-0 sm:bg-transparent">
                <div className="mb-1 text-2xl font-bold text-white sm:mb-2 sm:text-3xl">
                  Global
                </div>
                <div className="text-sm text-white/50">Client Reach</div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual / Spline Content */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div
              className="
                relative w-full overflow-hidden 
                h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px] xl:h-[600px]
              "
            >
              <div className="pointer-events-none absolute inset-0 z-10 " />

              <canvas
                ref={canvasRef}
                id="canvas3d"
                className="absolute inset-0 h-full w-full scale-100 sm:scale-105 lg:scale-110"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
