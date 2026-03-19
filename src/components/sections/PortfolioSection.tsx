"use client";

import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

const projects = [
  {
    title: "See Change",
    category: "Astrology",
    desc: "Leading Knowledge Management Partner for MNCs and Growth Management Partner for MSMEs, delivering proof-of-concept-driven solutions through a 100+ expert network to revive struggling firms and accelerate enterprise growth.",
    image: "/images/see.png",
    color: "from-blue-600/20 to-cyan-900/20",
    link: "https://app.seechangeonline.com/",
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
    title: "Kalpvraksh",
    category: "Consultancy",
    desc: "Transformational psychology and counseling practice, empowering individuals, students, professionals, and families through 25+ years of expert guidance in career growth, mental wellness, academic success, and relationship harmony.",
    image: "/images/kal.png",
    color: "from-orange-600/20 to-amber-900/20",
    link: "https://kalpavraksh.com/",
  },
  {
    title: "Kalpavraksh Hills",
    category: "Real Estate",
    desc: "Premium residential township offering secure, well-planned living with modern amenities, elegant landscaping, wellness spaces, and a refined community lifestyle.",
    image: "/images/kalpa.png",
    color: "from-rose-600/20 to-pink-900/20",
    link: "https://township.kalpavraksh.com/",
  },
];

export function PortfolioSection() {
  return (
    <section id="work" className="relative bg-black py-20 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.04]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08),transparent_45%)]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end lg:mb-20">
          <div>
            <span className="mb-4 block font-mono text-xs tracking-[0.22em] text-cyan-400 uppercase sm:text-sm">
              Selected Work
            </span>

            <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Proof of <span className="text-gradient">capability.</span>
            </h2>
          </div>

          <button className="flex w-fit items-center gap-2 border-b border-cyan-500 pb-1 text-white transition-colors hover:text-cyan-400">
            View All Case Studies
            <MoveUpRight className="h-4 w-4" />
          </button>
        </div>

        <ScrollStack
          itemScale={0.06}
          itemStackDistance={28}
          baseScale={0.9}
          blurAmount={1.2}
          sectionMultiplier={1}
        >
          {projects.map((project, idx) => (
            <ScrollStackItem key={project.title} itemClassName="px-4 sm:px-6">
              <div className="mx-auto flex h-screen w-full max-w-6xl items-center justify-center">
                <div
                  className={`
                    group relative w-full overflow-hidden rounded-[32px]
                    bg-gradient-to-br ${project.color}
                    shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                    backdrop-blur-xl
                  `}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.08]" />
                  <div className="pointer-events-none absolute inset-0 bg-black/20" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />

                  <div className="relative z-10 grid min-h-[70vh] items-center gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 lg:px-10 lg:py-10">
                    {/* Screenshot */}
                    <div data-stack-visual className="relative w-full">
                      <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-cyan-500/10 blur-3xl" />

                      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                        <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-black/60 px-4">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                          <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                        </div>

                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 65vw, 900px"
                            priority={idx === 0}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                        </div>
                      </div>
                    </div>

                    {/* Text */}
                    <div
                      data-stack-copy
                      className="mx-auto max-w-xl rounded-[28px] px-5 py-5 text-left lg:mx-0 lg:px-6 lg:py-6"
                    >
                      <div className="mb-4 inline-flex items-center gap-4 px-4 py-2 backdrop-blur-md lg:mb-6">
                        <span className="font-mono text-xs text-white/40">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="h-px w-8 bg-white/15" />
                        <span className="text-sm text-cyan-400">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                        {project.title}
                      </h3>

                      <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed font-light text-white/80 sm:text-base md:text-lg lg:mx-0">
                        {project.desc}
                      </p>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-3 text-white"
                      >
                        <span className="font-medium">
                          Explore Architecture
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all group-hover/btn:bg-white group-hover/btn:text-black">
                          <MoveUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
