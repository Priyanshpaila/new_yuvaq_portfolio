"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discover & Architect",
    desc: "We dive deep into your business logic, mapping out user journeys and technical requirements to design a fail-proof architecture before writing a single line of code.",
  },
  {
    num: "02",
    title: "Premium Design",
    desc: "Our design team crafts world-class, conversion-focused UI/UX that establishes your brand as a premium player in your specific industry.",
  },
  {
    num: "03",
    title: "Sprint-Based Engineering",
    desc: "We build your product iteratively, giving you full transparency and staging access every week. No black boxes.",
  },
  {
    num: "04",
    title: "QA & Deployment",
    desc: "Rigorous automated testing, security audits, and zero-downtime CI/CD deployments ensure your launch is mathematically flawless.",
  },
  {
    num: "05",
    title: "Scale & Support",
    desc: "Post-launch, we act as your fractional CTO and engineering wing, scaling infrastructure and adding features as you grow.",
  },
];

function clampIndex(value: number, max: number) {
  return Math.max(0, Math.min(max, value));
}

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 35%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = clampIndex(
      Math.round(latest * (steps.length - 1)),
      steps.length - 1
    );
    setActiveIndex(idx);
  });

  const desktopRowClasses = useMemo(
    () =>
      steps.map((_, idx) =>
        idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
      ),
    []
  );

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-20 sm:py-24 lg:py-32"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-900/10 blur-[140px]" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-14 text-center sm:mb-16 lg:mb-24">
          <span className="mb-4 block font-mono text-xs tracking-[0.22em] text-cyan-400 uppercase sm:text-sm">
            The Methodology
          </span>

          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            How we build the{" "}
            <span className="font-serif italic text-gradient">future.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed font-light text-white/50 sm:text-base md:text-lg">
            A disciplined product workflow designed for speed, clarity, and
            enterprise-grade execution.
          </p>
        </div>

        <div className="relative pl-10 sm:pl-12 md:pl-0">
          {/* base line desktop */}
          <div className="pointer-events-none absolute left-4 top-3 bottom-3 hidden w-px -translate-x-1/2 bg-white/10 md:left-1/2 md:block" />

          {/* progress line desktop */}
          <motion.div
            className="pointer-events-none absolute left-4 top-3 hidden w-[3px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-cyan-400 via-sky-500 to-blue-600 shadow-[0_0_18px_rgba(6,182,212,0.55)] md:left-1/2 md:block"
            style={{
              height: "calc(100% - 24px)",
              scaleY: lineScale,
            }}
          />

          {/* base line mobile */}
          <div className="pointer-events-none absolute left-4 top-3 bottom-3 w-px bg-white/10 md:hidden" />

          {/* progress line mobile */}
          <motion.div
            className="pointer-events-none absolute left-[15px] top-3 w-[3px] origin-top rounded-full bg-gradient-to-b from-cyan-400 via-sky-500 to-blue-600 shadow-[0_0_14px_rgba(6,182,212,0.45)] md:hidden"
            style={{
              height: "calc(100% - 24px)",
              scaleY: lineScale,
            }}
          />

          {steps.map((step, idx) => {
            const isActive = idx === activeIndex;
            const isPast = idx < activeIndex;

            return (
              <div
                key={step.num}
                className={`relative mb-10 flex w-full flex-col justify-between gap-6 sm:mb-12 md:mb-16 md:items-center ${desktopRowClasses[idx]}`}
              >
                {/* dot */}
                <div className="absolute left-4 top-8 z-20 -translate-x-1/2 md:left-1/2">
                  <div
                    className={[
                      "relative flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-500",
                      isActive
                        ? "border-cyan-300 bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]"
                        : isPast
                        ? "border-cyan-500 bg-cyan-500/80"
                        : "border-white/20 bg-black",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "h-1.5 w-1.5 rounded-full transition-all duration-500",
                        isActive || isPast ? "bg-white" : "bg-transparent",
                      ].join(" ")}
                    />
                  </div>
                </div>

                {/* empty side on desktop */}
                <div className="hidden md:block md:w-[44%]" />

                {/* card */}
                <div
                  className={[
                    "relative ml-6 w-full rounded-[28px] border p-5 backdrop-blur-xl transition-all duration-500 sm:ml-8 sm:p-6 md:ml-0 md:w-[44%] lg:p-8",
                    isActive
                      ? "border-cyan-500/30 bg-white/[0.06] shadow-[0_20px_60px_rgba(6,182,212,0.10)]"
                      : isPast
                      ? "border-white/10 bg-white/[0.04]"
                      : "border-white/8 bg-white/[0.025]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "pointer-events-none absolute inset-0 rounded-[28px] transition-opacity duration-500",
                      isActive
                        ? "opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_40%)]"
                        : "opacity-0",
                    ].join(" ")}
                  />

                  <div className="relative z-10">
                    <div
                      className={[
                        "mb-4 text-4xl font-bold tracking-tight transition-colors duration-500 sm:text-5xl",
                        isActive
                          ? "text-cyan-400/15"
                          : "text-white/5",
                      ].join(" ")}
                    >
                      {step.num}
                    </div>

                    <h3
                      className={[
                        "mb-3 text-lg font-semibold transition-colors duration-500 sm:text-xl",
                        isActive
                          ? "text-white"
                          : isPast
                          ? "text-white/90"
                          : "text-white/75",
                      ].join(" ")}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={[
                        "text-sm leading-relaxed font-light transition-colors duration-500 sm:text-[15px]",
                        isActive
                          ? "text-white/75"
                          : isPast
                          ? "text-white/60"
                          : "text-white/45",
                      ].join(" ")}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}