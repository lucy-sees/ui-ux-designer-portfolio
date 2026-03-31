"use client";

import { useEffect, useRef, useState } from "react";
import { useAgent } from "@/context/AgentContext";

const INTENT_LABELS: Record<string, string> = {
  navigate_projects:      "→ Projects",
  navigate_awards:        "→ Awards",
  navigate_clients:       "→ Clients",
  highlight_featured:     "↑ Featured Work",
  show_experience:        "→ Experience",
  activate_recruiter_mode:"⚡ Recruiter Mode",
  activate_creative_mode: "✦ Creative Mode",
  unknown:                "? Unknown intent",
};

export default function AgentStatusBar() {
  const { state } = useAgent();
  const [visible, setVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!state.lastResponse) return;
    const label = INTENT_LABELS[state.lastResponse.intent] ?? state.lastResponse.intent;
    const conf  = Math.round(state.lastResponse.confidence * 100);
    setDisplayText(`${label} · ${conf}% confidence`);
    setVisible(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timerRef.current);
  }, [state.lastResponse]);

  // Also show while streaming
  useEffect(() => {
    if (state.isStreaming) { setVisible(true); setDisplayText("Processing…"); }
  }, [state.isStreaming]);

  return (
    <div
      aria-live="polite"
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-500 pointer-events-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3 mt-2 px-5 py-2 rounded-full glass border border-white/10 shadow-glass">
        {/* Pulsing dot */}
        <span className="relative flex h-1.5 w-1.5">
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
            state.isStreaming ? "bg-agent-green" : "bg-primary-fixed"
          }`} />
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            state.isStreaming ? "bg-agent-green" : "bg-primary-fixed"
          }`} />
        </span>

        <span className="font-mono text-xs uppercase tracking-widest text-surface/60">
          {state.isStreaming ? (
            <span className="flex items-center gap-1">
              Agent
              <span className="inline-flex gap-0.5">
                {[0,1,2].map(i => (
                  <span
                    key={i}
                    className="inline-block w-0.5 h-2 bg-agent-green rounded-full"
                    style={{ animation: `barPulse 0.8s ${i * 0.15}s ease-in-out infinite` }}
                  />
                ))}
              </span>
            </span>
          ) : displayText}
        </span>

        {/* Tone badge */}
        {!state.isStreaming && state.currentTone !== "neutral" && (
          <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
            state.currentTone === "structured"
              ? "bg-agent-green/10 text-agent-green border-agent-green/20"
              : "bg-agent-purple/10 text-agent-purple border-agent-purple/20"
          }`}>
            {state.currentTone}
          </span>
        )}

        {/* Recruiter chip */}
        {state.recruiterMode && (
          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-agent-green/10 text-agent-green border border-agent-green/20">
            Recruiter
          </span>
        )}
      </div>

      <style jsx global>{`
        @keyframes barPulse {
          0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
          50%       { transform: scaleY(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
