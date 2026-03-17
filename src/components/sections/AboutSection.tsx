"use client";

import { motion, Variants } from "framer-motion";
import { SplinePlaceholder } from "@/components/spline/SplinePlaceholder";

export function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    // Ensure the ease array is explicitly typed or inferred properly for framer-motion variants
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background visual */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1/3 h-2/3 bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">The Company</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              A full-scale architecture firm for your <span className="text-gradient">digital products.</span>
            </motion.h2>
            
            <motion.div variants={itemVariants} className="space-y-6 text-lg text-white/60 font-light">
              <p>
                We aren't just developers. We are strategic product builders who understand that enterprise software needs to be as beautiful as it is robust.
              </p>
              <p>
                YuvaQ bridges the gap between visionary startup agility and enterprise-grade security. Whether you are building an AI-integrated SaaS, a next-generation web application, or custom cloud infrastructure, we build it to scale globally securely.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-sm text-white/50">Products Shipped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">Global</div>
                <div className="text-sm text-white/50">Client Reach</div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual / Spline Content */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2 relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden glass border-white/10">
            {/* 
              FUTURE SPLINE NOTE: 
              This placeholder will be replaced by a floating abstraction of digital infrastructure.
            */}
            <SplinePlaceholder variant="abstract" className="transform scale-110" />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
