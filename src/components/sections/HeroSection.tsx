"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SplinePlaceholder } from "@/components/spline/SplinePlaceholder";

export function HeroSection() {
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
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-cyan-900/20 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none z-0" />
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex-1 text-center lg:text-left pt-10 lg:pt-0"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Enterprise Software Engineering</span>
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Building <span className="text-gradient">Scalable</span> <br className="hidden lg:block"/>
            <span className="text-gradient-brand">Digital Futures</span>
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
          >
            YuvaQ delivers premium custom software, SaaS products, and secure enterprise architecture that outpaces the speed of modern business.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button size="lg" variant="primary" withArrow>
              Start a Project
            </Button>
            <Button size="lg" variant="outline">
              View Case Studies
            </Button>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div 
            variants={fadeUp}
            className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10"
          >
            <div>
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-white/50">Uptime Architecture</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">Scale</div>
              <div className="text-sm text-white/50">Enterprise Ready</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">Secure</div>
              <div className="text-sm text-white/50">By Design</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Spline Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.5, type: "spring", stiffness: 40 }}
          className="flex-1 w-full lg:w-auto h-[500px] lg:h-[700px] relative perspective-1000"
        >
          {/* 
            FUTURE SPLINE NOTE: 
            This placeholder will be replaced by the main abstract tech node Spline scene. 
            Ensure the 3D scene background is transparent and aligns with the --color-background.
          */}
          <SplinePlaceholder variant="hero" className="border border-white/5 bg-black/20" />
        </motion.div>
      </div>
    </section>
  );
}
