import React, { useEffect, useRef, useState } from "react";
//Let’s start a conversation — great things often begin with one
// I keep the door open — reach out anytime.
const INTRO_DURATION = 4500;

export default function YellowSection({
  playIntro,
  abortIntro,
  locked,
  onIntroComplete,
}) {
  const [showIntro, setShowIntro] = useState(false);
  const [showConnect, setShowConnect] = useState(false);

  const introTimer = useRef(null);
  const connectTimer = useRef(null);
  const lockTimer = useRef(null);

  // ⭐ CRITICAL FIX — Centralized cleanup
  const clearAllTimers = () => {
    clearTimeout(introTimer.current);
    clearTimeout(connectTimer.current);
    clearTimeout(lockTimer.current);
    introTimer.current = null;
    connectTimer.current = null;
    lockTimer.current = null;
  };

    // If locked, skip intro and directly show final content
  useEffect(() => {
    if (locked) {
      clearAllTimers(); 
      setShowIntro(false);
      setShowConnect(true);  // <---- THIS LINE FIXES EVERYTHING
    }
  }, [locked]);
  // ⭐ PLAY INTRO
  useEffect(() => {
    if (playIntro && !locked) {
      clearAllTimers();        // 🔥 FIX: prevent leftover timers

      setShowIntro(true);
      setShowConnect(false);

      introTimer.current = setTimeout(() => {
        setShowIntro(false);
      }, 2300);

      connectTimer.current = setTimeout(() => {
        setShowConnect(true);
      }, 3000);

      lockTimer.current = setTimeout(() => {
        onIntroComplete?.();
      }, INTRO_DURATION);
    }
  }, [playIntro, locked, onIntroComplete]);

  // ⭐ ABORT INTRO
  useEffect(() => {
    if (abortIntro && !locked) {
      clearAllTimers();        // 🔥 FIX: fully clear queued animation
      setShowIntro(false);
      setShowConnect(false);
    }
  }, [abortIntro, locked]);

  // ⭐ CLEANUP ON UNMOUNT
  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  return (
    <section className="h-dvh w-full bg-yellow-200 relative snap-start snap-always overflow-hidden">

      {/* INTRO */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700
        ${showIntro ? "opacity-100" : "opacity-0"}`}
      >
        <h1 className="text-4xl font-bold">My Yellow Side.</h1>
        <h2 className="text-xl font-semibold">Connection & Opportunity.</h2>
        <p className="text-sm opacity-80 mt-1">Let’s build something together.</p>
      </div>

      {/* CONNECT */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700
        ${showConnect ? "opacity-100" : "opacity-0"}`}
      >
        Connect buttons go here…
      </div>

    </section>
  );
}
