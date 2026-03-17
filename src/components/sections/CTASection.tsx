"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SplinePlaceholder } from "@/components/spline/SplinePlaceholder";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden border-t border-white/5">
      {/* Massive Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[800px] bg-cyan-600/10 blur-[200px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="glass-card rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden flex flex-col items-center border-white/10 shadow-2xl">
          
          {/* subtle mesh background inside card */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full"
          >
            {/* Small abstract Spline orbit object */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center p-2 relative">
               <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full opacity-50"
               />
               <SplinePlaceholder variant="abstract" className="min-h-0 w-full h-full rounded-full" />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Ready to build the <span className="text-gradient-brand">Future?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light">
              Stop settling for legacy infrastructure and generic templates. Partner with YuvaQ to engineer digital products that scale globally.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="primary" withArrow className="w-full sm:w-auto">
                Schedule a Consultation
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-cyan-400/50">
              No sales pressure. Just a technical discovery call.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
