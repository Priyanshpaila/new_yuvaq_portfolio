"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string; // Color of the circle on hover
  pillTextColor?: string;
  hoveredPillTextColor?: string;
}

const PillNav: React.FC<PillNavProps> = ({
  items,
  activeHref,
  className = '',
  ease = 'power3.out',
  baseColor = '#22d3ee', // Cyan brand
  pillColor = '#22d3ee',
  pillTextColor = 'rgba(255,255,255,0.7)',
  hoveredPillTextColor = '#000'
}) => {
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        
        // Coverage geometry: R^2 = (w/2)^2 + h^2
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 4;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 2;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 15, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.3, xPercent: -50, duration: 0.5, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 10), duration: 0.4, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 30), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 0.4, ease, overwrite: 'auto' }, 0.02);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    
    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.35,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.25,
      ease,
      overwrite: 'auto'
    });
  };

  const cssVars = {
    '--nav-base': baseColor,
    '--pill-bg-circle': pillColor,
    '--pill-hover-text': hoveredPillTextColor,
    '--pill-text': pillTextColor
  } as React.CSSProperties;

  return (
    <div 
      className={`pill-nav-container glass border border-white/10 rounded-full px-2 py-1 shadow-2xl ${className}`} 
      style={cssVars} 
      ref={containerRef}
    >
      <ul className="pill-list flex flex-row items-center gap-1" role="menubar">
        {items.map((item, i) => {
          // Normalize matching for hashes
          const isActive = activeHref === item.href || (activeHref === '#home' && item.href === '/#home');
          
          return (
            <li key={item.href} role="none">
              <Link
                role="menuitem"
                href={item.href}
                className={`pill${isActive ? ' is-active' : ''}`}
                aria-label={item.ariaLabel || item.label}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
              >
                <span
                  className="hover-circle"
                  aria-hidden="true"
                  ref={el => {
                    circleRefs.current[i] = el;
                  }}
                  style={{ backgroundColor: pillColor }}
                />
                <span className="label-stack">
                  <span className="pill-label">{item.label}</span>
                  <span className="pill-label-hover" aria-hidden="true">
                    {item.label}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PillNav;
