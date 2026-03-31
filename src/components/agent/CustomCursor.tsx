"use client";

import { useEffect, useRef } from "react";
import { useAgent } from "@/context/AgentContext";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const posRef   = useRef({ x: 0, y: 0 });
  const ringPos  = useRef({ x: 0, y: 0 });
  const { state } = useAgent();

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", moveCursor);

    let rafId: number;
    const tick = () => {
      const dot  = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) { rafId = requestAnimationFrame(tick); return; }

      // Dot follows exactly
      dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;

      // Ring lags behind
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.14;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.14;
      ring.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Hover effects
    const addHover = () => {
      ringRef.current?.classList.add("cursor-hover");
      dotRef.current?.classList.add("cursor-hover");
    };
    const removeHover = () => {
      ringRef.current?.classList.remove("cursor-hover");
      dotRef.current?.classList.remove("cursor-hover");
    };
    const targets = document.querySelectorAll("a, button, [data-cursor-hover]");
    targets.forEach(el => { el.addEventListener("mouseenter", addHover); el.addEventListener("mouseleave", removeHover); });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(rafId);
      targets.forEach(el => { el.removeEventListener("mouseenter", addHover); el.removeEventListener("mouseleave", removeHover); });
    };
  }, []);

  const accentColor = state.recruiterMode ? "#00FF41" : "#feb300";

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 rounded-full transition-colors duration-300"
        style={{ backgroundColor: accentColor, willChange: "transform" }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-9 h-9 rounded-full border transition-all duration-300"
        style={{ borderColor: accentColor, willChange: "transform", opacity: 0.6 }}
      />

      <style jsx global>{`
        .cursor-hover + div,
        div.cursor-hover {
          transform: scale(1.6) !important;
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
}
