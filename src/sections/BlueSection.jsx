import React, { useEffect, useRef, useState } from "react";

const INTRO_DURATION = 5000; // 🔥 New total duration (5 seconds)

export default function BlueSection({
  playIntro,
  abortIntro,
  locked,
  onIntroComplete,
}) {
  const [showIntro, setShowIntro] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  const introTimer = useRef(null);
  const skillsTimer = useRef(null);
  const lockTimer = useRef(null);

  // PLAY INTRO
  useEffect(() => {
    if (playIntro && !locked) {
      setShowIntro(true);
      setShowSkills(false);

      // 🔥 Fade out intro later (3 seconds)
      introTimer.current = setTimeout(() => {
        setShowIntro(false);
      }, 3000);

      // 🔥 Fade in skills at 4 seconds
      skillsTimer.current = setTimeout(() => {
        setShowSkills(true);
      }, 4000);

      // 🔥 Lock after full duration
      lockTimer.current = setTimeout(() => {
        if (onIntroComplete) onIntroComplete();
      }, INTRO_DURATION);
    }
  }, [playIntro, locked, onIntroComplete]);

  // ABORT
  useEffect(() => {
    if (abortIntro && !locked) {
      setShowIntro(false);
      setShowSkills(false);

      clearTimeout(introTimer.current);
      clearTimeout(skillsTimer.current);
      clearTimeout(lockTimer.current);
    }
  }, [abortIntro, locked]);

  // CLEANUP
  useEffect(() => {
    return () => {
      clearTimeout(introTimer.current);
      clearTimeout(skillsTimer.current);
      clearTimeout(lockTimer.current);
    };
  }, []);

  return (
    <section className="h-dvh w-full bg-blue-200 relative overflow-hidden snap-start snap-always">

      {/* INTRO */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 
          ${showIntro ? "opacity-100" : "opacity-0"}
        `}
      >
        <h1 className="text-4xl font-bold mb-2">My Blue Side.</h1>
        <h2 className="text-2xl font-semibold mb-1">Depth and expertise.</h2>
        <p className="text-md opacity-80">The foundation of my technical skills.</p>
      </div>

      {/* SKILLS */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 
          ${showSkills ? "opacity-100" : "opacity-0"}
        `}
      >
        cards go here...
      </div>

    </section>
  );
}
