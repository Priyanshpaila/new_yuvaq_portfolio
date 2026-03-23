"use client";

import { useRef, Fragment } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { RibbonBackground } from "@/components/ui/RibbonBackground";
import { Sparkles, Layout, Code2, Rocket, ArrowRight, ChevronDown } from "lucide-react";

const chapters = [
  {
    id: "vision",
    title: "The Vision",
    subtitle: "Where it all begins",
    desc: "Every world-class product starts as a raw, unfiltered vision. We dive deep into your business logic to extract the core 'Why' before we define the 'How'.",
    icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
    accent: "text-cyan-400",
  },
  {
    id: "blueprint",
    title: "The Blueprint",
    subtitle: "Architectural Certainty",
    desc: "We translate abstract ideas into technical reality. From user journeys to fail-proof database schemas, we map out the entire ecosystem to eliminate technical debt.",
    icon: <Layout className="w-6 h-6 text-purple-400" />,
    accent: "text-purple-400",
  },
  {
    id: "forge",
    title: "The Forge",
    subtitle: "Precision Engineering",
    desc: "This is where the magic happens. Our engineering team builds your product in weekly sprints, using high-performance tech stacks that scale to millions of users.",
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    accent: "text-blue-400",
  },
  {
    id: "launch",
    title: "The Product",
    subtitle: "Global Readiness",
    desc: "Rigorous QA, security audits, and zero-downtime deployment. Your vision is now a market-ready masterpiece, ready to disrupt its industry.",
    icon: <Rocket className="w-6 h-6 text-emerald-400" />,
    accent: "text-emerald-400",
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgGradient = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [
      "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1), transparent 70%)",
      "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1), transparent 70%)",
      "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 70%)",
      "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1), transparent 70%)",
    ]
  );

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#030303]">
      <div className="absolute inset-0 z-0">
        <RibbonBackground variant="subtle" opacityMultiplier={0.3} />
        {/* Darkening Overlays */}
        <div className="pointer-events-none absolute inset-0 z-1 bg-black/40" />
        <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,0.8))]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.01]" />
      </div>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row items-center justify-center">
        <motion.div 
          style={{ background: bgGradient }} 
          className="absolute inset-0 z-0" 
        />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Visual Narrative Side */}
          <div className="w-full lg:w-1/2 flex justify-center items-center h-[300px] md:h-[500px]">
            <div className="relative w-48 h-48 md:w-96 md:h-96">
              <VisualMetaphor progress={smoothProgress} />
            </div>
          </div>

          {/* Text Content Side */}
          <div className="w-full lg:w-1/2 h-[350px] md:h-[450px] relative">
            {chapters.map((chapter, i) => (
              <ChapterContent 
                key={chapter.id} 
                chapter={chapter} 
                index={i} 
                progress={smoothProgress} 
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator Hint */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-mono">Scroll Story</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* Scroll Progress Indicator (Right Side) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
          {chapters.map((_, i) => {
            const stepProgress = useTransform(smoothProgress, [i * 0.25, (i + 1) * 0.25], [0, 1]);
            return (
              <div key={i} className="relative w-1 h-12 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-white/40 origin-top"
                  style={{ scaleY: stepProgress }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChapterContent({ chapter, index, progress }: { chapter: typeof chapters[0], index: number, progress: any }) {
  const start = index * 0.25;
  const end = (index + 1) * 0.25;
  
  const opacity = useTransform(
    progress,
    [start - 0.08, start, end - 0.08, end],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    progress,
    [start - 0.08, start, end - 0.08, end],
    [30, 0, 0, -30]
  );

  return (
    <motion.div 
      style={{ opacity, y, pointerEvents: index === Math.floor(progress.get() * 4) ? "auto" : "none" }}
      className="absolute inset-0 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          {chapter.icon}
        </div>
        <span className={`text-sm font-mono uppercase tracking-widest ${chapter.accent}`}>
          Phase 0{index + 1}
        </span>
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
        {chapter.title}
        <span className="block text-2xl md:text-3xl font-serif italic text-white/40 mt-1">
          {chapter.subtitle}
        </span>
      </h2>
      
      <p className="text-base md:text-xl text-white/50 font-light leading-relaxed max-w-lg mb-8">
        {chapter.desc}
      </p>

      <div className="flex items-center gap-2 text-white/30 font-mono text-xs uppercase tracking-widest group cursor-default">
        <span>Proceeding to next chapter</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

function VisualMetaphor({ progress }: { progress: any }) {
  const coreScale = useTransform(progress, [0, 0.25], [0.8, 1.2]);
  const coreRotate = useTransform(progress, [0, 1], [0, 360]);
  const gridOpacity = useTransform(progress, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
  const forgeOpacity = useTransform(progress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
  const productOpacity = useTransform(progress, [0.75, 0.85], [0, 1]);
  const productScale = useTransform(progress, [0.75, 1], [0.9, 1.1]);

  return (
    <div className="relative w-full h-full">
      {/* Vision Core */}
      <motion.div 
        style={{ 
          scale: coreScale, 
          rotate: coreRotate,
          opacity: useTransform(progress, [0, 0.25, 0.35], [1, 1, 0])
        }}
        className="absolute inset-0 border-2 border-cyan-400/30"
        animate={{ 
          borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50% / 50% 50% 50% 50%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
          boxShadow: ["0 0 20px rgba(34,211,238,0.2)", "0 0 40px rgba(34,211,238,0.4)", "0 0 20px rgba(34,211,238,0.2)"]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-4 border border-cyan-400/20 rounded-full" />
      </motion.div>

      {/* Blueprint Grid */}
      <motion.div 
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-2"
      >
        {[...Array(16)].map((_, i) => (
          <motion.div 
            key={i}
            className="border border-white/10"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
        <motion.div 
          className="absolute inset-0 border-2 border-purple-500/30 rounded-lg"
          animate={{ rotate: 45, scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Forge Activity */}
      <motion.div 
        style={{ opacity: forgeOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div 
          className="w-full h-full border-4 border-dashed border-blue-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-3/4 h-3/4 border-2 border-white/5 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-2 h-8 bg-blue-500/40 rounded-full"
              animate={{ height: [20, 40, 20] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Final Product */}
      <motion.div 
        style={{ opacity: productOpacity, scale: productScale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div 
          className="w-48 h-48 bg-gradient-to-tr from-emerald-500/20 to-teal-500/40 rounded-3xl blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl">
          <Rocket className="w-16 h-16 md:w-24 md:h-24 text-emerald-400" />
        </div>
      </motion.div>

      {/* Particles */}
      {[...Array(12)].map((_, i) => (
        <Fragment key={i}>
          <Particle progress={progress} index={i} />
        </Fragment>
      ))}
    </div>
  );
}

function Particle({ progress, index }: { progress: any, index: number }) {
  const top = (Math.sin(index) * 40 + 50).toFixed(2);
  const left = (Math.cos(index) * 40 + 50).toFixed(2);
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        opacity: useTransform(progress, [0, 1], [0.1, 0.6]),
        scale: useTransform(progress, [0, 1], [0.5, 1.2]),
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
      }}
      transition={{
        duration: 4 + (index % 4),
        repeat: Infinity,
        delay: index * 0.3,
      }}
    />
  );
}