"use client";

import { useEffect, useRef } from "react";

/**
 * MorphingText — Canvas particle text morpher
 *
 * Samples pixel positions from off-screen text, then animates a pool of
 * dots between those positions using spring physics. Words cycle in a loop.
 *
 * Zero external dependencies. Uses Canvas 2D only (no WebGL).
 */

interface Dot {
  /** Current position */
  x: number;
  y: number;
  /** Target position */
  tx: number;
  ty: number;
  /** Velocity */
  vx: number;
  vy: number;
  /** Current radius */
  r: number;
  /** Target radius */
  tr: number;
  /** Current alpha */
  a: number;
  /** Target alpha */
  ta: number;
}

interface MorphingTextProps {
  /** Words/phrases to cycle through */
  words?: string[];
  /** Milliseconds each word is displayed */
  holdMs?: number;
  /** Gap between sampled pixels (lower = more dots, heavier) */
  gap?: number;
  /** Dot colour */
  color?: string;
  className?: string;
}

const DEFAULT_WORDS = [
  "Scalable",
  "Secure",
  "Enterprise",
  "Innovative",
  "Reliable",
];

export function MorphingText({
  words = DEFAULT_WORDS,
  holdMs = 2200,
  gap = 7,
  color = "rgba(34,211,238,",
  className = "",
}: MorphingTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ─── Off-screen text sampler ─── */
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d")!;

    let animId: number;
    let wordIndex = 0;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;
    let W = 0;
    let H = 0;
    const dots: Dot[] = [];

    /* ─── Device capability check ─── */
    const isLowEnd =
      // @ts-expect-error deviceMemory non-standard
      (navigator.deviceMemory ?? 8) <= 2 || navigator.hardwareConcurrency <= 2;
    const adjustedGap = isLowEnd ? gap + 4 : gap;

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
      off.width = W;
      off.height = H;
    }

    /* ─── Sample pixel positions from off-screen text render ─── */
    function sampleWord(word: string): { x: number; y: number }[] {
      offCtx.clearRect(0, 0, W, H);

      // Fit font size to canvas width
      let fontSize = Math.min(H * 0.85, W * 0.18);
      offCtx.font = `900 ${fontSize}px "Inter", sans-serif`;
      const measured = offCtx.measureText(word).width;
      if (measured > W * 0.9) {
        fontSize *= (W * 0.9) / measured;
        offCtx.font = `900 ${fontSize}px "Inter", sans-serif`;
      }

      offCtx.fillStyle = "#fff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(word, W / 2, H / 2);

      const pixels = offCtx.getImageData(0, 0, W, H).data;
      const pts: { x: number; y: number }[] = [];

      for (let y = 0; y < H; y += adjustedGap) {
        for (let x = 0; x < W; x += adjustedGap) {
          const idx = (y * W + x) * 4;
          if (pixels[idx + 3] > 120) {
            pts.push({ x, y });
          }
        }
      }
      return pts;
    }

    /* ─── Shuffle helper ─── */
    function shuffle<T>(arr: T[]): T[] {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    /* ─── Morph to a new word ─── */
    function morphTo(word: string) {
      const pts = shuffle(sampleWord(word));

      // Expand dot pool if needed
      while (dots.length < pts.length) {
        dots.push({
          x: Math.random() * W,
          y: Math.random() * H,
          tx: 0,
          ty: 0,
          vx: 0,
          vy: 0,
          r: 0,
          tr: 0,
          a: 0,
          ta: 0,
        });
      }

      // Assign targets to active dots
      for (let i = 0; i < pts.length; i++) {
        dots[i].tx = pts[i].x;
        dots[i].ty = pts[i].y;
        dots[i].tr = Math.random() * 1.5 + 0.8;
        dots[i].ta = Math.random() * 0.4 + 0.7;
      }

      // Retire surplus dots (send them away & fade)
      for (let i = pts.length; i < dots.length; i++) {
        dots[i].tx = Math.random() * W;
        dots[i].ty = H + 60;
        dots[i].tr = 0;
        dots[i].ta = 0;
      }
    }

    /* ─── Spring-physics update ─── */
    const STIFFNESS = 0.08;
    const DAMPING = 0.72;

    function update() {
      for (const d of dots) {
        const fX = (d.tx - d.x) * STIFFNESS;
        const fY = (d.ty - d.y) * STIFFNESS;
        d.vx = d.vx * DAMPING + fX;
        d.vy = d.vy * DAMPING + fY;
        d.x += d.vx;
        d.y += d.vy;
        d.r += (d.tr - d.r) * 0.12;
        d.a += (d.ta - d.a) * 0.08;
      }
    }

    /* ─── Draw ─── */
    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (const d of dots) {
        if (d.r < 0.05 || d.a < 0.02) continue;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, Math.max(0, d.r), 0, Math.PI * 2);
        ctx!.fillStyle = `${color}${d.a.toFixed(2)})`;
        ctx!.fill();
      }
    }

    /* ─── Main loop ─── */
    function loop() {
      update();
      draw();
      animId = requestAnimationFrame(loop);
    }

    /* ─── Word cycling ─── */
    function cycleWord() {
      morphTo(words[wordIndex % words.length]);
      wordIndex++;
      holdTimer = setTimeout(cycleWord, holdMs);
    }

    /* ─── Init ─── */
    const ro = new ResizeObserver(() => {
      resize();
      morphTo(words[(wordIndex - 1 + words.length) % words.length]);
    });
    ro.observe(canvas);
    resize();

    // Short delay so canvas has proper dimensions
    const startTimer = setTimeout(() => {
      cycleWord();
      loop();
    }, 100);

    return () => {
      cancelAnimationFrame(animId);
      holdTimer && clearTimeout(holdTimer);
      clearTimeout(startTimer);
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full ${className}`}
      aria-hidden="true"
    />
  );
}
