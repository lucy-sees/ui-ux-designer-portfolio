"use client";

import { useEffect } from "react";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/data";

export default function ServicesSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.set(".gsap-service-card", { opacity: 0, y: 60 });

      gsap.to(".gsap-service-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#services",
          start: "top 70%",
        },
      });

      gsap.from("#services-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#services",
          start: "top 80%",
        },
      });
    };

    init();
  }, []);

  return (
    <section className="py-32 bg-surface-container-low px-8" id="services">
      <div className="max-w-7xl mx-auto">
        <div
          id="services-header"
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <h2 className="font-headline font-black text-6xl tracking-tighter text-inverse-surface">
            MY EXPERTISE
          </h2>
          <p className="font-body text-lg text-secondary max-w-md">
            I merge aesthetics with functionality to create seamless digital
            journeys across multiple disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
