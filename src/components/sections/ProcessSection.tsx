"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discover & Architect",
    desc: "We dive deep into your business logic, mapping out user journeys and technical requirements to design a fail-proof architecture before writing a single line of code."
  },
  {
    num: "02",
    title: "Premium Design",
    desc: "Our design team crafts world-class, conversion-focused UI/UX that establishes your brand as a premium player in your specific industry."
  },
  {
    num: "03",
    title: "Sprint-Based Engineering",
    desc: "We build your product iteratively, giving you full transparency and staging access every week. No black boxes."
  },
  {
    num: "04",
    title: "QA & Deployment",
    desc: "Rigorous automated testing, security audits, and zero-downtime CI/CD deployments ensure your launch is mathematically flawless."
  },
  {
    num: "05",
    title: "Scale & Support",
    desc: "Post-launch, we act as your fractional CTO and engineering wing, scaling infrastructure and adding features as you grow."
  }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-32 relative" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <div className="text-center mb-24">
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block">The Methodology</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            How we <span className="text-gradient">build the future.</span>
          </h2>
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Animated SVG Path Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
          <motion.div 
            className="absolute left-8 md:left-1/2 top-4 w-1 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full -translate-x-1/2 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] hidden md:block origin-top"
            style={{ height: lineHeight }}
          />

          {/* Mobile Line */}
          <div className="absolute left-[39px] top-4 bottom-4 w-px bg-white/10 md:hidden" />
          <motion.div 
            className="absolute left-[38px] top-4 w-1 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full md:hidden origin-top"
            style={{ height: lineHeight }}
          />

          {steps.map((step, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row justify-between items-center mb-20 last:mb-0 w-full ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-cyan-400 -translate-x-1/2 z-10" />

              {/* Empty Space for opposing side */}
              <div className="hidden md:block w-[45%]" />

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full md:w-[45%] glass p-8 rounded-3xl ml-12 md:ml-0 group hover:border-cyan-500/30 transition-colors"
              >
                <div className="text-5xl font-bold text-white/5 mb-4 group-hover:text-cyan-500/10 transition-colors">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{step.desc}</p>
              </motion.div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
