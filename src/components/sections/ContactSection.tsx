"use client";

import { useEffect } from "react";
import { CONTACT_INFO } from "@/lib/data";

export default function ContactSection() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: "#contact", start: "top 70%" },
      });

      tl.from("#contact-left > *", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      }).from(
        "#contact-form > *",
        {
          opacity: 0,
          x: 40,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );
    };

    init();
  }, []);

  return (
    <section className="py-32 px-8 bg-surface-container-low" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
        {/* Left */}
        <div id="contact-left">
          <span className="font-label font-bold uppercase tracking-widest text-primary-fixed mb-6 block">
            Get In Touch
          </span>
          <h2 className="font-headline font-black text-5xl md:text-6xl tracking-tighter mb-8 text-inverse-surface">
            LET&apos;S BUILD <br /> SOMETHING.
          </h2>
          <p className="font-body text-lg text-secondary mb-12 leading-relaxed">
            Have a project in mind? I&apos;m always open to discussing product
            design work or partnership opportunities.
          </p>

          <div className="space-y-6">
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-primary-fixed text-xl">
                    {item.icon}
                  </span>
                </div>
                <div>
                  <p className="font-label font-bold uppercase tracking-widest text-xs text-secondary mb-1">
                    {item.label}
                  </p>
                  <p className="font-body font-semibold text-on-surface">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div id="contact-form" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-label font-bold uppercase tracking-widest text-xs text-secondary mb-2 block">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-fixed transition-colors"
              />
            </div>
            <div>
              <label className="font-label font-bold uppercase tracking-widest text-xs text-secondary mb-2 block">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-fixed transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="font-label font-bold uppercase tracking-widest text-xs text-secondary mb-2 block">
              Subject
            </label>
            <input
              type="text"
              placeholder="Project type / budget"
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-fixed transition-colors"
            />
          </div>
          <div>
            <label className="font-label font-bold uppercase tracking-widest text-xs text-secondary mb-2 block">
              Message
            </label>
            <textarea
              rows={6}
              placeholder="Tell me about your project..."
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-fixed transition-colors resize-none"
            />
          </div>
          <button className="w-full bg-inverse-surface text-surface py-4 rounded-lg font-headline font-bold uppercase tracking-tighter text-lg hover:opacity-80 transition-opacity active:scale-[0.99]">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}
