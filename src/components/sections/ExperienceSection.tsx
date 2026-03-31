"use client";

import { useEffect } from "react";

interface Role {
  year:     string;
  company:  string;
  title:    string;
  type:     string;
  bullets:  string[];
}

const EXPERIENCE: Role[] = [
  {
    year:    "2022–Now",
    company: "Nomad Studio",
    title:   "Lead UI/UX Designer",
    type:    "Full-time",
    bullets: [
      "Directed end-to-end design of three fintech super-apps serving 2M+ users",
      "Built and scaled a 4-person design system team from zero",
      "Reduced onboarding drop-off by 38% through iterative UX research",
    ],
  },
  {
    year:    "2020–2022",
    company: "Pulse Digital",
    title:   "Senior Product Designer",
    type:    "Full-time",
    bullets: [
      "Led redesign of flagship SaaS dashboard, cutting support tickets by 25%",
      "Established design-to-dev handoff pipeline using Figma tokens",
    ],
  },
  {
    year:    "2018–2020",
    company: "Freelance",
    title:   "UI Designer & Photographer",
    type:    "Self-employed",
    bullets: [
      "Delivered brand identity and web design for 40+ global clients",
      "Commercial photography for Nairobi Fashion Week 2019 & 2020",
    ],
  },
  {
    year:    "2016–2018",
    company: "CreativeLab KE",
    title:   "Junior UI Designer",
    type:    "Full-time",
    bullets: [
      "Designed marketing collateral and responsive web interfaces",
      "Introduced component-based design workflow across the studio",
    ],
  },
];

export default function ExperienceSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from("#experience-header > *", {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: "#experience", start: "top 80%" },
      });

      gsap.from(".exp-row", {
        opacity: 0, x: -40, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: "#experience-list", start: "top 75%" },
      });
    };
    init();
  }, []);

  return (
    <section className="py-32 px-8" id="experience">
      <div className="max-w-7xl mx-auto">

        <div id="experience-header" className="mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-surface/30 block mb-4">
            Work History
          </span>
          <h2 className="font-headline font-black text-6xl tracking-tighter text-surface">
            EXPERIENCE
          </h2>
        </div>

        <div id="experience-list" className="space-y-0">
          {EXPERIENCE.map((role, i) => (
            <div
              key={i}
              className="exp-row group grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-b border-white/5 hover:border-primary-fixed/30 transition-colors duration-300"
            >
              {/* Year + type */}
              <div className="md:col-span-2">
                <span className="font-mono text-xs text-surface/30 tracking-widest block mb-1">
                  {role.year}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-surface/20">
                  {role.type}
                </span>
              </div>

              {/* Company + title */}
              <div className="md:col-span-3">
                <h3 className="font-headline font-bold text-xl text-surface group-hover:text-primary-fixed transition-colors mb-1">
                  {role.company}
                </h3>
                <p className="font-body text-sm text-surface/40">{role.title}</p>
              </div>

              {/* Bullets */}
              <div className="md:col-span-7 space-y-2">
                {role.bullets.map((b, j) => (
                  <p key={j} className="font-body text-sm text-surface/50 flex items-start gap-3">
                    <span className="text-primary-fixed mt-1 flex-shrink-0">—</span>
                    {b}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Download CV */}
        <div className="mt-12 flex justify-end">
          <a
            href="#"
            className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-surface/40 hover:text-primary-fixed transition-colors"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            Download CV
          </a>
        </div>

      </div>
    </section>
  );
}
