"use client";

import { useEffect, useRef } from "react";

interface KineticTextProps {
  text: string;
  className?: string;
  /** Stagger delay between chars in seconds */
  stagger?: number;
  /** Initial animation direction */
  from?: "bottom" | "top" | "left" | "right" | "scale";
  /** Trigger scroll position */
  scrollStart?: string;
  /** Run once on mount (no ScrollTrigger) */
  immediate?: boolean;
  tag?: keyof JSX.IntrinsicElements;
}

export default function KineticText({
  text,
  className = "",
  stagger = 0.03,
  from = "bottom",
  scrollStart = "top 85%",
  immediate = false,
  tag: Tag = "span",
}: KineticTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!immediate) gsap.registerPlugin(ScrollTrigger);

      // Split text into char spans — manual split, no SplitText plugin needed
      const chars = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.willChange = "transform, opacity";
        return span;
      });

      el.innerHTML = "";
      chars.forEach((s) => el.appendChild(s));

      const fromVars: gsap.TweenVars =
        from === "bottom" ? { y: "110%", opacity: 0, rotateX: -40 } :
        from === "top"    ? { y: "-110%", opacity: 0, rotateX: 40 } :
        from === "left"   ? { x: "-60px", opacity: 0 } :
        from === "right"  ? { x: "60px",  opacity: 0 } :
        /* scale */          { scale: 0, opacity: 0 };

      const toVars: gsap.TweenVars = {
        y: 0, x: 0, opacity: 1, rotateX: 0, scale: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger,
      };

      if (immediate) {
        gsap.fromTo(chars, fromVars, toVars);
      } else {
        toVars.scrollTrigger = { trigger: el, start: scrollStart };
        gsap.fromTo(chars, fromVars, toVars);
      }
    };

    init();

    return () => {
      // Restore plain text on unmount to avoid stale DOM
      if (containerRef.current) containerRef.current.textContent = text;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    // @ts-expect-error – dynamic tag
    <Tag
      ref={containerRef}
      className={`inline-block overflow-hidden ${className}`}
      style={{ perspective: "800px" }}
      aria-label={text}
    >
      {text}
    </Tag>
  );
}
