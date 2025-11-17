import React, { useEffect, useRef, useState } from "react";

const INTRO_DURATION = 4200;

export default function RedSection({
  playIntro,
  abortIntro,
  locked,
  onIntroComplete,
}) {
  const [showIntro, setShowIntro] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const introTimer = useRef(null);
  const projectsTimer = useRef(null);
  const lockTimer = useRef(null);

  useEffect(() => {
    if (playIntro && !locked) {
      setShowIntro(true);
      setShowProjects(false);

      introTimer.current = setTimeout(() => {
        setShowIntro(false);
      }, 2000);

      projectsTimer.current = setTimeout(() => {
        setShowProjects(true);
      }, 2600);

      lockTimer.current = setTimeout(() => {
        onIntroComplete?.();
      }, INTRO_DURATION);
    }
  }, [playIntro, locked, onIntroComplete]);

  useEffect(() => {
    if (abortIntro && !locked) {
      setShowIntro(false);
      setShowProjects(false);

      clearTimeout(introTimer.current);
      clearTimeout(projectsTimer.current);
      clearTimeout(lockTimer.current);
    }
  }, [abortIntro, locked]);

  return (
    <section className="h-dvh w-full bg-red-200 relative snap-start snap-always overflow-hidden">

      {/* INTRO */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700
        ${showIntro ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-4xl font-bold">My Red Side.</h1>
        <h2 className="text-xl font-semibold mt-1">Execution. Delivery. Impact.</h2>
        <p className="text-sm mt-2 opacity-80">Projects that moved the needle.</p>
      </div>

      {/* PROJECTS */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700
        ${showProjects ? "opacity-100" : "opacity-0"}`}>
        {/* your project cards */}
        project cards go here…
      </div>
    </section>
  );
}
