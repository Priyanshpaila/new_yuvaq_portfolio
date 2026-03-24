"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisGsapSync({
  lenisRef,
}: {
  lenisRef: React.RefObject<LenisRef | null>;
}) {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    const onResize = () => {
      ScrollTrigger.refresh();
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("resize", onResize);
    };
  }, [lenisRef]);

  return null;
}

function ScrollEffects() {
  useLenis((lenis) => {
    // Parallax effects
    const speedElements = document.querySelectorAll('[data-speed]');
    speedElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-speed') || '1');
      if (isNaN(speed) || speed === 1) return;
      
      const y = (lenis.scroll) * (1 - speed);
      (el as HTMLElement).style.transform = `translate3d(0, ${y}px, 0)`;
    });

    // Lag/Smoothness effects (simple implementation)
    const lagElements = document.querySelectorAll('[data-lag]');
    lagElements.forEach((el) => {
      const lag = parseFloat(el.getAttribute('data-lag') || '0');
      if (isNaN(lag) || lag === 0) return;
      
      // Note: Full lag implementation would require more complex state/GSAP
      // For now we just focus on the speed/parallax which is most visible
    });
  });

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: 0.05, // Smoother interpolation
        duration: 1.5, // Slightly slower, more premium feel
        smoothWheel: true,
        syncTouch: true, // Better mobile performance
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        overscroll: false, // Prevent generic bouncy behavior
        autoResize: true,
      }}
    >
      <LenisGsapSync lenisRef={lenisRef} />
      <ScrollEffects />
      {children}
    </ReactLenis>
  );
}