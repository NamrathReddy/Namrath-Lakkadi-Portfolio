import React, { useEffect, useRef, useState } from "react";
import profileImg from "../assets/download.png";

const INTRO_DURATION = 1500; // ms — MUST match Tailwind keyframe duration

export default function LandingSection({
  playIntro,
  abortIntro,
  locked,
  onIntroComplete,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  //-------------------------------
  // START ANIMATION
  //-------------------------------
  useEffect(() => {
    if (playIntro && !locked) {
      setIsAnimating(true);

      // Clear any old timer
      if (timerRef.current) clearTimeout(timerRef.current);

      // After animation duration → mark complete
      timerRef.current = setTimeout(() => {
        setIsAnimating(false);
        if (onIntroComplete) onIntroComplete();
      }, INTRO_DURATION);
    }
  }, [playIntro, locked, onIntroComplete]);

  //-------------------------------
  // ABORT ANIMATION
  //-------------------------------
  useEffect(() => {
    if (abortIntro && !locked) {
      setIsAnimating(false);

      // Stop timer
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [abortIntro, locked]);

  //-------------------------------
  // CLEANUP ON UNMOUNT
  //-------------------------------
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section
      className={`h-dvh flex flex-col bg-gray-400 snap-start snap-always 
        ${isAnimating ? "animate-intro" : ""}
      `}
    >
      {/* Top 2/3 */}
      <div className="border-2 border-black border-solid bg-gray-400 h-2/3 flex flex-col xl:flex-row xl:w-[90%] xl:ml-auto xl:mr-auto items-center xl:items-end justify-center">

        {/* Picture and Name */}
        <div className="border-2 border-black border-solid bg-gray-400 max-h-[40%] xl:max-h-none xl:h-[80%] xl:w-1/3 flex flex-col items-center justify-center">
          
          {/* Picture */}
          <div className="border-2 border-black border-solid bg-gray-400 max-h-[75%] xl:max-h-none pt-1">
            <img
              src={profileImg}
              className="border-2 border-black border-solid w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Name */}
          <h3 className="border-2 border-black border-solid text-center text-lg font-bold bg-yellow-200 rounded mt-2 p-1 max-h-[25%] xl:max-h-none">
            Hi, I'm Namrath Lakkadi
          </h3>
        </div>

        {/* Title, skills and Summary */}
        <div className="border-2 border-black border-solid max-h-[60%] xl:max-h-none xl:h-[80%] xl:w-2/3 flex flex-col justify-center">

          {/* Title */}
          <div className="border-2 border-black border-solid p-1 xl:max-h-none">
            <h5 className="border-2 border-black border-solid bg-red-200 rounded p-2 text-center text-md xl:text-start w-fit ml-auto mr-auto xl:ml-0">
              Frontend/FullStack Developer
            </h5>
          </div>

          {/* Skills */}
          <div className="border-2 border-black border-solid h-fit xl:max-h-none flex flex-row justify-center p-1 xl:justify-start text-sm sm:gap-3">
            <p className="border-2 border-black border-solid bg-blue-200 rounded p-1">React</p>
            <p className="border-2 border-black border-solid bg-blue-200 rounded p-1">NextJs</p>
            <p className="border-2 border-black border-solid bg-blue-200 rounded p-1">Tailwind</p>
            <p className="border-2 border-black border-solid bg-blue-200 rounded p-1">NodeJs</p>
            <p className="border-2 border-black border-solid bg-blue-200 rounded p-1">SQL</p>
          </div>

          {/* Summary */}
          <div className="border-2 border-black border-solid p-1 pt-3 max-h-[58%] xl:max-h-none">
            <p className="border-2 border-black border-solid bg-green-200 rounded text-center text-sm p-1 pt-0 h-full xl:max-h-none hide-scroll-1 hide-scroll-2 overflow-scroll">
              I care about clarity in my code, impact in my projects,
              collaboration in my process, and real connection with the people I
              build for — and with
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="h-1/3 w-full bg-[#FDF6E3] flex flex-col items-center pt-6 gap-3">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="bg-blue-200 rounded px-3 py-1">
            <span className="text-md font-bold block">BLUE</span>
            <span className="text-sm block">Skills & Tech</span>
          </button>
          <button className="bg-red-200 rounded px-3 py-1">
            <span className="text-md font-bold block">RED</span>
            <span className="text-sm block">Projects & Impact</span>
          </button>
          <button className="bg-green-200 rounded px-3 py-1">
            <span className="text-md font-bold block">GREEN</span>
            <span className="text-sm block">My Work Style</span>
          </button>
          <button className="bg-yellow-200 rounded px-3 py-1">
            <span className="text-md font-bold block">YELLOW</span>
            <span className="text-sm block">Connect With Me</span>
          </button>
        </div>

        <button className="text-white bg-gray-700 rounded-md px-3 py-1">
          Explore all colors
        </button>
      </div>

      {/* Sentinel is now irrelevant */}
      <div className="w-full" data-sentinel="1"></div>
    </section>
  );
}