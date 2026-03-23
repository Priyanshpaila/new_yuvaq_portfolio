"use client";

import { motion, Variants } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Activity, Maximize, Zap, Lock, Scaling } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { RibbonBackground } from "@/components/ui/RibbonBackground";

const features = [
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Bank-Grade Security",
    desc: "Built-in protection from day one. We engineer systems designed to withstand modern threat landscapes automatically.",
    accent: "text-cyan-400",
    glow: "rgba(6, 182, 212, 0.1)"
  },
  {
    icon: <Scaling className="w-8 h-8" />,
    title: "Infinite Scalability",
    desc: "Architectures that handle 100 or 1,000,000 users seamlessly without rewriting your entire codebase.",
    accent: "text-purple-400",
    glow: "rgba(168, 85, 247, 0.1)"
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Extreme Performance",
    desc: "Optimized response times, edge caching, and lightweight payloads to ensure absolute maximum conversion.",
    accent: "text-emerald-400",
    glow: "rgba(16, 185, 129, 0.1)"
  }
];

export function WhyChooseUsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const sectionRef = useRef(null); // Added sectionRef

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#030712] py-32 lg:py-48"
    >
      <div className="absolute inset-0 z-0">
        <RibbonBackground variant="subtle" opacityMultiplier={0.4} />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
      </div>
      
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 sticky top-32"
          >
            <span className="mb-6 inline-block font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-400 py-1.5 px-4 rounded-full border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-sm">
              The Moat
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Engineering that <br />
              <span className="font-serif italic text-white/40">never breaks.</span>
            </h2>
            <p className="text-white/40 text-lg md:text-xl font-light max-w-xl leading-relaxed">
              We do not build minimum viable products that crash on launch day. We build enterprise-grade technical foundations that serve as a scalable moat for your business.
            </p>
            
            {/* Visual pulse indicator */}
            <div className="mt-12 flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border border-white/10 bg-zinc-900 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                       {i*10}K
                    </div>
                  ))}
               </div>
               <span className="text-xs font-mono text-white/20 uppercase tracking-widest leading-none">Global Infrastructure nodes active</span>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 w-full space-y-6 md:space-y-8"
          >
            {features.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <SpotlightCard 
                  spotlightColor={item.glow}
                  className="p-8 md:p-10 rounded-[32px] border border-white/5 bg-white/[0.01] backdrop-blur-md group hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500"
                >
                  <div className="flex gap-8 items-start">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center ${item.accent} group-hover:scale-110 group-hover:bg-cyan-950/20 transition-all duration-500 shadow-2xl`}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-500">{item.title}</h4>
                      <p className="text-white/40 text-base md:text-lg font-light leading-relaxed group-hover:text-white/60 transition-colors duration-500">{item.desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
