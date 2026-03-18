"use client";

import React, {
  Children,
  useCallback,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => {
  return (
    <div
      className={`scroll-stack-card relative w-full will-change-transform ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemScale?: number;
  itemStackDistance?: number;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  sectionMultiplier?: number;
  onStackComplete?: () => void;
}

type TransformState = {
  y: number;
  scale: number;
  rotation: number;
  blur: number;
  copyOpacity: number;
  copyY: number;
  copyBlur: number;
  visualOpacity: number;
  visualScale: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemScale = 0.06,
  itemStackDistance = 28,
  baseScale = 0.9,
  rotationAmount = 0,
  blurAmount = 0,
  sectionMultiplier = 1,
  onStackComplete,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const tickingRef = useRef(false);
  const lastTransformsRef = useRef(new Map<number, TransformState>());
  const stackCompletedRef = useRef(false);

  const childArray = Children.toArray(children);
  const itemCount = childArray.length;

  const updateCards = useCallback(() => {
    const root = rootRef.current;
    if (!root || !cardsRef.current.length) return;

    const rect = root.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const totalScrollable = rect.height - viewportHeight;

    const progress =
      totalScrollable <= 0
        ? 0
        : clamp(-rect.top / totalScrollable, 0, 1);

    const maxIndex = Math.max(itemCount - 1, 0);
    const rawTrack = progress * maxIndex;
    const currentIndex = Math.floor(rawTrack);
    const localProgress = rawTrack - currentIndex;
    const easedTrack = currentIndex + easeInOutCubic(localProgress);

    cardsRef.current.forEach((card, i) => {
      const diff = i - easedTrack;

      let y = 0;
      let scale = 1;
      let blur = 0;
      let rotation = 0;

      if (diff > 0) {
        y = diff * viewportHeight * 0.82;
        scale = 1 - Math.min(diff, 1.2) * 0.08;
      } else {
        const behind = -diff;
        y = -Math.min(behind, 4) * itemStackDistance;
        scale = 1 - Math.min(behind, 4) * itemScale;
        scale = Math.max(scale, baseScale);
        blur = blurAmount ? Math.min(behind * blurAmount, blurAmount * 3) : 0;
        rotation = rotationAmount
          ? -Math.min(behind, 3) * rotationAmount
          : 0;
      }

      // text visibility only for near-active card
      const distance = Math.abs(diff);
      const copyOpacity = clamp(1 - distance * 3.2, 0, 1);
      const copyY =
        diff > 0
          ? Math.min(diff, 1) * 28
          : -Math.min(-diff, 1) * 18;
      const copyBlur = (1 - copyOpacity) * 10;

      // visuals stay visible in stack, only slightly softened for older cards
      const visualOpacity =
        diff > 1.25 ? 0 : diff < -1 ? 0.78 : 1;
      const visualScale =
        diff < 0 ? 1 - Math.min(-diff, 2) * 0.02 : 1;

      const nextState: TransformState = {
        y: Math.round(y * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
        copyOpacity: Math.round(copyOpacity * 1000) / 1000,
        copyY: Math.round(copyY * 100) / 100,
        copyBlur: Math.round(copyBlur * 100) / 100,
        visualOpacity: Math.round(visualOpacity * 1000) / 1000,
        visualScale: Math.round(visualScale * 1000) / 1000,
      };

      const prevState = lastTransformsRef.current.get(i);
      const changed =
        !prevState ||
        Math.abs(prevState.y - nextState.y) > 0.1 ||
        Math.abs(prevState.scale - nextState.scale) > 0.001 ||
        Math.abs(prevState.rotation - nextState.rotation) > 0.1 ||
        Math.abs(prevState.blur - nextState.blur) > 0.1 ||
        Math.abs(prevState.copyOpacity - nextState.copyOpacity) > 0.01 ||
        Math.abs(prevState.copyY - nextState.copyY) > 0.1 ||
        Math.abs(prevState.copyBlur - nextState.copyBlur) > 0.1 ||
        Math.abs(prevState.visualOpacity - nextState.visualOpacity) > 0.01 ||
        Math.abs(prevState.visualScale - nextState.visualScale) > 0.001;

      if (changed) {
        card.style.transform = `translate(-50%, -50%) translate3d(0, ${nextState.y}px, 0) scale(${nextState.scale}) rotate(${nextState.rotation}deg)`;
        card.style.filter =
          nextState.blur > 0 ? `blur(${nextState.blur}px)` : "none";
        card.style.opacity = "1";
        card.style.zIndex = String(100 + i);

        const copyEl = card.querySelector("[data-stack-copy]") as HTMLElement | null;
        if (copyEl) {
          copyEl.style.opacity = String(nextState.copyOpacity);
          copyEl.style.transform = `translate3d(0, ${nextState.copyY}px, 0)`;
          copyEl.style.filter =
            nextState.copyBlur > 0.2 ? `blur(${nextState.copyBlur}px)` : "none";
          copyEl.style.pointerEvents = nextState.copyOpacity > 0.75 ? "auto" : "none";
        }

        const visualEl = card.querySelector("[data-stack-visual]") as HTMLElement | null;
        if (visualEl) {
          visualEl.style.opacity = String(nextState.visualOpacity);
          visualEl.style.transform = `scale(${nextState.visualScale})`;
        }

        lastTransformsRef.current.set(i, nextState);
      }
    });

    if (progress >= 0.999 && !stackCompletedRef.current) {
      stackCompletedRef.current = true;
      onStackComplete?.();
    } else if (progress < 0.999 && stackCompletedRef.current) {
      stackCompletedRef.current = false;
    }
  }, [
    itemCount,
    itemScale,
    itemStackDistance,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
  ]);

  const requestUpdate = useCallback(() => {
    if (tickingRef.current) return;

    tickingRef.current = true;
    requestAnimationFrame(() => {
      updateCards();
      tickingRef.current = false;
    });
  }, [updateCards]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll(".scroll-stack-card")
    ) as HTMLElement[];

    cardsRef.current = cards;

    cards.forEach((card) => {
      card.style.position = "absolute";
      card.style.left = "50%";
      card.style.top = "50%";
      card.style.width = "100%";
      card.style.transform = "translate(-50%, -50%)";
      card.style.transformOrigin = "center center";
      card.style.willChange = "transform, opacity, filter";
      card.style.backfaceVisibility = "hidden";
      card.style.webkitBackfaceVisibility = "hidden";
      card.style.perspective = "1000px";
      card.style.webkitPerspective = "1000px";

      const copyEl = card.querySelector("[data-stack-copy]") as HTMLElement | null;
      if (copyEl) {
        copyEl.style.willChange = "transform, opacity, filter";
        copyEl.style.transition = "none";
      }

      const visualEl = card.querySelector("[data-stack-visual]") as HTMLElement | null;
      if (visualEl) {
        visualEl.style.willChange = "transform, opacity";
        visualEl.style.transition = "none";
      }
    });

    updateCards();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      stackCompletedRef.current = false;
      tickingRef.current = false;
    };
  }, [requestUpdate, updateCards]);

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`.trim()}
      style={{
        height: `${Math.max(itemCount * sectionMultiplier, 1) * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full w-full">{childArray}</div>
      </div>
    </div>
  );
};

export default ScrollStack;