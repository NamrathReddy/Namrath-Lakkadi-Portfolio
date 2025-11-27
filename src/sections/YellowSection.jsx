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
        className={`absolute inset-0 transition-opacity duration-700
        ${showConnect ? "opacity-100" : "opacity-0"}`}
      >
        <div className="h-dvh py-[10vh] flex flex-col items-center justify-between">

          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            I keep the door open - reach out anytime.
          </h2>

          <div className="text-center">
            <p>
              Fastest way to reach me
            </p>
            <button className="bg-white/80 border-2 border-black rounded-lg p-3 flex flex-row items-center justify-center">
              <span className="w-7 h-7 flex items-center justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
    viewBox="0 0 24 24"
    stroke="black"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M3.75 4.5h16.5c.414 0 .75.336.75.75v13.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V5.25c0-.414.336-.75.75-.75zm0 0 8.25 6 8.25-6"
    />
  </svg>
</span>

              <span>namrathreddy25@gmail.com</span>
            </button>
          </div>

          <p className="text-xl">Thanks for stopping by.</p>

          <div className="h-[10vh] bg-black text-white flex flex-col justify-center items-center w-full text-center">
                      
              <p>© 2025 Namrath Lakkadi — All rights reserved.</p>
          </div>

        </div>
      </div>

    </section>
  );
}
