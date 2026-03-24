"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { MoveUpRight, ExternalLink } from "lucide-react";
import { RibbonBackground } from "@/components/ui/RibbonBackground";

const projects = [
  {
    title: "Kalpavraksh Hills",
    category: "Real Estate",
    desc: "Premium residential township offering secure, well-planned living with modern amenities, elegant landscaping, wellness spaces, and a refined community lifestyle.",
    image: "/images/kalpa.png",
    color: "from-rose-600/20 to-pink-900/20",
    link: "https://township.kalpavraksh.com/",
  },
  {
    title: "Sunil Group of Industries",
    category: "Manufacturing",
    desc: "Precision steel manufacturer transforming raw materials into high-quality, sustainable solutions through innovation, quality excellence, customer partnership, and responsible manufacturing.",
    image: "/images/sun.png",
    color: "from-purple-600/20 to-indigo-900/20",
    link: "https://sunilgroupofindustries.com/",
  },
  {
    title: "Middlestown Pharmacy",
    category: "Healthcare",
    desc: "Digital pharmacy platform simplifying medicine discovery, secure ordering, prescription management, and doorstep healthcare access through a fast, user-friendly experience.",
    image: "/images/uk.png",
    color: "from-emerald-600/20 to-teal-900/20",
    link: "https://middlestown-pharmacy.co.uk/",
  },
  {
    title: "See Change",
    category: "Consultancy",
    desc: "Leading Knowledge Management Partner for MNCs and Growth Management Partner for MSMEs, delivering proof-of-concept-driven solutions through a 100+ expert network to revive struggling firms and accelerate enterprise growth.",
    image: "/images/see.png",
    color: "from-blue-600/20 to-cyan-900/20",
    link: "https://app.seechangeonline.com/",
  },
  {
    title: "Kalpvraksh",
    category: "Consultancy",
    desc: "Transformational psychology and counseling practice, empowering individuals, students, professionals, and families through 25+ years of expert guidance in career growth, mental wellness, academic success, and relationship harmony.",
    image: "/images/kal.png",
    color: "from-orange-600/20 to-amber-900/20",
    link: "https://kalpavraksh.com/",
  },
    {
    title: "BMPL",
    category: "Manufacturing",
    desc: "Bhawani Moulders Pvt. Ltd., established in 1987, is a trusted steel manufacturer known for innovation, quality, and advanced light structural steel solutions across India.",
    image: "/images/bmpl.png",
    color: "from-orange-600/20 to-amber-900/20",
    link: "https://bmpl-pawan.vercel.app/",
  },
];

interface StickyCardProps {
  i: number;
  project: (typeof projects)[0];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const StickyCard = ({
  i,
  project,
  progress,
  range,
  targetScale,
}: StickyCardProps) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${i * 28}px)`,
        }}
        className="relative flex h-[450px] md:h-[550px] w-full max-w-5xl origin-top flex-col overflow-hidden rounded-[32px] md:rounded-[48px] border border-white/10 bg-[#0A0A0A] shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-shadow duration-500 hover:shadow-cyan-500/10"
      >
        <div className="group relative h-full w-full">
          {/* Image with subtle zoom on hover */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <div className="max-w-3xl transform transition-transform duration-500">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-cyan-400" />
                <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-cyan-400 uppercase">
                  {project.category}
                </span>
              </div>

              <h3 className="text-3xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
                {project.title}
              </h3>

              <p className="text-white/50 text-base md:text-lg font-light line-clamp-2 max-w-2xl mb-8 leading-relaxed">
                {project.desc}
              </p>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:pr-12"
              >
                <span className="relative z-10">Explore Project</span>
                <MoveUpRight className="relative z-10 h-4 w-4 transition-all group-hover/btn:translate-x-2 group-hover/btn:-translate-y-1" />
                <div className="absolute inset-0 -translate-x-full bg-cyan-400 transition-transform duration-300 group-hover/btn:translate-x-0" />
              </a>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute top-10 right-10 h-14 w-14 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-center opacity-0 transition-all duration-500 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-12">
            <ExternalLink className="h-5 w-5 text-white/70" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function PortfolioSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" ref={container} className="relative bg-[#030303]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <RibbonBackground variant="accent" opacityMultiplier={0.2} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="container mx-auto max-w-7xl px-6 pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="h-px w-10 bg-cyan-500/50" />
                <span className="font-mono text-xs tracking-[0.4em] text-cyan-400 uppercase">
                  Portfolio
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9]"
              >
                Proof of <br />
                <span className="font-serif italic text-white/30">
                  capability.
                </span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-xs md:text-right"
            >
              <p className="text-white/40 font-light text-lg leading-relaxed">
                Engineering high-performance digital ecosystems for industry
                leaders.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Sticky Cards Stack */}
        <div className="px-4 pb-[30vh]">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <StickyCard
                key={project.title}
                i={i}
                project={project}
                progress={scrollYProgress}
                range={[i * 0.2, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>

      {/* Decorative scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
        <span className="text-[10px] uppercase tracking-[0.5em] text-white rotate-90 mb-8 translate-y-4">
          SCROLL
        </span>
        <div className="h-16 w-px bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
