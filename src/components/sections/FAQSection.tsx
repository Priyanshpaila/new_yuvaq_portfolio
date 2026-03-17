"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    v: "01",
    q: "Do you only work with large enterprises?",
    a: "While our architecture is enterprise-grade, we frequently partner with funded startups and scale-ups who need to get their technical foundation right from day one. We scale our engagement based on your immediate needs."
  },
  {
    v: "02",
    q: "How do you handle security and compliance?",
    a: "Security is not an afterthought; it is built into our CI/CD pipelines. We adhere to industry standards (SOC2, HIPAA, GDPR) depending on your sector, implementing encrypted data-at-rest, secure key management, and rigorous automated penetration testing."
  },
  {
    v: "03",
    q: "What is your typical project timeline?",
    a: "We operate in agile sprints. A minimum viable enterprise product usually takes 12-16 weeks. However, we deliver staging access within the first 21 days so you can see your product evolving in real-time."
  },
  {
    v: "04",
    q: "Do you provide post-launch support and scaling?",
    a: "Yes. Launch is just day zero. We offer dedicated SLAs for post-launch infrastructure scaling, feature additions, and 24/7 technical monitoring to ensure 99.9% uptime."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative bg-black/80">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block">Clarity</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Commonly asked <span className="text-gray-500">questions.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`border border-white/10 rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? "bg-white/5" : "bg-transparent hover:bg-white/[0.02]"}`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg md:text-xl font-semibold text-white/90 pr-8">
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? "border-cyan-500 bg-cyan-500/10 text-cyan-400" : "border-white/20 text-white/50"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-white/50 text-base leading-relaxed font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
