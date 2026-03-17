"use client";

import { motion } from "framer-motion";

export function TrustSection() {
  const clients = [
    { name: "TechCorp", type: "Enterprise SaaS" },
    { name: "MediTech", type: "Healthcare Platform" },
    { name: "GlobalFin", type: "Fintech Architecture" },
    { name: "AILabs", type: "AI Infrastructure" },
    { name: "Nexus", type: "Logistics Dashboard" }
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.02] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl pb-8 text-center md:text-left">
        <h2 className="text-sm font-semibold tracking-widest text-white/40 uppercase">Trusted by modern companies scaling globally</h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Fading Edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center whitespace-nowrap">
          {/* Double the array for seamless infinite scrolling */}
          {[...clients, ...clients].map((client, i) => (
            <div 
              key={`${client.name}-${i}`}
              className="mx-8 md:mx-16 flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default"
            >
              {/* Box placeholder for actual client logos later */}
              <div className="text-2xl font-bold tracking-tighter text-white mb-1">
                {client.name}
              </div>
              <div className="text-xs text-white/50 tracking-wide">
                {client.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
