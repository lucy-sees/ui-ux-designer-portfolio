"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import MarqueeStrip from "@/components/animations/MarqueeStrip";
import AgentStatusBar from "@/components/agent/AgentStatusBar";
import CustomCursor from "@/components/agent/CustomCursor";
import PageLoader from "@/components/agent/PageLoader";
import { SessionPersister } from "@/hooks/useSessionPersistence";
import { useRecruiterLayout } from "@/hooks/useRecruiterLayout";
import { useAgent } from "@/context/AgentContext";

const MARQUEE_ITEMS = [
  "UI/UX Design",
  "Editorial Photography",
  "Design Systems",
  "Motion Design",
  "Brand Strategy",
  "Creative Direction",
  "Product Thinking",
];

function PageContent() {
  const { state } = useAgent();
  useRecruiterLayout();

  useEffect(() => {
    if (state.recruiterMode) {
      document.body.classList.add("recruiter-active");
    } else {
      document.body.classList.remove("recruiter-active");
    }
  }, [state.recruiterMode]);

  return (
    <div className="grain">
      <PageLoader />
      <CustomCursor />
      <AgentStatusBar />
      <SessionPersister />
      <Navbar />

      <main>
        <HeroSection />

        {/* Marquee between hero and services */}
        <div className="border-y border-white/5 bg-void">
          <MarqueeStrip items={MARQUEE_ITEMS} speed={55} />
        </div>

        <ServicesSection />
        <AboutSection />
        <StatsSection />

        {/* Experience surfaces first in recruiter mode */}
        {state.recruiterMode && <ExperienceSection />}

        <SkillsSection />
        <ProjectsSection />

        {/* Experience shows after projects in default mode */}
        {!state.recruiterMode && <ExperienceSection />}

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return <PageContent />;
}
