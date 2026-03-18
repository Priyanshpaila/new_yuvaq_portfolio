"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Syncs Lenis smooth-scroll with GSAP ScrollTrigger so that scrub
 * animations stay perfectly aligned with the smoothed scroll position.
 */
function LenisGsapSync() {
  // Each Lenis tick → update ScrollTrigger with the real scroll position
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Use Lenis' RAF to drive ScrollTrigger refreshes on resize
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
