"use client";

import { motion, Variants } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Cloud,
  Cpu,
  Server,
  Shield,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

const services = [
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Web Platforms",
    description:
      "Next-generation web applications built with modern frameworks for extreme performance and SEO.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Architecture",
    description:
      "Native and cross-platform mobile experiences designed to feel fluid, intuitive, and premium.",
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "SaaS Development",
    description:
      "End-to-end product engineering for scalable software-as-a-service businesses.",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "AI Integration",
    description:
      "Embedding large language models and machine learning pipelines into your core product.",
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "Cloud Infrastructure",
    description:
      "Serverless architectures, Kubernetes orchestration, and globally distributed databases.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Systems",
    description:
      "Secure, compliant, and highly reliable custom software for established organizations.",
  },
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
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-black/40 py-20 sm:py-24 lg:py-32"
    >
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <span className="mb-4 block font-mono text-xs tracking-[0.22em] text-cyan-400 uppercase sm:text-sm">
            Expertise
          </span>

          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Capabilities that define{" "}
            <span className="font-serif italic text-gray-500">tomorrow.</span>
          </h2>

          <ScrollReveal
            baseOpacity={0.08}
            enableBlur
            blurStrength={5}
            baseRotation={2}
            textClassName="text-base sm:text-lg text-white/50 font-light leading-relaxed"
          >
            We deploy modern full-stack architectures to solve complex business
            problems across multiple technical domains.
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <SpotlightCard
                spotlightColor="rgba(0, 229, 255, 0.18)"
                className="group h-full min-h-[260px] cursor-default border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.05] sm:p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 transition-colors duration-500 group-hover:from-cyan-500/5 group-hover:to-transparent" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10">
                    {service.icon}
                  </div>

                  <h3 className="mb-3 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-300">
                    {service.title}
                  </h3>

                  <p className="mt-auto text-sm leading-relaxed font-light text-white/50">
                    {service.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}