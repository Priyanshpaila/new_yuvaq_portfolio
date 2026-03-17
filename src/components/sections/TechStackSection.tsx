"use client";

import { motion } from "framer-motion";
import { SplinePlaceholder } from "@/components/spline/SplinePlaceholder";

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Redis", category: "Cache" },
  { name: "AWS", category: "Cloud" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Docker", category: "DevOps" },
  { name: "OpenAI", category: "AI" },
  { name: "TensorFlow", category: "AI" }
];

export function TechStackSection() {
  return (
    <section className="py-24 relative border-b border-white/5 bg-black/40 overflow-hidden">
      
      {/* Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block">The Stack</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Powerful tools for <span className="text-gray-500">serious software.</span>
            </h2>
            <p className="text-white/50 text-lg font-light mb-10 leading-relaxed max-w-lg">
              We do not chase trends. We use battle-tested, enterprise-grade technologies that guarantee security, scale, and long-term maintainability for your digital products.
            </p>

            {/* Tags Grid */}
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, i) => (
                <motion.div 
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/80 hover:bg-white/10 hover:border-cyan-500/30 transition-colors cursor-default"
                >
                  <span className="text-white/40 mr-2 text-xs">{tech.category}</span>
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px] w-full mt-12 lg:mt-0 perspective-1000">
             {/* 
              FUTURE SPLINE NOTE: 
              This placeholder will be replaced by a massive, slowly rotating 3D neural or cloud structure to visually represent the tech stack.
            */}
            <SplinePlaceholder variant="abstract" className="transform rotateX-12 scale-110" />
          </div>

        </div>
      </div>
    </section>
  );
}
