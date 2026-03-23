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

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: 0.07,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        overscroll: true,
        autoResize: true,
      }}
    >
      <LenisGsapSync lenisRef={lenisRef} />
      {children}
    </ReactLenis>
  );
}