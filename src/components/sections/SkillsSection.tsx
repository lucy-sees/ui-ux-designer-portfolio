"use client";

import { useEffect } from "react";
import SkillBar from "@/components/ui/SkillBar";
import { SKILLS } from "@/lib/data";

export default function SkillsSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from("#skills-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "#skills", start: "top 80%" },
      });

      gsap.from(".gsap-skill-item", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: "#skills-grid", start: "top 75%" },
      });

      document.querySelectorAll(".gsap-skill-bar").forEach((bar) => {
        const el = bar as HTMLElement;
        const targetWidth = el.dataset.width ?? "0%";
        gsap.to(el, {
          width: targetWidth,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    };

    init();
  }, []);

  const leftSkills = SKILLS.slice(0, 2);
  const rightSkills = SKILLS.slice(2);

  return (
    <section className="py-32 px-8" id="skills">
      <div className="max-w-7xl mx-auto">
        <div id="skills-header" className="text-center mb-24">
          <h2 className="font-headline font-black text-6xl tracking-tighter mb-4">
            MY ARSENAL
          </h2>
          <div className="w-24 h-2 bg-primary-fixed mx-auto" />
        </div>
        <div id="skills-grid" className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            {leftSkills.map((skill) => (
              <SkillBar key={skill.label} {...skill} />
            ))}
          </div>
          <div className="space-y-12">
            {rightSkills.map((skill) => (
              <SkillBar key={skill.label} {...skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
