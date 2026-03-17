"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Activity, Maximize } from "lucide-react";

export function WhyChooseUsSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />,
      title: "Bank-Grade Security",
      desc: "Built-in protection from day one. We engineer systems designed to withstand modern threat landscapes automatically."
    },
    {
      icon: <Maximize className="w-8 h-8 text-blue-400" />,
      title: "Infinite Scalability",
      desc: "Architectures that handle 100 or 1,000,000 users seamlessly without rewriting your entire codebase."
    },
    {
      icon: <Activity className="w-8 h-8 text-cyan-200" />,
      title: "Extreme Performance",
      desc: "Optimized response times, edge caching, and lightweight payloads to ensure absolute maximum conversion."
    }
  ];

  return (
    <section className="py-24 relative border-y border-white/5 bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Engineering that <span className="italic text-gray-500 font-serif">never</span> breaks under pressure.
            </h2>
            <p className="text-white/50 text-lg font-light max-w-lg leading-relaxed">
              We do not build minimum viable products that crash on launch day. We build enterprise-grade technical foundations that serve as a scalable moat for your business.
            </p>
          </motion.div>

          <div className="flex-1 w-full space-y-6">
            {features.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex gap-6 p-6 rounded-2xl glass-card group hover:bg-white/[0.05]"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-14 h-14 rounded-full bg-black/50 border border-white/10 flex items-center justify-center group-hover:bg-cyan-900/20 group-hover:border-cyan-500/30 transition-colors">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
