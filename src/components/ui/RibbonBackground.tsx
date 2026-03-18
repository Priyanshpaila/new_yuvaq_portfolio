"use client";

import { useEffect, useRef } from "react";

interface RibbonConfig {
  /** Base Y position as a fraction of canvas height (0–1) */
  yFrac: number;
  /** Amplitude of the vertical wave in px */
  amplitude: number;
  /** How fast the wave oscillates (higher = faster) */
  speed: number;
  /** Phase offset so ribbons don't sync */
  phase: number;
  /** Thickness of the ribbon stroke */
  width: number;
  /** Primary colour stop */
  color: string;
  /** Secondary colour stop (gradient end) */
  colorEnd: string;
  /** Peak opacity of this ribbon */
  opacity: number;
}

export function RibbonBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;
    let scrollY = 0;

    /* ─── Detect low-end devices and reduce work ─── */
    const isLowEnd =
      // @ts-expect-error – deviceMemory is non-standard
      (navigator.deviceMemory ?? 8) <= 2 ||
      navigator.hardwareConcurrency <= 2;

    /* ─── Ribbon definitions ─── */
    const ribbons: RibbonConfig[] = [
      // Deep cyan aurora
      { yFrac: 0.38, amplitude: 90, speed: 0.00045, phase: 0,      width: 220, color: "rgba(34,211,238,1)",   colorEnd: "rgba(6,182,212,0)",   opacity: 0.22 },
      { yFrac: 0.50, amplitude: 70, speed: 0.00038, phase: 1.1,    width: 160, color: "rgba(99,102,241,1)",   colorEnd: "rgba(139,92,246,0)",  opacity: 0.18 },
      { yFrac: 0.62, amplitude: 80, speed: 0.00052, phase: 2.3,    width: 200, color: "rgba(6,182,212,1)",    colorEnd: "rgba(34,211,238,0)",  opacity: 0.20 },
      // Accent purple streak
      { yFrac: 0.30, amplitude: 55, speed: 0.00031, phase: 3.7,    width: 110, color: "rgba(139,92,246,1)",   colorEnd: "rgba(99,102,241,0)",  opacity: 0.14 },
      // Thin bright edge highlight
      { yFrac: 0.45, amplitude: 40, speed: 0.00060, phase: 0.8,    width:  60, color: "rgba(165,243,252,1)",  colorEnd: "rgba(34,211,238,0)",  opacity: 0.28 },
      // Subtle teal fill
      { yFrac: 0.70, amplitude: 100, speed: 0.00028, phase: 1.9,   width: 180, color: "rgba(20,184,166,1)",   colorEnd: "rgba(6,182,212,0)",   opacity: 0.12 },
    ];

    // Low-end: fewer, thinner, slower
    const activeRibbons = isLowEnd ? ribbons.slice(0, 3) : ribbons;

    /* ─── Resize ─── */
    function resize() {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    /* ─── Draw a single ribbon as a filled bezier band ─── */
    function drawRibbon(t: number, r: RibbonConfig, scrollOffset: number) {
      if (!ctx) return;

      // Scroll shifts the ribbon up so it "drifts" as user scrolls
      const scrollShift = scrollOffset * 0.18;
      const baseY = H * r.yFrac - scrollShift;

      // Control-point helpers — 4 horizontal sections
      const pts: [number, number][] = [];
      const steps = isLowEnd ? 4 : 6;
      for (let i = 0; i <= steps; i++) {
        const x = (W / steps) * i;
        const phase2 = (i / steps) * Math.PI * 2;
        const y =
          baseY +
          Math.sin(t * r.speed + r.phase + phase2) * r.amplitude +
          Math.cos(t * r.speed * 0.6 + r.phase * 1.4 + phase2) * (r.amplitude * 0.4);
        pts.push([x, y]);
      }

      // Half-thickness of ribbon (tapers at edges)
      const hw = r.width / 2;

      // Build top and bottom edges
      const topPts = pts.map(([x, y]) => [x, y - hw] as [number, number]);
      const botPts = pts.map(([x, y]) => [x, y + hw] as [number, number]);

      // Horizontal gradient across the canvas
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0,   "rgba(0,0,0,0)");
      grad.addColorStop(0.2, r.color.replace(",1)", `,${r.opacity})`));
      grad.addColorStop(0.5, r.color.replace(",1)", `,${r.opacity * 1.3})`));
      grad.addColorStop(0.8, r.colorEnd.replace(",0)", `,${r.opacity})`));
      grad.addColorStop(1,   "rgba(0,0,0,0)");

      ctx.beginPath();

      // Top edge (left → right)
      ctx.moveTo(topPts[0][0], topPts[0][1]);
      for (let i = 0; i < topPts.length - 1; i++) {
        const mx = (topPts[i][0] + topPts[i + 1][0]) / 2;
        const my = (topPts[i][1] + topPts[i + 1][1]) / 2;
        ctx.quadraticCurveTo(topPts[i][0], topPts[i][1], mx, my);
      }
      const last = topPts[topPts.length - 1];
      ctx.lineTo(last[0], last[1]);

      // Bottom edge (right → left, closing the shape)
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

    /* ─── Main loop ─── */
    function loop(t: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);

      // Ambient dark base
      const bg = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
      bg.addColorStop(0, "rgba(2,15,30,0.0)");
      bg.addColorStop(1, "rgba(2,10,20,0.0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      for (const r of activeRibbons) {
        drawRibbon(t, r, scrollY);
      }

      animId = requestAnimationFrame(loop);
    }

    /* ─── Scroll listener (passive, no jank) ─── */
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    /* ─── Init ─── */
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize();

    window.addEventListener("scroll", onScroll, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
