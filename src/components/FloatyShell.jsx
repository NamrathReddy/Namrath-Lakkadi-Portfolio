import React, { useEffect, useState } from "react";

const sectionConfig = [
  { id: "landing", label: "Over view", type: "landing", bgClass: "bg-slate-300"},
  { id: "blue", label: "Skills & Tech", type: "color", bgClass: "bg-blue-600" },
  { id: "red", label: "Projects & Impact", type: "color", bgClass: "bg-red-600" },
  { id: "green", label: "My Work Style", type: "color", bgClass: "bg-green-600" },
  { id: "yellow", label: "Connect With Me", type: "color", bgClass: "bg-yellow-500" },
];
// let noAnimations= false;
export default function FloatyShell({
  currentSectionIndices,
  scrollToSection,
  locked,
  // disableAnimations
}) {
    //temporarily disabling animations
  // disableAnimations(true);
  const [isOpen, setIsOpen] = useState(false);


  // primary index (first intersecting section)
  const mainIndex = currentSectionIndices[0] ?? 0;

  const isLanding = mainIndex === 0;
  const currentConfig = sectionConfig[mainIndex];

  // auto-close when section changes
  useEffect(() => {
    setIsOpen(false);
  }, [mainIndex]);

  const floatyIcon = isLanding
    ? isOpen ? "X" : "?"
    : isOpen ? "X" : "▲"; //◎

  const containerClass = [
    "fixed w-full transition-all duration-700 ease-out overflow-hidden z-20 text-white",
    (locked&& currentSectionIndices.length===1)? "opacity-100" : "opacity-0 top-full",
    isOpen ? "top-0 h-screen bg-black" : isLanding? "top-[95vh] h-[5vh]" :`top-[90vh] h-[10vh] ${currentConfig.bgClass}`,
  ].join(" ");

  function LandingExpanded() {
    return (
      <div className="h-dvh flex flex-col justify-center items-center">
        <div className="h-[80%] w-[80%] bg-[#FFF9ED] p-3 rounded-lg text-center text-black text-sm flex flex-col justify-center items-center"
      onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3 className="font-semibold mb-2">Why 4 Colors?</h3>
        <p className="mb-2">
          Communication theory groups people into four color styles — Blue,
          Green, Yellow, and Red. Each reflects how someone prefers to think,
          collaborate, and decide.
        </p>
        <ul className="list-disc list-inside text-start space-y-1">
          <li className="bg-[#6AA8FF] py-1 px-2 rounded-lg"><strong>Blue</strong> — precise, analytical, detail-driven...</li>
          <li className="bg-[#FF8A8A] py-1 px-2 rounded-lg"><strong>Red</strong> — decisive, bold, action-focused...</li>
          <li className="bg-[#74D88A] py-1 px-2 rounded-lg"><strong>Green</strong> — supportive, calm, people-first...</li>
          <li className="bg-[#E6C653] py-1 px-2 rounded-lg"><strong>Yellow</strong> — optimistic, energetic, visionary...</li>
        </ul>
        <p className="mt-3">
         I'm a Blue in how I learn. Green in how I work. Red in how I achieve. Yellow in how I interact.
        </p>
        {/* <p>To disable intro animations click "⏹️"</p> */}
        <button 
          className="bg-black text-white border-2 p-1 h-12 w-12 rounded-full mt-[10vh]"
          >X</button>
      </div>
      </div>
      
    );
  }

  function ColorExpanded() {
    // const otherSections = sectionConfig
    //   .map((c, i) => ({ ...c, index: i }))
    //   .filter((c) => c.type === "color" && c.index !== mainIndex);

    return (
      // <div className="h-full px-4 pt-4 pb-20 xl:pb-4 flex flex-col gap-3 text-white">
      //   <h3 className="font-semibold">Jump to another perspective:</h3>
      
        <div className="h-full flex flex-col gap-6 p-6 justify-center items-center">
          {sectionConfig.map((cfg,index) => (
            <button
              key={cfg.id}
              disabled={index === mainIndex}
              onClick={() => {
                scrollToSection(index);
                setIsOpen(false);
              }}
              className= {` ${index === mainIndex?"text-white bg-slate-600":"text-black hover:bg-white"} font-semibold px-3 py-2 font-medium shadow-sm  rounded-full w-full md:h-[5vh] md:w-1/2 ${cfg.bgClass}`}
            >
              {cfg.label}
            </button>
          ))}
          <button 
          onClick={() => setIsOpen((prev) => !prev)}
          className=" bg-slate-600 p-1 rounded-full h-12 w-12 mt-12"
          >X</button>
        </div>
    );
  }

  return (
    <>
      {/* EXPANDING CONTAINER */}
      <div className={containerClass}>
        {
          // ? (isLanding ? <LandingExpanded /> : <ColorExpanded />)
          isLanding ?(
            isOpen?
            (<LandingExpanded />)
            :
            (<div 
            className="flex flex-row justify-end items-start h-full">
              {/* <button onClick={()=> {
                noAnimations=!noAnimations;
                if(noAnimations){
                  const yes = window.confirm("Disable Intro animations?");
                if (!yes) return; 
                }
                disableAnimations(noAnimations);
              }
              }>{noAnimations?"▶️":"⏹️"}</button> */}
              <button onClick={() => setIsOpen((prev) => !prev)}
                >
                  <span className="bg-gray-600 text-black text-sm h-5 w-5 px-2 py-1 mr-2 rounded-full">?</span>
                  </button>
            </div>)
          ): (isOpen?
            (<ColorExpanded />)
            :
            (<div 
            onClick={() => setIsOpen((prev) => !prev)}
            className= "flex flex-col justify-center items-center text-2xl h-full text-center text-white">
              
              <h1 >
                {currentConfig.label}
              </h1>
              <h1 className="leading-[2vh] h-[2vh] text-2xl">︿</h1> 
              {/* ▲ */}
            </div>)
            
            )}
      </div>

      {/* FLOATY BUTTON */}
      {/* <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={[
          (locked && currentSectionIndices.length===1) ? "opacity-100" : "opacity-0",
          "fixed z-30 bottom-[2vh] right-[5vw]",
          "h-12 w-12 rounded-full flex items-center justify-center",
          "bg-black text-white shadow-lg border border-white/40",
          "transition-transform duration-200 active:scale-95",
        ].join(" ")}
      >
        <span className="text-xl font-bold">{floatyIcon}</span> */}
        {/* instead of color wheel show a simple " ^ " icon and make the container full screen and show all section buttons including "over view(landing page) 
        and make the container full-width even on the landing page,
        and onClick of colored sections only make it same as onClick of " ^ " i.e, full screen container open even when clicked anywhere on the container
        "*/}
      {/* </button> */}
    </>
  );
}
