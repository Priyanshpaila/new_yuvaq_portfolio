"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

// For future Spline integration, we can lazy load the Spline component when it's ready
// const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplinePlaceholderProps {
  className?: string;
  scene?: string; // Future prop to pass the Spline scene URL
  title?: string;
  variant?: "hero" | "globe" | "abstract";
}

export function SplinePlaceholder({ className, variant = "hero" }: SplinePlaceholderProps) {
  // This component reserves the space and provides a premium animated fallback
  // until the real Spline 3D embeds are ready.
  
  return (
    <div className={cn("relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden rounded-3xl", className)}>
      {/* Background Gradient Orbs */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-cyan-500/20 blur-[100px]"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.3, scale: 0.8 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[80px]"
      />

      {/* Glass Outline Container */}
      <div className="relative z-10 w-full h-full max-w-sm max-h-[400px] glass-card rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-4 p-8 text-center text-white/50">
        <div className="w-16 h-16 rounded-full border border-cyan-500/30 flex items-center justify-center relative">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full"
          />
          <span className="text-xs tracking-widest text-cyan-400 font-mono">3D</span>
        </div>
        <div>
          <p className="text-sm font-medium text-white/80">Spline Scene Ready</p>
          <p className="text-xs text-white/40 mt-1">Placeholder for interactive {variant} canvas</p>
        </div>
      </div>

      {/* Future Spline Integration Point */}
      {/* 
        <Suspense fallback={<div />}>
          <Spline scene={scene} className="absolute inset-0 w-full h-full !pointer-events-auto z-20" />
        </Suspense>
      */}
    </div>
  );
}
