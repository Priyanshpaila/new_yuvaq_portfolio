"use client";

import { useEffect, useRef, useMemo, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  /** Opacity of unrevealed words (0–1). Default: 0.08 */
  baseOpacity?: number;
  /** Blur amount in px on unrevealed words. Default: 5 */
  blurStrength?: number;
  /** Initial rotation of the block. Default: 3 */
  baseRotation?: number;
  /** Enable per-word blur animation. Default: true */
  enableBlur?: boolean;
  /** Extra class on the outer wrapper. */
  containerClassName?: string;
  /** Extra class on the inner text element. */
  textClassName?: string;
  /** ScrollTrigger end for the block-rotation. Default: "bottom bottom" */
  rotationEnd?: string;
  /** ScrollTrigger end for word reveal. Default: "bottom bottom" */
  wordAnimationEnd?: string;
}

export function ScrollReveal({
  children,
  baseOpacity = 0.08,
  blurStrength = 5,
  baseRotation = 3,
  enableBlur = true,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /** Split text string into word <span>s; preserve whitespace nodes */
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((chunk, i) => {
      if (chunk.match(/^\s+$/)) return chunk; // raw whitespace
      return (
        <span
          key={i}
          className="sr-word inline-block"
          style={{ willChange: "opacity, filter" }}
        >
          {chunk}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".sr-word");
    const triggers: ScrollTrigger[] = [];

    // Block rotation
    const rotTween = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      }
    );
    rotTween.scrollTrigger && triggers.push(rotTween.scrollTrigger);

    // Word opacity
    const opTween = gsap.fromTo(
      words,
      { opacity: baseOpacity },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );
    opTween.scrollTrigger && triggers.push(opTween.scrollTrigger);

    // Word blur
    if (enableBlur && words.length > 0) {
      const blurTween = gsap.fromTo(
        words,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
      blurTween.scrollTrigger && triggers.push(blurTween.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [baseOpacity, baseRotation, blurStrength, enableBlur, rotationEnd, wordAnimationEnd]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${containerClassName}`}>
      <p className={`leading-relaxed ${textClassName}`}>{splitText}</p>
    </div>
  );
}
