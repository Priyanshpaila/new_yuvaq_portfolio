"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoveUpRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RibbonBackground } from "@/components/ui/RibbonBackground";

gsap.registerPlugin(ScrollTrigger);

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
];

export function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<any>(null);

  useEffect(() => {
    if (!railRef.current) return;

    const items = gsap.utils.toArray(".marquee-item");
    
    const loop = horizontalLoop(items, {
      repeat: -1,
      speed: 1,
      paddingRight: 32, // gap between items
    }) as any;
    loopRef.current = loop;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const direction = (self as any).direction || 1;
        gsap.to(loop, {
          timeScale: direction * 4,
          duration: 0.15,
          overwrite: true,
          onComplete: () => {
            gsap.to(loop, {
              timeScale: direction,
              duration: 1.2,
              ease: "power2.out",
              overwrite: true
            });
          }
        });
      }
    });

    const handleResize = () => {
      if (loopRef.current) loopRef.current.kill();
      const newLoop = horizontalLoop(gsap.utils.toArray(".marquee-item"), {
        repeat: -1,
        speed: 1,
        paddingRight: 32,
      });
      loopRef.current = newLoop;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (loopRef.current) loopRef.current.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleMouseEnter = () => {
    if (loopRef.current) {
      gsap.to(loopRef.current, { timeScale: 0, duration: 0.5, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (loopRef.current) {
      gsap.to(loopRef.current, { timeScale: 1, duration: 0.5, ease: "power2.inOut" });
    }
  };

  return (
    <section id="work" ref={containerRef} className="relative bg-[#030303] py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <RibbonBackground variant="accent" opacityMultiplier={0.3} />
        <div className="pointer-events-none absolute inset-0 z-1 bg-black/40" />
        <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,0.8))]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="mb-4 block font-mono text-xs tracking-[0.22em] text-cyan-400 uppercase">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Proof of <span className="font-serif italic text-white/40">capability.</span>
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="text-white/40 font-light text-right max-w-xs">
              Explore our latest builds across real estate, manufacturing, and healthcare.
            </p>
          </div>
        </div>
      </div>

      {/* Marquee Wrapper */}
      <div 
        className="relative flex items-center h-[500px] md:h-[600px] cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={railRef} className="flex gap-8 px-4">
          {[...projects, ...projects].map((project, idx) => (
            <div 
              key={`${project.title}-${idx}`} 
              className="marquee-item flex-shrink-0 w-[350px] md:w-[600px]"
            >
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative block w-full aspect-[16/10] rounded-[32px] overflow-hidden border border-white/10 bg-zinc-900"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 350px, 600px"
                  loading={idx < 4 ? "eager" : "lazy"}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Details */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-12 backdrop-blur-sm">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3 block">
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base font-light mb-8 line-clamp-3">
                      {project.desc}
                    </p>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <span>Live Preview</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Corner Label */}
                <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                  <MoveUpRight className="h-5 w-5 text-white" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-item {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

// Helper function from GSAP
function horizontalLoop(items: any[], config: any) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times: any[] = [],
    widths: any[] = [],
    xPercents: any[] = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1),
    totalWidth: number, curX, distanceToStart, distanceToLoop, item, i;
  
  gsap.set(items, {
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, "width") as string);
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x") as string) / w * 100 + (gsap.getProperty(el, "xPercent") as number));
      return xPercents[i];
    }
  });
  
  gsap.set(items, { x: 0 });
  
  totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) + (parseFloat(config.paddingRight) || 0);
  
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
    tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
      .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  
  function toIndex(index: number, vars: any) {
    vars = vars || {};
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  
  tl.next = (vars: any) => toIndex(curIndex + 1, vars);
  tl.previous = (vars: any) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);
  
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  
  return tl;
}
