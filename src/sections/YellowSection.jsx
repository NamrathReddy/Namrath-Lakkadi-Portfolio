import React, { useEffect, useRef, useState } from "react";
//Let’s start a conversation — great things often begin with one
// I keep the door open — reach out anytime.
const INTRO_DURATION = 3500;

export default function YellowSection({
  playIntro,
  abortIntro,
  locked,
  onIntroComplete,
}) {
  const [showIntro, setShowIntro] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [typedHeading, setTypedHeading] = useState("");
  const [typedSub, setTypedSub] = useState("");
  const headingMessage = "My Yellow Side";
  const subMessage = "Connection & Opportunity";

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
      }, 3000);

      // connectTimer.current = setTimeout(() => {
      //   setShowConnect(true);
      // }, 3000);

      lockTimer.current = setTimeout(() => {
        onIntroComplete?.();
      }, INTRO_DURATION);
    }
  }, [playIntro, locked, onIntroComplete]);

  // TYPEWRITER EFFECT FOR INTRO TEXT
  useEffect(() => {
    if (showIntro) {
      let i1 = 0;
      let i2 = 0;
      let headingInterval;
      let subInterval;
      let subDelay;

      headingInterval = setInterval(() => {
        setTypedHeading(headingMessage.slice(0, i1));
        i1 += 1;

        if (i1 > headingMessage.length) {
          clearInterval(headingInterval);

          subDelay = setTimeout(() => {
            subInterval = setInterval(() => {
              setTypedSub(subMessage.slice(0, i2));
              i2 += 1;

              if (i2 > subMessage.length) clearInterval(subInterval);
            }, 70);
          }, 200);
        }
      }, 70);

      return () => {
        clearInterval(headingInterval);
        clearInterval(subInterval);
        clearTimeout(subDelay);
      };
    }

    setTypedHeading("");
    setTypedSub("");
  }, [showIntro]);

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
    <section className="h-dvh w-full bg-[#FFEFA0] relative snap-start snap-always overflow-hidden font-serif italic">

      {/* INTRO */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700
        ${showIntro ? "opacity-100" : "opacity-0"}`}
      >
        <h1 className="text-4xl font-bold mb-3">
          {showIntro ? typedHeading : typedHeading || headingMessage}
        </h1>
        <h2 className="text-lg font-semibold">
          {showIntro ? typedSub : typedSub || subMessage}
        </h2>
      </div>

      {/* CONNECT */}
      <div
        className={`absolute inset-0 transition-opacity duration-700
        ${showConnect ? "opacity-100" : "opacity-0"}`}
      >
        <div className="h-dvh py-[10dvh] flex flex-col items-center justify-between">

          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            I keep the door open - reach out anytime.
          </h2>

          <div className="text-center font-semibold ">
            <p>
              Fastest way to reach me
            </p>
            <button className="bg-white/80 border-2 border-black rounded-lg p-3 flex flex-row items-center justify-center shadow-lg shadow-black/50 cursor-text">
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

              <span className="font-bold">namrathreddy25@gmail.com</span>
            </button>
          </div>

          <p className="text-xl font-semibold">Thanks for stopping by.</p>

          <div className="h-[10dvh] bg-black text-white flex flex-col justify-center items-center w-full text-center px-1">
                      
              <p>© 2025 Namrath Lakkadi — All rights reserved.</p>
          </div>

        </div>
      </div>

    </section>
  );
}
