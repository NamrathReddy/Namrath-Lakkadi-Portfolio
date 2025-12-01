import React, { useEffect, useRef, useState } from "react";
//I turn complex technical challenges into clean, high-impact solutions
//I aim to maximize impact and improve performance, without losing sight of deadlines.
//keep the above statement constant on bottom of the screen and but the scroll should work normally, i think we can make it work by putting all the projects in one conatiner and make it scrollable but put the statement in seperate container
const INTRO_DURATION = 3500;
const projectsConfig = [
  {
    project: "Health Console Dashboard",
    type: "Professional",
    problem:
      "CS teams lacked a unified view of client health metrics, causing slow decision-making and scattered workflows.",
    action:
      `
      ➤ Built the Health Overview dashboard, Accounts List, and module drill-downs using Next.js + TypeScript + Tailwind.
      ➤ Implemented Saved Views, filters, search, and autosave notes. 
      ➤ Added adoption charts with Recharts, integrated NextAuth SSO with RBAC, and optimized performance using RSC, route-level code splitting, and debounced API requests.`,
    impact:
      `
      ➤ Improved load performance by 25–35% LCP and ~30% faster dashboard loads. 
      ➤ Enabled 200+ users to make quicker, more accurate client-health decisions.`
  },

  {
    project: "iEvolve LMS Modernization",
    type: "Professional",
    problem:
      "The internal LMS was slow, inconsistent, and built on legacy technology, affecting millions of global learners.",
    action:
      `
      ➤ Migrated core training modules to React.js, rebuilt Explore page with debounced search and URL-persisted filters. 
      ➤ Added i18n and accessibility fixes, standardized loading/error states, and implemented large CSV/XLSX exports using a streaming backend.`,
    impact:
      `
      ➤ Achieved ~25% faster page loads, reduced development effort by ~20% through reusable components. 
      ➤ Resolved 35+ UI issues for a smoother global rollout.`
  },

  {
    project: "Green Frames — Nature Storytelling App",
    type: "Personal",
    problem:
      "Nature photos are often shared without context or narrative, lacking a meaningful, calming storytelling experience.",
    action:
      `
      ➤ Built a responsive gallery using HTML, Tailwind, and JavaScript with vertical post navigation, full-screen viewer, smooth animations. 
      ➤ Preloading, lazy loading and Cloudinary integration for optimized image delivery.`,
    impact:
      "Created a polished, high-performance storytelling platform that showcases strong UI engineering, animations, caching strategy, and optimized image handling."
  },
];

function Card({ projectName, type, problem, action, impact }) {
  return (
    <div className="h-dvh md:h-auto pb-[10vh] md:pb-0 max-sm:snap-start flex flex-col justify-center items-center w-full">
    <div className="bg-red-100 h-fit rounded-xl border border-red-200 shadow-lg shadow-red-300 pb-2 w-[80%]">
      {/* Title */}
      <h3 className="text-red-700 font-semibold px-2 py-1 text-lg">{projectName}</h3>
      <p className="text-sm text-gray-700 px-2 mb-2"><span className="font-semibold text-red-800">Type: </span>{type}</p>

      {/* Body */}
      <div className="grid grid-cols-1 gap-1">
        <p className="text-sm bg-white/80 backdrop-blur-sm rounded-lg shadow-sm px-3 py-1"><span className="font-semibold text-red-600">Problem:</span> {problem}</p>
        <p className="text-sm bg-white/80 backdrop-blur-sm rounded-lg shadow-sm px-3 py-1 whitespace-pre-line"><span className="font-semibold text-red-600">Actions:</span> {action}</p>
        <p className="text-sm bg-white/80 backdrop-blur-sm rounded-lg shadow-sm px-3 py-1 whitespace-pre-line"><span className="font-semibold text-red-600">Impact:</span> {impact}</p>
      </div>
    </div>
    </div>
  );
}


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

  // ⭐ CRITICAL FIX — central cleanup
  const clearAllTimers = () => {
    clearTimeout(introTimer.current);
    clearTimeout(projectsTimer.current);
    clearTimeout(lockTimer.current);
    introTimer.current = null;
    projectsTimer.current = null;
    lockTimer.current = null;
  };

  // If locked, skip intro and directly show final content
useEffect(() => {
  if (locked) {
    clearAllTimers(); 
    setShowIntro(false);
    setShowProjects(true);  // <---- THIS LINE FIXES EVERYTHING
  }
}, [locked]);

  // ⭐ PLAY INTRO
  useEffect(() => {
    if (playIntro && !locked) {
      clearAllTimers(); // 🔥 prevent leftover timers from previous intro

      setShowIntro(true);
      setShowProjects(false);

      introTimer.current = setTimeout(() => {
        setShowIntro(false);
      }, 3000);

      // projectsTimer.current = setTimeout(() => {
      //   setShowProjects(true);
      // }, 2600);

      lockTimer.current = setTimeout(() => {
        onIntroComplete?.();
      }, INTRO_DURATION);
    }
  }, [playIntro, locked, onIntroComplete]);

  // ⭐ ABORT INTRO
  useEffect(() => {
    if (abortIntro && !locked) {
      clearAllTimers();
      setShowIntro(false);
      setShowProjects(false);
    }
  }, [abortIntro, locked]);

  // ⭐ CLEANUP on unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  return (
    <section className="h-dvh w-full bg-red-200 relative snap-start snap-always overflow-hidden">

      {/* INTRO */}
      <div
        className={`absolute inset-0 font-serif italic flex flex-col items-center justify-center transition-opacity duration-700 
        ${showIntro ? "opacity-100 " : "opacity-0"}`}
      >
        <h1 className="text-4xl font-bold mb-3">My Red Side</h1>
        <h2 className="text-lg font-semibold mt-1">Execution. Delivery. Impact.</h2>
      </div>

      {/* PROJECTS */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 snap-y snap-mandatory
        ${showProjects ? "opacity-100 overflow-scroll " : "opacity-0"}`}
      >
        <div className="grid grid-cols-1">
          <div className="md:h-dvh md:pb-[10vh] flex flex-col justify-evenly items-center md:snap-start">
            <Card projectName={projectsConfig[0].project} type={projectsConfig[0].type} problem={projectsConfig[0].problem} action={projectsConfig[0].action} impact={projectsConfig[0].impact}></Card>
            <Card projectName={projectsConfig[1].project} type={projectsConfig[1].type} problem={projectsConfig[1].problem} action={projectsConfig[1].action} impact={projectsConfig[1].impact}></Card>
          </div>
           
          <div className="md:h-dvh flex flex-col justify-end items-center md:snap-start">
            <div className="md:h-[80vh] flex flex-col justify-center">
              <Card projectName={projectsConfig[2].project} type={projectsConfig[2].type} problem={projectsConfig[2].problem} action={projectsConfig[2].action} impact={projectsConfig[2].impact}><div className="snap-start"></div></Card>
            </div>
            
            <div className="h-dvh bg-[#FFBFBF] w-full md:h-[20vh] pb-[10vh] flex flex-col justify-center  items-center max-sm:snap-start">
              <div className="md:h-[10vh] flex flex-col justify-center">
                <h1 className="text-center font-serif italic text-xl font-medium px-2">I aim to maximize impact and improve performance, without losing sight of deadlines.</h1>
              </div>
            </div>
          </div>
          
        </div>
      </div>

    </section>
  );
}
