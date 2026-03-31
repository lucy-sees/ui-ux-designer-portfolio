"use client";

import { Suspense, lazy, useEffect } from "react";
import { useAgent } from "@/context/AgentContext";
import MagneticButton from "@/components/animations/MagneticButton";

const HeroBlob = lazy(() => import("@/components/3d/HeroBlob"));

function BlobFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-primary-fixed/10 blur-3xl animate-pulse" />
    </div>
  );
}

const CHARS_LUCY  = "LUCY".split("");
const CHARS_SEES = "SEES".split("");

export default function HeroSection() {
  const { dispatch, state } = useAgent();

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");

      // Stagger each character of the hero heading
      const allChars = document.querySelectorAll(".hero-char");
      gsap.fromTo(
        allChars,
        { y: "120%", opacity: 0, rotateX: -50 },
        {
          y: "0%", opacity: 1, rotateX: 0,
          duration: 0.8, stagger: 0.04, ease: "power3.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
      gsap.fromTo(".hero-body",  { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.9 });
      gsap.fromTo(".hero-cta",   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.1 });
      gsap.fromTo(".hero-image", { opacity: 0, x: 80, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 1.0, delay: 0.5, ease: "power3.out" });
      gsap.fromTo(".hero-tag",   { opacity: 0, x: -50, rotate: 5 }, { opacity: 1, x: 0, rotate: 2, duration: 0.7, delay: 1.2, ease: "back.out(1.7)" });
    };
    init();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-8 pt-20">

      {/* R3F Blob */}
      <div className="absolute -z-10 w-[600px] h-[600px] -top-20 -right-32 pointer-events-none opacity-80">
        <Suspense fallback={<BlobFallback />}>
          <HeroBlob />
        </Suspense>
      </div>

      {/* Subtle radial gradient */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_50%_at_80%_-10%,rgba(254,179,0,0.08),transparent)]" />

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* ── Left ── */}
        <div className="md:col-span-7 z-10">
          <span className="hero-badge font-mono font-bold uppercase tracking-[0.25em] text-primary-fixed mb-8 block text-sm opacity-0">
            ✦ Available for Freelance
          </span>

          {/* Kinetic heading — manual char split */}
          <h1
            className="font-headline font-black tracking-tighter leading-[0.85] text-surface mb-8"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)", perspective: "800px" }}
          >
            <span className="block overflow-hidden">
              {CHARS_LUCY.map((c, i) => (
                <span
                  key={i}
                  className="hero-char inline-block"
                  style={{ display: "inline-block", willChange: "transform, opacity" }}
                >
                  {c}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {CHARS_SEES.map((c, i) => (
                <span
                  key={i}
                  className="hero-char inline-block text-stroke"
                  style={{ display: "inline-block", willChange: "transform, opacity" }}
                >
                  {c}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-body font-body text-xl md:text-2xl text-surface/50 max-w-xl mb-10 leading-relaxed opacity-0">
            A Senior UI/UX Designer &amp; Photographer crafting high-impact digital
            experiences through a lens of bold editorial minimalism.
          </p>

          <div className="hero-cta flex gap-4 flex-wrap opacity-0">
            <MagneticButton
              className="bg-primary-fixed text-on-primary-fixed px-10 py-5 rounded-md font-extrabold text-base uppercase tracking-tight shadow-gold hover:opacity-90 transition-opacity"
              onClick={() => {}}
            >
              Start a Project
            </MagneticButton>

            <MagneticButton
              className="flex items-center gap-2 glass border border-white/10 px-8 py-5 rounded-md font-extrabold text-base uppercase tracking-tight text-surface/70 hover:text-agent-green hover:border-agent-green/30 transition-all"
              onClick={() => dispatch({ type: "TOGGLE_COMMAND_CENTER" })}
            >
              <span className="material-symbols-outlined text-xl">auto_awesome</span>
              Ask AI
            </MagneticButton>
          </div>

          {/* Recruiter mode indicator */}
          {state.recruiterMode && (
            <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-agent-green/70">
              <span className="w-1.5 h-1.5 rounded-full bg-agent-green animate-ping" />
              Recruiter Mode Active
            </div>
          )}
        </div>

        {/* ── Right ── */}
        <div className="md:col-span-5 relative group">
          <div className="absolute -inset-4 bg-primary-fixed rounded-xl -rotate-3 transition-transform duration-700 group-hover:rotate-0 opacity-90" />

          <div className="hero-image relative z-10 opacity-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZfYOyQ2T3xmjg2bB3JOwUN4QlKY462YZQyhNZKwG_Q1Q7LDVUqn3PCd3xI9QercgV7OouqxFmbssNFaHpWOzz4C_z7KWjtnQ2TMRcfyxFrSMEA6s7_IXD_A1KLTE14LRn8mmquh7ie0OS5w9R9Ibz5krky3Lv4RxxY48sP_WVHuKpVZDPNFGkbBoEGZtx8AG_6ICmwrgJGCaU-QmOuJcjYSt6xCZSCybWmBdEsLCU9gfZFbNJORz0F_w-G77dkb-n3roBOZUICDS2"
              alt="Lucy Sees"
              className="w-full aspect-[4/5] object-cover rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="hero-tag absolute bottom-8 -left-12 z-20 glass border border-white/10 text-surface px-6 py-4 rounded-lg font-headline font-bold text-xl opacity-0">
            UI/UX Designer
          </div>
        </div>

      </div>
    </section>
  );
}
