"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block">Contact</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's discuss your <span className="italic text-gray-500 font-serif">architecture.</span>
            </h2>
            <p className="text-white/50 text-lg font-light leading-relaxed mb-12">
              Whether you need a complete enterprise system overhaul, a scalable SaaS MVP, or AI agent integration, our engineering team is ready to architect a solution.
            </p>
            
            <div className="space-y-6 border-l-2 border-white/10 pl-6">
              <div>
                <h4 className="text-white font-medium mb-1">Direct Email</h4>
                <a href="mailto:hello@yuvaq.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">hello@yuvaq.com</a>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Headquarters</h4>
                <p className="text-white/50">San Francisco, California<br/>(Remote globally)</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-10 rounded-3xl"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Work Email</label>
                <input 
                  type="email" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Project Details</label>
                <textarea 
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Tell us about the scale, scope, and timeline..."
                />
              </div>

              <button className="w-full bg-white text-black font-semibold rounded-xl px-6 py-4 flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors group">
                Submit Inquiry
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
