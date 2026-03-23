"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import {
  Monitor,
  Smartphone,
  Cloud,
  Cpu,
  Server,
  Shield,
  Layers,
  Sparkles,
  Zap,
  Globe
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { RibbonBackground } from "@/components/ui/RibbonBackground";

const services = [
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Web Platforms",
    description: "Next-generation web applications built with modern frameworks for extreme performance and SEO.",
    parallaxSpeed: 0.05
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Architecture",
    description: "Native and cross-platform mobile experiences designed to feel fluid, intuitive, and premium.",
    parallaxSpeed: -0.03
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "SaaS Development",
    description: "End-to-end product engineering for scalable software-as-a-service businesses.",
    parallaxSpeed: 0.08
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "AI Integration",
    description: "Embedding large language models and machine learning pipelines into your core product.",
    parallaxSpeed: -0.05
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "Cloud Infrastructure",
    description: "Serverless architectures, Kubernetes orchestration, and globally distributed databases.",
    parallaxSpeed: 0.1
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Systems",
    description: "Secure, compliant, and highly reliable custom software for established organizations.",
    parallaxSpeed: -0.04
  },
];

const bgIcons = [
  { Icon: Globe, top: "15%", left: "5%", size: 100, speed: 0.15 },
  { Icon: Zap, top: "45%", right: "8%", size: 130, speed: -0.12 },
  { Icon: Sparkles, bottom: "20%", left: "12%", size: 90, speed: 0.08 },
  { Icon: Layers, bottom: "10%", right: "5%", size: 160, speed: 0.2 },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative overflow-hidden bg-[#030303] py-24 md:py-32 lg:py-48"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none bg-[#030303]">
        <RibbonBackground variant="subtle" opacityMultiplier={0.4} />
        {bgIcons.map((item, i) => (
          <ParallaxIcon key={i} {...item} scrollProgress={scrollYProgress} />
        ))}
        {/* Darkening Overlays */}
        <div className="pointer-events-none absolute inset-0 z-1 bg-black/40" />
        <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,0.8))]" />
        
        <div className="absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-cyan-500/[0.02] blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-purple-500/[0.02] blur-[130px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.01]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-20 max-w-4xl text-center lg:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-block font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-cyan-400 border border-cyan-400/30 px-5 py-2 rounded-full bg-cyan-400/5 backdrop-blur-sm">
              Capabilities & Expertise
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 text-4xl font-bold text-white md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
          >
            Engineering that <br />
            <span className="font-serif italic text-white/30">defines modern products.</span>
          </motion.h2>

          <ScrollReveal
            baseOpacity={0.15}
            enableBlur
            blurStrength={5}
            baseRotation={0}
            textClassName="text-lg md:text-2xl text-white/40 font-light leading-relaxed max-w-3xl mx-auto"
          >
            We deploy precision-engineered full-stack architectures to solve high-impact business challenges globally.
          </ScrollReveal>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              index={index} 
              scrollProgress={scrollYProgress} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ParallaxIcon({ Icon, top, left, right, bottom, size, speed, scrollProgress }: any) {
  const y = useTransform(scrollProgress, [0, 1], [0, speed * 800]);
  const rotate = useTransform(scrollProgress, [0, 1], [0, speed * 150]);

  return (
    <motion.div
      style={{ top, left, right, bottom, y, rotate }}
      className="absolute flex items-center justify-center text-white/[0.03]"
    >
      <Icon size={size} strokeWidth={0.5} />
    </motion.div>
  );
}

function ServiceCard({ service, index, scrollProgress }: { service: typeof services[0], index: number, scrollProgress: any }) {
  const y = useTransform(
    scrollProgress, 
    [0, 1], 
    [index % 2 === 0 ? 20 : -20, index % 2 === 0 ? -20 : 20]
  );
  
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      style={{ y }}
      className="h-full"
    >
      <SpotlightCard
        spotlightColor="rgba(6, 182, 212, 0.12)"
        className="group h-full min-h-[320px] cursor-default border border-white/5 bg-white/[0.02] p-8 lg:p-10 backdrop-blur-md transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04] rounded-[32px] overflow-hidden flex flex-col justify-between"
      >
        <div className="relative z-10 flex h-full flex-col space-y-8">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-cyan-400 shadow-lg group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all duration-500"
          >
            {service.icon}
          </motion.div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-500">
              {service.title}
            </h3>
            <p className="text-base leading-relaxed font-light text-white/40 group-hover:text-white/60 transition-colors duration-500">
              {service.description}
            </p>
          </div>
        </div>

        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-cyan-500/[0.02] blur-3xl opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
      </SpotlightCard>
    </motion.div>
  );
}