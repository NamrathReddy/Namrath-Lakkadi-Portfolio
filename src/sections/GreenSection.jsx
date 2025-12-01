import React, { useEffect, useRef, useState } from "react";
//I believe the best solutions come from collaboration, clarity, and thoughtful decision-making.
const INTRO_DURATION = 3500;

export default function GreenSection({
  playIntro,
  abortIntro,
  locked,
  onIntroComplete,
}) {
  const [showIntro, setShowIntro] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [flipped, setFlipped] = useState([false, false, false, false]);

const pillars = [
  {
    title: "Predictable",
    lines: 
      "I write clean code and build interfaces that behave consistently, avoid surprises, and give users a strong sense of control in every interaction."    
  },
  {
    title: "Collaborative",
    lines: 
      "I work openly with designers, engineers, and stakeholders - communicating clearly and aligning early to build solutions that everyone can trust"
    
  },
  {
    title: "User-Centric",
    lines: "Every decision I make - from layout to motion - starts with considering how it feels for the user interacting with the product"
  },
  {
    title: "Systems Thinking",
    lines: "I understand how each part of a product connects, and I design flows that stay stable, logical, and intuitive from end to end"
  }
];


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

    // If locked, skip intro and directly show final content
  useEffect(() => {
    if (locked) {
      clearAllTimers(); 
      setShowIntro(false);
      setShowContent(true);  // <---- THIS LINE FIXES EVERYTHING
    }
  }, [locked]);
  // ⭐ PLAY INTRO
  useEffect(() => {
    if (playIntro && !locked) {
      clearAllTimers();       // 🔥 Fix: kill old timers before starting a new intro

      setShowIntro(true);
      setShowContent(false);

      introTimer.current = setTimeout(() => {
        setShowIntro(false);
      }, 3000);

      // contentTimer.current = setTimeout(() => {
      //   setShowContent(true);
      // }, 3400);

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

  // ⭐ Auto-flip all cards once after intro ends
useEffect(() => {
  if (showContent) {
    // Disable user clicking during auto-flip
    let clickBlocked = true;

    // Flip all
    setFlipped([true, true, true, true]);

    const timer1 = setTimeout(() => {
      // Flip all back
      setFlipped([false, false, false, false]);
      clickBlocked = false;
    }, 1500); // duration of flipped state

    return () => clearTimeout(timer1);
  }
}, [showContent]);


  return (
    <section className="h-dvh w-full bg-[#D8FFDC] font-serif italic relative snap-start snap-always overflow-hidden">

      {/* INTRO */}
      <div
        className={`absolute inset-0 flex flex-col text-center items-center justify-center transition-opacity duration-700
        ${showIntro ? "opacity-100" : "opacity-0"}`}
      >
        <h1 className="text-4xl font-bold mb-3">My Green Side</h1>
        <p className="text-lg font-semibold mt-1">How I think. How I work. How I help.</p>
      </div>

      {/* CONTENT */}
      <div
        className={`absolute inset-0 transition-opacity duration-700
        ${showContent ? "opacity-100" : "opacity-0"}`}
      >
        
          {/* 2×2 FLIP CARD GRID */}
<div className="h-dvh w-[90%] mx-auto grid grid-cols-1 gap-x-12 place-content-evenly items-center md:grid-cols-2  pb-[10vh]">

  {pillars.map((pillar, idx) => (
    <div
      key={idx}
      className="relative bottom-0 h-[20vh] md:h-[30vh] rounded-xl cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => {
        setFlipped(prev => {
          const copy = [...prev];
          copy[idx] = !copy[idx];
          return copy;
        });
      }}
    >
      {/* Inner Flip Container */}
      <div
        className={`
          absolute inset-0 transition-transform duration-500 
          transform-style-preserve-3d rounded-xl 
          ${flipped[idx] ? "rotate-y-180" : ""}
        `}
      >

        {/* FRONT SIDE */}
        <div className="absolute inset-0 flex items-center justify-center 
                        bg-[#C4FBC9] border-2 border-green-600 rounded-xl
                        shadow-lg
                        shadow-green-400
                        backface-hidden">
          <span className="text-2xl font-bold">{pillar.title}</span>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 bg-green-800 text-white p-6 rounded-xl 
                        shadow-lg shadow-green-300 border-2 border-green-500
                        rotate-y-180 backface-hidden flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
          <p className="space-y-2 text-sm leading-snug">
            {pillar.lines}
          </p>
        </div>

      </div>

    </div>
  ))}

</div>


      </div>

    </section>
  );
}
