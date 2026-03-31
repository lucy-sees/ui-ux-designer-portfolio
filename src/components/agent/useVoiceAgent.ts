"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type VoiceState = "idle" | "listening" | "processing" | "error";

interface UseVoiceAgentOptions {
  onResult: (transcript: string) => void;
  onStateChange?: (state: VoiceState) => void;
}

// ---------------------------------------------------------------------------
// Minimal local interface — avoids depending on SpeechRecognition being in
// lib.dom.d.ts (it isn't available in all TS/Next versions).
// ---------------------------------------------------------------------------
interface SR {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult:  ((ev: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null;
  onerror:   (() => void) | null;
  onend:     (() => void) | null;
  start():   void;
  stop():    void;
  abort():   void;
}

interface SRConstructor { new(): SR }

function getSR(): SRConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// ---------------------------------------------------------------------------

const COMMAND_MAP: Record<string, string> = {
  "next project":            "show me the next project",
  "show awards":             "show awards and recognition",
  "show clients":            "show client list",
  "activate recruiter mode": "activate recruiter mode",
  "highlight ux work":       "highlight UX design work",
  "show experience":         "show work experience and history",
  "show projects":           "navigate to projects",
  "go home":                 "go back to home",
};

function normalize(raw: string): string {
  const lower = raw.toLowerCase().trim();
  for (const [phrase, mapped] of Object.entries(COMMAND_MAP)) {
    if (lower.includes(phrase)) return mapped;
  }
  return raw;
}

export function useVoiceAgent({ onResult, onStateChange }: UseVoiceAgentOptions) {
  const [voiceState, setVoiceState]   = useState<VoiceState>("idle");
  const [isSupported, setIsSupported] = useState(false);
  const recRef = useRef<SR | null>(null);

  const setState = useCallback(
    (s: VoiceState) => { setVoiceState(s); onStateChange?.(s); },
    [onStateChange]
  );

  useEffect(() => {
    const SRCtor = getSR();
    if (!SRCtor) return;

    setIsSupported(true);
    const rec = new SRCtor();
    rec.continuous     = false;
    rec.interimResults = false;
    rec.lang           = "en-US";

    rec.onresult = (ev) => {
      const raw = ev.results[0][0].transcript;
      onResult(normalize(raw));
      setState("processing");
    };
    rec.onerror = () => setState("error");
    rec.onend   = () => setState("idle");

    recRef.current = rec;
    return () => { recRef.current?.abort(); };
  }, [onResult, setState]);

  const startListening = useCallback(() => {
    if (!recRef.current) return;
    try { recRef.current.start(); setState("listening"); }
    catch { setState("error"); }
  }, [setState]);

  const stopListening = useCallback(() => {
    recRef.current?.stop();
    setState("idle");
  }, [setState]);

  const toggle = useCallback(() => {
    voiceState === "listening" ? stopListening() : startListening();
  }, [voiceState, startListening, stopListening]);

  return { voiceState, isSupported, toggle };
}
