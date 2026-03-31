"use client";

import { useEffect, useRef, useState } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate asset loading progress
    const steps = [15, 30, 50, 70, 85, 100];
    let i = 0;
    const tick = () => {
      if (i >= steps.length) {
        setPhase("reveal");
        return;
      }
      setProgress(steps[i]);
      i++;
      setTimeout(tick, 120 + Math.random() * 180);
    };
    setTimeout(tick, 100);
  }, []);

  useEffect(() => {
    if (phase !== "reveal") return;

    const animate = async () => {
      const { gsap } = await import("gsap");
      const overlay = overlayRef.current;
      if (!overlay) return;

      const tl = gsap.timeline({ onComplete: () => setPhase("done") });
      tl.to(overlay, { scaleY: 0, duration: 0.9, ease: "power4.inOut", transformOrigin: "top center" });
    };

    animate();
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center"
      style={{ background: "#050505", transformOrigin: "top center" }}
    >
      {/* Logo */}
      <div className="font-headline font-black text-3xl uppercase tracking-tighter text-surface mb-12">
        DESIGNER.UX
      </div>

      {/* Progress bar */}
      <div className="w-48 h-px bg-white/10 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary-fixed transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Counter */}
      <span className="mt-4 font-mono text-xs text-surface/30 tracking-widest">
        {String(progress).padStart(3, "0")}
      </span>
    </div>
  );
}
