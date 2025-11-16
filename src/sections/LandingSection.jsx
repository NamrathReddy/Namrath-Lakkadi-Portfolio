import React from "react";
import profileImg from "../assets/download.png";

export default function LandingSection() {
  return (
    <section className="h-dvh flex flex-col bg-gray-950 snap-start">
        {/* Top 2/3 */}
        <div className="border-2 border-black border-solid bg-gray-950 h-2/3 flex flex-col xl:flex-row xl:w-[90%] xl:ml-auto xl:mr-auto items-center xl:items-end justify-center">
            
            {/* Picture and Name part */}
            <div className="border-2 border-black border-solid bg-gray-950 max-h-[40%] xl:max-h-none xl:h-[80%] xl:w-1/3 flex flex-col items-center justify-center bg-gray-950">
                {/* Picture  */}
                <div className="border-2 border-black border-solid bg-gray-950 max-h-[75%] xl:max-h-none pt-1">
                    <img src={profileImg} className="border-2 border-black border-solid w-full h-full rounded-full object-cover"></img>
                </div>
                {/* Name  */}
                    <h3 className="border-2 border-black border-solid text-center text-lg font-bold bg-yellow-400 rounded mt-2 p-1 max-h-[25%] xl:max-h-none">Hi, I'm Namrath Lakkadi</h3>
                
            </div>
            {/* Title, skills and Summary part */}
            <div className="border-2 border-black border-solid  max-h-[60%] xl:max-h-none xl:h-[80%] xl:w-2/3 flex flex-col  justify-center">
                
                    {/* Tite*/}
                    <div className="border-2 border-black border-solid p-1  xl:max-h-none">
                        <h5 className="border-2 border-black border-solid bg-red-400 rounded p-2 text-center text-md xl:text-start w-fit ml-auto mr-auto xl:ml-0">Frontend/FullStack Developer</h5>
                    </div>
                     {/* Skills  */}
                    <div className="border-2 border-black border-solid h-fit  xl:max-h-none flex flex-row justify-center p-1 xl:justify-start text-sm sm:gap-3">
                        <p className="border-2 border-black border-solid bg-blue-400 rounded p-1">React</p>
                        <p className="border-2 border-black border-solid bg-blue-400 rounded p-1">NextJs</p>
                        <p className="border-2 border-black border-solid bg-blue-400 rounded p-1">Tailwind</p>
                        <p className="border-2 border-black border-solid bg-blue-400 rounded p-1">NodeJs</p>
                        <p className="border-2 border-black border-solid bg-blue-400 rounded p-1">SQL</p>
                    </div>
                     {/* Summary  */}
                    <div className="border-2 border-black border-solid p-1 pt-3 max-h-[58%] xl:max-h-none">
                        <p className="border-2 border-black border-solid bg-green-400 rounded text-center text-sm p-1 pt-0 h-full xl:max-h-none hide-scroll-1 hide-scroll-2 overflow-scroll">I care about clarity in my code, impact in my projects, collaboration in my process, and real connection with the people I build for — and with</p>
                    </div>
            </div>
               
                
            </div>
      

      {/* ========================================================= */}
      {/* BOTTOM 1/3 = 33.33dvh                                      */}
      {/* ========================================================= */}
      <div className="h-1/3 w-full bg-[#FDF6E3] flex flex-col items-center pt-6 gap-3">

        {/* ---------------- BLOCK A: 4 Color Buttons ---------------- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="bg-blue-400 rounded px-3 py-1">
                <span className="text-md font-bold block">BLUE</span>
                <span className="text-sm block">Skills & Tech</span>
            </button>
            <button className="bg-red-400 rounded px-3 py-1">
                <span className="text-md font-bold block">RED</span>
                <span className="text-sm block">Projects & Impact</span>
            </button>
            <button className="bg-green-400 rounded px-3 py-1">
                <span className="text-md font-bold block">GREEN</span>
                <span className="text-sm opacity-90 block">My Work Style</span>
            </button>
            <button className="bg-yellow-400 rounded px-3 py-1">
                <span className="text-md font-bold block">YELLOW</span>
                <span className="text-sm block">Connect With Me</span>
            </button>
        </div>

        {/* ---------------- BLOCK B: Explore All Colors ---------------- */}
        <button className="bg-black text-white bg-gray-700 rounded-md px-3 py-1">
          Explore all colors
        </button>
      </div> 
    
    </section>
  );
}
