import React, { useEffect, useRef, useState } from "react";
import profileImg from "../assets/plain5.webp";

const INTRO_DURATION = 4500; // extend if you want the landing to be slower

export default function LandingSection({
  playIntro,
  abortIntro,
  locked,
  onIntroComplete,
  scrollToSection
}) {
  const [showIntro, setShowIntro] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const introTimer = useRef(null);
  const mainTimer = useRef(null);
  const lockTimer = useRef(null);

    // ⭐ FIX: central timer cleanup
const clearAllTimers = () => {
  clearTimeout(introTimer.current);
  clearTimeout(mainTimer.current);
  clearTimeout(lockTimer.current);
  introTimer.current = null;
  mainTimer.current = null;
  lockTimer.current = null;
};

  // If locked, skip intro and directly show final content
useEffect(() => {
  if (locked) {
    clearAllTimers(); 
    setShowIntro(false);
    setShowMain(true);  // <---- THIS LINE FIXES EVERYTHING
  }
}, [locked]);
  // -------------------------------
  // PLAY INTRO SEQUENCE
  // -------------------------------
  useEffect(() => {
    if (playIntro && !locked) {
      clearAllTimers(); // 🔥 FIX: prevent leftover timers
      setShowIntro(true);
      setShowMain(false);

      // Hide intro after 3 seconds
      introTimer.current = setTimeout(() => {
        setShowIntro(false);
      }, 3000);

      // Show landing main content at 3.5 seconds
      mainTimer.current = setTimeout(() => {
        setShowMain(true);
      }, 3500);

      // Mark as complete
      lockTimer.current = setTimeout(() => {
        if (onIntroComplete) onIntroComplete();
      }, INTRO_DURATION);
    }
  }, [playIntro, locked, onIntroComplete]);

  // -------------------------------
  // ABORT SEQUENCE
  // -------------------------------
useEffect(() => {
    if (abortIntro && !locked) {
  clearAllTimers(); // 🔥 FIX: one unified cleanup
  setShowIntro(false);
  setShowMain(false);
}
  }, [abortIntro, locked]);

  // -------------------------------
  // CLEANUP
  // -------------------------------
  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  return (
    <section className="h-dvh w-full bg-black font-semibold snap-start snap-always relative overflow-hidden">

      {/* ===================== INTRO OVERLAY ===================== */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center 
        transition-opacity duration-1000
        ${showIntro ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-md">
          Welcome 👋
        </h1>
        <h2 className="text-lg text-white opacity-90">
          I'm <span className="font-semibold">Namrath Lakkadi</span>
        </h2>
        <p className="text-white opacity-80 mt-2">
          Frontend / Full-Stack Developer
        </p>
      </div>

      {/* ===================== MAIN LANDING CONTENT ===================== */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000
        ${showMain ? "opacity-100" : "opacity-0"}
      `}
      >
        {/* border-2 border-black border-solid */}
        {/* Top 2/3 */}
        <div className="h-[70vh] xl:h-[60vh] flex flex-col xl:flex-row xl:w-[70%] xl:ml-auto xl:mr-auto items-center xl:items-end justify-center">

          {/* Picture and Name */}
          <div className="h-[30vh] xl:h-[50vh] xl:w-1/3 flex flex-col items-center justify-center">
            
            {/* Picture */}
            <div className="">
              <img
                src={profileImg}
                className="ring-4 shadow-[0_0_40px_rgba(255,255,255,0.08)] ring-white/20 w-[25vh] h-[25vh] xl:w-[35vh] xl:h-[35vh] rounded-full object-cover"
              />
            </div>

            
          </div>

          {/* Title, skills and Summary */}
          <div className="xl:pl-10 h-[35vh] xl:h-[50vh] xl:w-2/3 flex flex-col justify-center">
           <div className="h-[35vh] xl:h-[35vh] flex flex-col justify-between">
            {/* Name */}
            <h3 className="w-fit h-[5vh] leading-[5vh] mx-auto xl:ml-0 px-2  text-center text-lg bg-[#FFEFA0] rounded ">
              Hi, I'm Namrath
            </h3>
            {/* Title */}
            
              <h5 className="mx-auto h-[5vh] leading-[5vh]  py-auto xl:ml-0 px-2 bg-[#FFD3D3] rounded text-center text-md w-fit">
                Frontend/FullStack Developer
              </h5>
            

            {/* Skills */}
            <div className="h-[4vh] flex flex-row justify-evenly md:justify-center xl:justify-start items-center text-sm md:gap-3">
              <p className=" bg-[#B5D7FF] rounded px-2 leading-[4vh]  h-[4vh]">React</p>
              <p className=" bg-[#B5D7FF] rounded px-2 leading-[4vh]  h-[4vh]">NextJs</p>
              <p className=" bg-[#B5D7FF] rounded px-2 leading-[4vh]  h-[4vh]">Tailwind</p>
              <p className=" bg-[#B5D7FF] rounded px-2 leading-[4vh]  h-[4vh]">NodeJs</p>
              <p className=" bg-[#B5D7FF] rounded px-2 leading-[4vh]  h-[4vh]">SQL</p>
            </div>

            {/* Summary */}
            {/* bg-[#C4FBC9] */}
            {/* had to put px-1 for 12-pro instead of px-2 for all */}
            <div className="max-sm:h-[18vh] h-[15vh]  max-xl:mx-1 px-1 sm:px-2 bg-[#C4FBC9]  rounded text-center text-lg flex flex-col justify-center items-center xl:items-start xl:text-start">
              <p className="">
                I care about clarity in my code, impact in my projects,
                collaboration in my process, and real connection with the people I
                build for, and with.
              </p>
            </div>
              
            
           </div>
          </div>
        </div>
 
        {/* Bottom */}
        {/* bg-[#FFF7E6]/80  */}
        <div className="h-[30vh] xl:h-[40vh] w-full bg-[#FFF9ED]/90  flex flex-col items-center justify-start pt-[2vh] md:pt-[5vh] gap-[2vh]">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[2vh]">
            <button className="
       bg-[#CFE4FF]
       hover:bg-[#B5D7FF] 
       border border-[#6AA8FF]
       rounded-xl 
       shadow-[0_2px_6px_rgba(0,0,0,0.1)]
       hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]
       hover:-translate-y-[5px]
       transition-all duration-200 
       px-2 py-[.25vh]" onClick={() => scrollToSection(1)}>
              <span className="text-md font-bold block">BLUE</span>
              <span className="text-sm block">Skills & Tech</span>
            </button>
            <button className="bg-[#FFD3D3] 
       hover:bg-[#FFBFBF] 
       border border-[#FF8A8A]
       rounded-xl 
       shadow-[0_2px_6px_rgba(0,0,0,0.1)]
       hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]
       hover:-translate-y-[5px]
       transition-all duration-200 px-2 py-[.25vh]" onClick={() => scrollToSection(2)}>
              <span className="text-md font-bold block">RED</span>
              <span className="text-sm block">Projects & Impact</span>
            </button>
            <button className="bg-[#D8FFDC] 
       hover:bg-[#C4FBC9] 
       border border-[#74D88A]
       rounded-xl 
       shadow-[0_2px_6px_rgba(0,0,0,0.1)]
       hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]
       hover:-translate-y-[5px]
       transition-all duration-200 px-2 py-[.25vh]" onClick={() => scrollToSection(3)}>
              <span className="text-md font-bold block">GREEN</span>
              <span className="text-sm block">My Work Style</span>
            </button>
            <button className="bg-[#FFF2B8] 
       hover:bg-[#FFEFA0] 
       border border-[#E6C653]
       rounded-xl 
       shadow-[0_2px_6px_rgba(0,0,0,0.1)]
       hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]
       hover:-translate-y-[5px]
       transition-all duration-200  px-2 py-[.25vh]" onClick={() => scrollToSection(4)}>
              <span className="text-md font-bold block">YELLOW</span>
              <span className="text-sm block">Connect With Me</span>
            </button>
          </div>

          <button className="text-white bg-gray-700 px-2 py-[1vh]
          hover:bg-gray-900
          rounded-xl 
       shadow-[0_2px_6px_rgba(0,0,0,0.1)]
       hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]
       hover
       hover:-translate-y-[5px]
       transition-all duration-200
          " onClick={() => scrollToSection(1)}>
            Explore all colors
          </button>
        </div>
      </div>

    </section>
  );
}
