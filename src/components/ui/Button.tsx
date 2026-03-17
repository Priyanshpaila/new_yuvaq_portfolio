"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { MoveRight } from "lucide-react";
import React from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", withArrow, children, ...props }, ref) => {
    const baseClass = "relative inline-flex items-center justify-center font-medium transition-colors overflow-hidden rounded-full group";
    
    const variants = {
      primary: "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]",
      secondary: "bg-white text-black hover:bg-gray-200",
      outline: "border border-white/20 text-white hover:bg-white/10 glass",
      ghost: "text-white/70 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseClass, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children as React.ReactNode}
          {withArrow && (
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          )}
        </span>
        {variant === "primary" && (
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
