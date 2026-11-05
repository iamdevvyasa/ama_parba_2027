"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Simple, elegant custom cursor.
 * - Simple clean dot & trailing ring in the brand maroon button color (#751F25)
 *   with subtle saffron accent (#D88945) on interactive hover.
 * - Zero arrow shapes, zero complex or heavy animations.
 * - Disabled on touch/mobile devices.
 */
export function OdiaCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only activate on devices with a mouse / precision pointer
    const mq = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mq.matches);

    const onPointerChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mq.addEventListener("change", onPointerChange);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instantly position the center dot for pixel-perfect targeting
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check if hovering an interactive element (button, link, tab, etc.)
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive =
          target.closest("a, button, [role='button'], [role='tab'], summary, label") !== null;
        setIsHovered(interactive);
      }
    };

    // Smooth lerp loop for the outer ring follower
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      mq.removeEventListener("change", onPointerChange);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* 1. Outer Smooth Follower Ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none absolute left-0 top-0 rounded-full transition-[width,height,background-color,border-color,opacity] duration-200 ease-out ${
          isHovered
            ? "h-10 w-10 border-2 border-saffron bg-saffron/15"
            : "h-7 w-7 border-[1.5px] border-maroon/50 bg-transparent"
        } ${isClicked ? "scale-90 opacity-90" : "scale-100 opacity-80"}`}
        style={{
          willChange: "transform",
        }}
      />

      {/* 2. Simple Center Dot (Button Maroon color with crisp Ivory rim) */}
      <div
        ref={dotRef}
        className={`pointer-events-none absolute left-0 top-0 rounded-full border border-ivory shadow-sm transition-[transform,background-color] duration-150 ease-out ${
          isHovered
            ? "h-2.5 w-2.5 bg-maroon-600 scale-125"
            : "h-2 w-2 bg-maroon scale-100"
        } ${isClicked ? "!scale-90" : ""}`}
        style={{
          willChange: "transform",
          boxShadow: "0 0 3px rgba(117, 31, 37, 0.4)",
        }}
      />
    </div>
  );
}
