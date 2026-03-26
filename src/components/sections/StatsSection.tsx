"use client";

import { useEffect } from "react";
import { STATS } from "@/lib/data";

export default function StatsSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".gsap-stat", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#stats-section",
          start: "top 75%",
        },
      });
    };

    init();
  }, []);

  return (
    <section
      id="stats-section"
      className="py-24 bg-inverse-surface text-surface px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        {STATS.map((stat) => (
          <div key={stat.label} className="gsap-stat text-center md:text-left">
            <span className="font-headline font-black text-6xl md:text-8xl block text-primary-fixed mb-2">
              {stat.value}
            </span>
            <span className="font-label text-sm uppercase tracking-[0.3em] text-surface-variant">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
