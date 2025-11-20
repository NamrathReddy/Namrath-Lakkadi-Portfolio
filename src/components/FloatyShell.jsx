import React, { useEffect, useState } from "react";

const sectionConfig = [
  { id: "landing", label: "Over view", type: "landing", bgClass: "bg-[#FDF6E3]" },
  { id: "blue", label: "Skills & Tech", type: "color", bgClass: "bg-blue-600" },
  { id: "red", label: "Projects & Impact", type: "color", bgClass: "bg-red-600" },
  { id: "green", label: "My Work Style", type: "color", bgClass: "bg-green-600" },
  { id: "yellow", label: "Connect With Me", type: "color", bgClass: "bg-yellow-500" },
];
let noAnimations= false;
export default function FloatyShell({
  currentSectionIndices,
  scrollToSection,
  locked,
  disableAnimations
}) {
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
    : isOpen ? "X" : "^"; //◎

  const containerClass = [
    "fixed w-full transition-all duration-700 ease-out overflow-hidden z-20",
    (locked&& currentSectionIndices.length===1)? "opacity-100" : "opacity-0 top-full",
    isOpen ? "top-0 h-screen bg-[#FDF6E3]" : `top-[90vh] h-[10vh] ${currentConfig.bgClass}`,
  ].join(" ");

  function LandingExpanded() {
    return (
      <div className="h-full px-4 pt-4 pb-20 xl:pb-4 text-sm md:text-base flex flex-col justify-center items-center"
      onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3 className="font-semibold mb-2">Why 4 Colors?</h3>
        <p className="mb-2">
          Communication theory groups people into four color styles — Blue,
          Green, Yellow, and Red. Each reflects how someone prefers to think,
          collaborate, and decide.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Blue</strong> — precise, analytical, detail-driven.</li>
          <li><strong>Green</strong> — supportive, calm, people-first.</li>
          <li><strong>Yellow</strong> — optimistic, energetic, visionary.</li>
          <li><strong>Red</strong> — decisive, bold, action-focused.</li>
        </ul>
        <p className="mt-3">
          My portfolio uses these four colors to show different sides of how I think and work.
        </p>
        <p>To disable intro animations click "⏹️"</p>
        <button 
          className="border border-2 border-black p-1 rounded-full mt-[10vh]"
          >X</button>
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
              className= {` ${index === mainIndex?"text-white":"text-black"} px-3 py-2 font-medium shadow-sm hover:bg-white rounded-full w-full md:h-[5vh] md:w-1/2 ${cfg.bgClass}`}
            >
              {cfg.label}
            </button>
          ))}
          <button 
          onClick={() => setIsOpen((prev) => !prev)}
          className="border border-2 border-black p-1 rounded-full h-12 w-12 mt-12"
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
            className="flex justify-between text-3xl h-full">
              <button onClick={()=> {
                noAnimations=!noAnimations;
                if(noAnimations){
                  const yes = window.confirm("Disable Intro animations?");
                if (!yes) return; 
                }
                disableAnimations(noAnimations);
              }
              }>{noAnimations?"▶️":"⏹️"}</button>
              <button onClick={() => setIsOpen((prev) => !prev)}
                >?</button>
            </div>)
          ): (isOpen?
            (<ColorExpanded />)
            :
            (<div 
            onClick={() => setIsOpen((prev) => !prev)}
            className= "flex flex-col items-center text-2xl h-full">
              <h1>^</h1>
              <h1 className="text-center text-white">
                {currentConfig.label}
              </h1>
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
