"use client";

import { motion } from "framer-motion";
import Orb from "@/components/ui/Orb";

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
  { name: "TensorFlow", category: "AI" },
];

export function TechStackSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-black/40 py-24">
      {/* Glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-cyan-900/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-10%] bottom-[-20%] h-[420px] w-[420px] rounded-full bg-purple-900/10 blur-[140px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-4 block font-mono text-sm tracking-widest text-cyan-400 uppercase">
              The Stack
            </span>

            <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-5xl">
              Powerful tools for{" "}
              <span className="font-serif italic text-gray-500">
                serious software.
              </span>
            </h2>

            <p className="mb-10 max-w-lg text-lg leading-relaxed font-light text-white/50">
              We do not chase trends. We use battle-tested, enterprise-grade
              technologies that guarantee security, scale, and long-term
              maintainability for your digital products.
            </p>

            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="cursor-default rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors hover:border-cyan-500/30 hover:bg-white/10"
                >
                  <span className="mr-2 text-xs text-white/40">
                    {tech.category}
                  </span>
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative mt-12 h-[400px] w-full lg:mt-0 lg:h-[500px]">
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12),transparent_55%)]" />

            <div className="relative h-full w-full overflow-hidden ">
              <Orb
                hoverIntensity={1.2}
                rotateOnHover
                hue={195}
                forceHoverState={false}
              />

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.35)_100%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}