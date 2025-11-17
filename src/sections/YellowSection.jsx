import React, { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    if (playIntro && !locked) {
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

  useEffect(() => {
    if (abortIntro && !locked) {
      setShowIntro(false);
      setShowConnect(false);
      clearTimeout(introTimer.current);
      clearTimeout(connectTimer.current);
      clearTimeout(lockTimer.current);
    }
  }, [abortIntro, locked]);

  return (
    <section className="h-dvh w-full bg-yellow-200 relative snap-start snap-always overflow-hidden">

      {/* INTRO */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700
        ${showIntro ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-4xl font-bold">My Yellow Side.</h1>
        <h2 className="text-xl font-semibold">Connection & Opportunity.</h2>
        <p className="text-sm opacity-80 mt-1">Let’s build something together.</p>
      </div>

      {/* CONNECT */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700
        ${showConnect ? "opacity-100" : "opacity-0"}`}>
        {/* social links / contact */}
        Connect buttons go here…
      </div>

    </section>
  );
}
