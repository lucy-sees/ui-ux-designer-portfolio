"use client";

import Link from "next/link";
import { useEffect } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/data";

export default function ProjectsSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from("#projects-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "#projects", start: "top 80%" },
      });

      gsap.from(".gsap-project-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "#projects-grid", start: "top 75%" },
      });
    };

    init();
  }, []);

  return (
    <section className="py-32 bg-surface-container-lowest px-8" id="projects">
      <div className="max-w-7xl mx-auto">
        <div id="projects-header" className="mb-20 flex justify-between items-end">
          <h2 className="font-headline font-black text-6xl tracking-tighter">
            SELECTED WORKS
          </h2>
          <Link
            href="#"
            className="font-label font-bold uppercase tracking-widest text-primary hover:text-primary-fixed transition-colors"
          >
            View All Case Studies →
          </Link>
        </div>

        <div
          id="projects-grid"
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
