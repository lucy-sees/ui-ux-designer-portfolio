"use client";

import { useEffect } from "react";
import { useAgent } from "@/context/AgentContext";

/**
 * Applies recruiter-mode layout mutations:
 * - Reorders sections to surface experience + featured work first
 * - Updates section visibility priorities
 * - Fires GSAP emphasis animation on key cards
 */
export function useRecruiterLayout() {
  const { state } = useAgent();

  useEffect(() => {
    if (!state.recruiterMode) return;

    const apply = async () => {
      const { gsap } = await import("gsap");

      // Emphasise the stats section (proof of work)
      const stats = document.getElementById("stats-section");
      if (stats) {
        gsap.to(stats, {
          borderColor: "rgba(0,255,65,0.2)",
          duration: 1,
          ease: "power2.out",
        });
      }

      // Highlight featured project cards
      const featured = document.querySelectorAll("[data-featured='true']");
      gsap.fromTo(
        featured,
        { boxShadow: "0 0 0px rgba(0,255,65,0)" },
        {
          boxShadow: "0 0 32px rgba(0,255,65,0.15)",
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.1,
        }
      );

      // Pulse the hire-me button in the navbar
      const hireBtns = document.querySelectorAll<HTMLElement>("[data-hire-btn]");
      gsap.to(hireBtns, {
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out",
        yoyo: true,
        repeat: 2,
      });
    };

    apply();
  }, [state.recruiterMode]);
}
