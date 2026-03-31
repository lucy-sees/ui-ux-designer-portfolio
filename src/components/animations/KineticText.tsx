"use client";

import { useEffect, useRef } from "react";

interface KineticTextProps {
  text: string;
  className?: string;
  stagger?: number;
  from?: "bottom" | "top" | "left" | "right" | "scale";
  scrollStart?: string;
  immediate?: boolean;
  tag?: React.ElementType;
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
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Capture ref value at effect start — avoids the stale-ref cleanup warning
    const el = containerRef.current;
    if (!el) return;

    let ctx: ReturnType<typeof gsap.context> | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!immediate) gsap.registerPlugin(ScrollTrigger);

      const chars = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent   = char === " " ? "\u00A0" : char;
        span.style.display    = "inline-block";
        span.style.willChange = "transform, opacity";
        return span;
      });

      el.innerHTML = "";
      chars.forEach((s) => el.appendChild(s));

      let fromVars: gsap.TweenVars;
      if (from === "bottom") {
        fromVars = { y: "110%",  opacity: 0, rotateX: -40 };
      } else if (from === "top") {
        fromVars = { y: "-110%", opacity: 0, rotateX:  40 };
      } else if (from === "left") {
        fromVars = { x: "-60px", opacity: 0 };
      } else if (from === "right") {
        fromVars = { x:  "60px", opacity: 0 };
      } else {
        fromVars = { scale: 0,   opacity: 0 };
      }

      const toVars: gsap.TweenVars = {
        y: 0, x: 0, opacity: 1, rotateX: 0, scale: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger,
        ...(immediate ? {} : { scrollTrigger: { trigger: el, start: scrollStart } }),
      };

      ctx = gsap.context(() => { gsap.fromTo(chars, fromVars, toVars); });
    };

    init();

    return () => {
      ctx?.revert();
      // Use captured `el` — not containerRef.current — to avoid the stale-ref warning
      el.textContent = text;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag
      ref={containerRef as any}
      className={`inline-block overflow-hidden ${className}`}
      style={{ perspective: "800px" }}
      aria-label={text}
    >
      {text}
    </Tag>
  );
}
