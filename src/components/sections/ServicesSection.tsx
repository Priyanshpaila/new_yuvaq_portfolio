"use client";

import { motion, Variants } from "framer-motion";
import { Monitor, Smartphone, Cloud, Cpu, Server, Shield, Database, Workflow } from "lucide-react";

const services = [
  {
    icon: <Monitor className="w-6 h-6" />,
    title: "Web Platforms",
    description: "Next-generation web applications built with modern frameworks for extreme performance and SEO."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Architecture",
    description: "Native and cross-platform mobile experiences designed to feel fluid, intuitive, and premium."
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "SaaS Development",
    description: "End-to-end product engineering for scalable software-as-a-service businesses."
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Integration",
    description: "Embedding large language models and machine learning pipelines into your core product."
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Cloud Infrastructure",
    description: "Serverless architectures, Kubernetes orchestration, and globally distributed databases."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Enterprise Systems",
    description: "Secure, compliant, and highly reliable custom software for established organizations."
  }
];

export function ServicesSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-black/40">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Expertise</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Capabilities that define <span className="text-gray-500">tomorrow.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 font-light"
          >
            We deploy modern full-stack architectures to solve complex business problems across multiple technical domains.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group glass-card p-8 rounded-2xl flex flex-col relative overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-colors duration-500" />
              
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-white/50 text-sm leading-relaxed font-light mt-auto">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
