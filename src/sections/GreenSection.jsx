import React, { useEffect, useRef, useState } from "react";

const INTRO_DURATION = 5000;

export default function GreenSection({
  playIntro,
  abortIntro,
  locked,
  onIntroComplete,
}) {
  const [showIntro, setShowIntro] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const introTimer = useRef(null);
  const contentTimer = useRef(null);
  const lockTimer = useRef(null);

  // ⭐ CRITICAL FIX — centralized cleanup function
  const clearAllTimers = () => {
    clearTimeout(introTimer.current);
    clearTimeout(contentTimer.current);
    clearTimeout(lockTimer.current);
    introTimer.current = null;
    contentTimer.current = null;
    lockTimer.current = null;
  };

  // ⭐ PLAY INTRO
  useEffect(() => {
    if (playIntro && !locked) {
      clearAllTimers();       // 🔥 Fix: kill old timers before starting a new intro

      setShowIntro(true);
      setShowContent(false);

      introTimer.current = setTimeout(() => {
        setShowIntro(false);
      }, 2800);

      contentTimer.current = setTimeout(() => {
        setShowContent(true);
      }, 3400);

      lockTimer.current = setTimeout(() => {
        onIntroComplete?.();
      }, INTRO_DURATION);
    }
  }, [playIntro, locked, onIntroComplete]);

  // ⭐ ABORT INTRO
  useEffect(() => {
    if (abortIntro && !locked) {
      clearAllTimers();        // 🔥 Fix: fully clear queued animation
      setShowIntro(false);
      setShowContent(false);
    }
  }, [abortIntro, locked]);

  // ⭐ CLEANUP ON UNMOUNT
  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  return (
    <section className="h-dvh w-full bg-green-200 relative snap-start snap-always overflow-hidden">

      {/* INTRO */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000
        ${showIntro ? "opacity-100" : "opacity-0"}`}
      >
        <h1 className="text-4xl font-bold">My Green Side.</h1>
        <h2 className="text-xl font-semibold mt-1">Collaboration & problem solving.</h2>
        <p className="text-sm opacity-80 mt-1">How I think. How I work. How I help.</p>
      </div>

      {/* CONTENT */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000
        ${showContent ? "opacity-100" : "opacity-0"}`}
      >
        collaboration cards go here…
      </div>

    </section>
  );
}
