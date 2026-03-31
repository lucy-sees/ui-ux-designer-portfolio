"use client";

import { useEffect, useRef } from "react";

interface MarqueeStripProps {
  items: string[];
  speed?: number; // px/sec
  direction?: "left" | "right";
  className?: string;
  separator?: string;
}

export default function MarqueeStrip({
  items,
  speed = 60,
  direction = "left",
  className = "",
  separator = "✦",
}: MarqueeStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const posRef   = useRef(0);
  const lastRef  = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate children so the loop is seamless
    const original = track.innerHTML;
    track.innerHTML = original + original;

    const halfWidth = track.scrollWidth / 2;

    const tick = (now: number) => {
      const delta = (now - (lastRef.current || now)) / 1000;
      lastRef.current = now;

      posRef.current += direction === "left"
        ? -speed * delta
        : speed * delta;

      // Reset when one full copy has scrolled
      if (direction === "left"  && posRef.current <= -halfWidth) posRef.current += halfWidth;
      if (direction === "right" && posRef.current >= 0)           posRef.current -= halfWidth;

      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, direction]);

  const content = items.flatMap((item, i) => [
    <span key={`item-${i}`} className="mx-6 font-headline font-black uppercase tracking-tighter text-surface/80">
      {item}
    </span>,
    <span key={`sep-${i}`} className="text-primary-fixed mx-2 text-sm">
      {separator}
    </span>,
  ]);

  return (
    <div className={`overflow-hidden py-4 ${className}`}>
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap will-change-transform"
        style={{ transform: "translateX(0)" }}
      >
        {content}
      </div>
    </div>
  );
}
