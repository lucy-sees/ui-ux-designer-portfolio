"use client";

import { useEffect } from "react";
import { useAgent } from "@/context/AgentContext";

const SESSION_KEY = "ameli_agent_session";

interface PersistedSession {
  recruiterMode: boolean;
  visitorType: string;
  referralSource: string;
  interactionDepth: number;
  lastVisit: number;
}

export function useSessionPersistence() {
  const { state, dispatch } = useAgent();

  // Restore session from sessionStorage on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const saved: PersistedSession = JSON.parse(raw);

      // Only restore if visited in the last 2 hours
      const twoHours = 2 * 60 * 60 * 1000;
      if (Date.now() - saved.lastVisit > twoHours) return;

      if (saved.recruiterMode) {
        dispatch({ type: "SET_RECRUITER_MODE", value: true });
      }
    } catch {
      // sessionStorage not available
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist session whenever relevant state changes
  useEffect(() => {
    try {
      const data: PersistedSession = {
        recruiterMode:    state.recruiterMode,
        visitorType:      state.visitorType,
        referralSource:   state.referralSource,
        interactionDepth: state.interactionDepth,
        lastVisit:        Date.now(),
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [state.recruiterMode, state.visitorType, state.referralSource, state.interactionDepth]);
}

/** Companion component — renders nothing, just hooks into context */
export function SessionPersister() {
  useSessionPersistence();
  return null;
}
