"use client";

import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "GlobalFin Enterprise Architecture",
    category: "Fintech & Security",
    desc: "A globally distributed ledger and trading dashboard built for a top-tier financial institution. Secure by design to handle $1B+ daily volume.",
    color: "from-blue-600/20 to-cyan-900/20"
  },
  {
    title: "Aether AI Assistant",
    category: "SaaS & AI Integration",
    desc: "A custom LLM-powered data analyst platform for enterprise logistics teams. Reduced report generation time by 94%.",
    color: "from-purple-600/20 to-indigo-900/20"
  },
  {
    title: "Nexus MedRecord",
    category: "Healthcare Platform",
    desc: "HIPAA-compliant patient management system featuring real-time telehealth video bridging and fragmented data aggregation.",
    color: "from-emerald-600/20 to-teal-900/20"
  }
];

export function PortfolioSection() {
  return (
    <section id="work" className="py-32 relative bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block">Selected Work</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-xl">
              Proof of <span className="text-gradient">capability.</span>
            </h2>
          </div>
          <button className="text-white border-b border-cyan-500 pb-1 hover:text-cyan-400 transition-colors w-fit flex items-center gap-2">
            View All Case Studies <MoveUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-12 lg:space-y-24">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="group relative flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
            >
              {/* Image/Visual Area */}
              <div 
                className={`w-full lg:w-[60%] h-[300px] md:h-[450px] rounded-3xl overflow-hidden relative bg-gradient-to-br ${project.color} border border-white/5`}
              >
                {/* Placeholder pattern for actual project screenshots */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
                
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                
                <div className="absolute inset-x-8 -bottom-16 top-16 bg-black/50 rounded-t-2xl border border-white/10 shadow-2xl overflow-hidden group-hover:-translate-y-4 group-hover:scale-[1.02] transition-all duration-700 ease-out">
                  {/* Mock abstract UI representation */}
                  <div className="w-full h-8 bg-black/80 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                    <div className="w-2 h-2 rounded-full bg-green-400/50" />
                  </div>
                  <div className="p-8">
                    <div className="w-1/3 h-4 bg-white/5 rounded-full mb-4" />
                    <div className="w-full h-32 bg-white/5 rounded-xl mb-4" />
                    <div className="flex gap-4">
                       <div className="w-1/2 h-20 bg-white/5 rounded-xl" />
                       <div className="w-1/2 h-20 bg-white/5 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="w-full lg:w-[40%]">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-white/40 font-mono text-sm">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="h-px w-12 bg-white/20" />
                  <span className="text-cyan-400 text-sm">{project.category}</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-cyan-100 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-white/50 text-lg font-light leading-relaxed mb-8">
                  {project.desc}
                </p>

                <button className="flex items-center gap-2 text-white font-medium group/btn">
                  Explore Architecture
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                    <MoveUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </div>
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
