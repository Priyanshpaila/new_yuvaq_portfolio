"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { RibbonBackground } from "@/components/ui/RibbonBackground";
import { 
  Code2, 
  Cpu, 
  Database, 
  Cloud, 
  Globe, 
  Terminal, 
  Boxes, 
  Workflow, 
  Smartphone, 
  Server,
  Key,
  Flame,
  Zap,
  BrainCircuit,
  Search,
  MessageSquare,
  Layers
} from "lucide-react";

const techGroups = [
  {
    category: "Frontend Architecture",
    icon: <Code2 className="w-8 h-8" />,
    accent: "text-cyan-400",
    desc: "Crafting world-class, fluid user experiences with modern reactive frameworks and type-safe systems.",
    techs: [
      { name: "React", icon: <Globe className="w-4 h-4 text-cyan-500" /> },
      { name: "Next.js", icon: <Layers className="w-4 h-4 text-white" /> },
      { name: "TypeScript", icon: <Code2 className="w-4 h-4 text-blue-500" /> },
      { name: "Tailwind", icon: <Flame className="w-4 h-4 text-sky-400" /> }
    ]
  },
  {
    category: "Backend & Systems",
    icon: <Server className="w-8 h-8" />,
    accent: "text-purple-400",
    desc: "Building high-throughput, low-latency backends that serve as a scalable foundation for growth.",
    techs: [
      { name: "Node.js", icon: <Terminal className="w-4 h-4 text-green-500" /> },
      { name: "Python", icon: <BrainCircuit className="w-4 h-4 text-blue-400" /> },
      { name: "Go", icon: <Zap className="w-4 h-4 text-cyan-400" /> },
      { name: "GraphQL", icon: <Workflow className="w-4 h-4 text-pink-500" /> }
    ]
  },
  {
    category: "Cloud Infrastructure",
    icon: <Cloud className="w-8 h-8" />,
    accent: "text-blue-400",
    desc: "Fault-tolerant, zero-downtime infrastructure designed for global reach and enterprise security.",
    techs: [
      { name: "AWS", icon: <Cloud className="w-4 h-4 text-orange-400" /> },
      { name: "Kubernetes", icon: <Boxes className="w-4 h-4 text-blue-500" /> },
      { name: "Docker", icon: <Cpu className="w-4 h-4 text-sky-500" /> },
      { name: "Terraform", icon: <Key className="w-4 h-4 text-purple-400" /> }
    ]
  },
  {
    category: "Intelligent Data",
    icon: <Database className="w-8 h-8" />,
    accent: "text-emerald-400",
    desc: "Managed data solutions and AI integrations that turn raw information into strategic business assets.",
    techs: [
      { name: "PostgreSQL", icon: <Database className="w-4 h-4 text-blue-400" /> },
      { name: "Redis", icon: <Flame className="w-4 h-4 text-red-500" /> },
      { name: "OpenAI", icon: <MessageSquare className="w-4 h-4 text-emerald-500" /> },
      { name: "Elastic", icon: <Search className="w-4 h-4 text-yellow-500" /> }
    ]
  }
];

export function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden bg-[#030303] py-24 lg:py-32"
    >
      <RibbonBackground variant="accent" opacityMultiplier={0.4} />
      {/* Darkening Overlays */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,0.8))]" />
      
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.01]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-cyan-500/[0.01] blur-[180px]" />
      
      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        <div className="mb-20 space-y-6 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-400 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-sm"
          >
            The Infrastructure
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            Built with the <br />
            <span className="font-serif italic text-white/40">elite technical stacks.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-white/50 text-xl font-light leading-relaxed"
          >
            Strategic choices that guarantee resilience, throughput, and long-term maintainability.
          </motion.p>
        </div>

        <div className="space-y-12">
          {techGroups.map((group, i) => (
            <TechGroupRow key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechGroupRow({ group, index }: { group: typeof techGroups[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col md:flex-row gap-8 items-start md:items-center p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-700 overflow-hidden"
    >
      <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${group.accent.replace('text-', 'from-')}/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

      <div className="flex-shrink-0">
        <div className={`p-4 rounded-2xl bg-black/40 border border-white/10 ${group.accent} group-hover:scale-110 transition-transform duration-700`}>
          {group.icon}
        </div>
      </div>

      <div className="flex-grow space-y-2">
        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-500">
          {group.category}
        </h3>
        <p className="text-white/40 font-light text-base max-w-md leading-relaxed">
          {group.desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 md:w-[320px] lg:w-[400px]">
        {group.techs.map((tech, ti) => (
          <motion.div
            key={tech.name}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            {tech.icon}
            <span className="text-sm font-mono text-white/70 whitespace-nowrap">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}