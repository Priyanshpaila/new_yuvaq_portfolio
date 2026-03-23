"use client";

import { useEffect, useRef } from "react";

interface RibbonConfig {
  yFrac: number;
  amplitude: number;
  speed: number;
  phase: number;
  width: number;
  color: string;
  colorEnd: string;
  opacity: number;
}

interface RibbonBackgroundProps {
  className?: string;
  variant?: 'hero' | 'subtle' | 'accent' | 'custom';
  customRibbons?: RibbonConfig[];
  opacityMultiplier?: number;
}

export function RibbonBackground({ 
  className = "", 
  variant = 'hero',
  customRibbons,
  opacityMultiplier = 1
}: RibbonBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisible = useRef(true);
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let scrollY = 0;

    const isLowEnd =
      // @ts-expect-error – deviceMemory is non-standard
      (navigator.deviceMemory ?? 8) <= 4 ||
      navigator.hardwareConcurrency <= 4;

    const getRibbons = () => {
      if (customRibbons) return customRibbons;

      switch (variant) {
        case 'subtle':
          return [
            { yFrac: 0.3, amplitude: 40, speed: 0.0002, phase: 0, width: 300, color: "rgba(34,211,238,1)", colorEnd: "rgba(34,211,238,0)", opacity: 0.05 },
            { yFrac: 0.7, amplitude: 30, speed: 0.00015, phase: 1.5, width: 250, color: "rgba(99,102,241,1)", colorEnd: "rgba(99,102,241,0)", opacity: 0.04 },
          ];
        case 'accent':
          return [
            { yFrac: 0.5, amplitude: 100, speed: 0.0005, phase: 0, width: 400, color: "rgba(6,182,212,1)", colorEnd: "rgba(6,182,212,0)", opacity: 0.12 },
          ];
        case 'hero':
        default:
          return [
            { yFrac: 0.42, amplitude: 80, speed: 0.0004, phase: 0, width: 200, color: "rgba(34,211,238,1)", colorEnd: "rgba(6,182,212,0)", opacity: 0.18 },
            { yFrac: 0.55, amplitude: 60, speed: 0.0003, phase: 1.2, width: 140, color: "rgba(99,102,241,1)", colorEnd: "rgba(139,92,246,0)", opacity: 0.14 },
            { yFrac: 0.65, amplitude: 70, speed: 0.0005, phase: 2.4, width: 180, color: "rgba(6,182,212,1)", colorEnd: "rgba(34,211,238,0)", opacity: 0.16 },
            ...(!isLowEnd ? [
                { yFrac: 0.35, amplitude: 50, speed: 0.0006, phase: 0.8, width: 50, color: "rgba(165,243,252,1)", colorEnd: "rgba(34,211,238,0)", opacity: 0.22 },
                { yFrac: 0.25, amplitude: 40, speed: 0.0002, phase: 3.5, width: 100, color: "rgba(139,92,246,1)", colorEnd: "rgba(99,102,241,0)", opacity: 0.10 }
            ] : [])
          ];
      }
    };

    const ribbons = getRibbons().map(r => ({ ...r, opacity: r.opacity * opacityMultiplier }));

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      W = canvas.width = rect.width * dpr;
      H = canvas.height = rect.height * dpr;
      ctx?.scale(dpr, dpr);
      W = rect.width;
      H = rect.height;
    }

    function drawRibbon(t: number, r: RibbonConfig, scrollOffset: number) {
      if (!ctx) return;
      const scrollShift = scrollOffset * 0.12;
      const baseY = H * r.yFrac - (scrollShift % H);

      const pts: [number, number][] = [];
      const segments = isLowEnd ? 3 : 5;
      for (let i = 0; i <= segments; i++) {
        const x = (W / segments) * i;
        const phase2 = (i / segments) * Math.PI * 2;
        const dy = Math.sin(t * r.speed + r.phase + phase2) * r.amplitude;
        pts.push([x, baseY + dy]);
      }

      const hw = r.width / 2;
      const topPts = pts.map(([x, y]) => [x, y - hw] as [number, number]);
      const botPts = pts.map(([x, y]) => [x, y + hw] as [number, number]);

      const grad = ctx.createLinearGradient(0, 0, W, 0);
      const c = r.color.replace(",1)", `,${r.opacity})`);
      const ce = r.colorEnd.replace(",0)", `,0)`);
      
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.5, c);
      grad.addColorStop(1, ce);

      ctx.beginPath();
      ctx.moveTo(topPts[0][0], topPts[0][1]);
      for (let i = 0; i < topPts.length - 1; i++) {
        const mx = (topPts[i][0] + topPts[i + 1][0]) / 2;
        const my = (topPts[i][1] + topPts[i + 1][1]) / 2;
        ctx.quadraticCurveTo(topPts[i][0], topPts[i][1], mx, my);
      }
      ctx.lineTo(topPts[topPts.length - 1][0], topPts[topPts.length - 1][1]);
      ctx.lineTo(botPts[botPts.length - 1][0], botPts[botPts.length - 1][1]);
      for (let i = botPts.length - 2; i >= 0; i--) {
        const mx = (botPts[i][0] + botPts[i + 1][0]) / 2;
        const my = (botPts[i][1] + botPts[i + 1][1]) / 2;
        ctx.quadraticCurveTo(botPts[i + 1][0], botPts[i + 1][1], mx, my);
      }
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }

    function loop(t: number) {
      if (!ctx || !canvas || !isVisible.current) return;
      ctx.clearRect(0, 0, W, H);
      for (const r of ribbons) {
        drawRibbon(t, r, scrollY);
      }
      animIdRef.current = requestAnimationFrame(loop);
    }

    const startLoop = () => {
        if (!animIdRef.current) {
            animIdRef.current = requestAnimationFrame(loop);
        }
    }

    const stopLoop = () => {
        if (animIdRef.current) {
            cancelAnimationFrame(animIdRef.current);
            animIdRef.current = 0;
        }
    }

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const observer = new IntersectionObserver(([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (isVisible.current) {
            startLoop();
        } else {
            stopLoop();
        }
    }, { threshold: 0 });
    observer.observe(canvas);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize();

    window.addEventListener("scroll", onScroll, { passive: true });
    startLoop();

    return () => {
      stopLoop();
      ro.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [variant, customRibbons, opacityMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
