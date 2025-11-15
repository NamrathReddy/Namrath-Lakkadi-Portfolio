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
                    <h3 className="border-2 border-black border-solid text-center text-lg font-bold bg-[#FFFFF0] rounded mt-2 p-1 max-h-[25%] xl:max-h-none">Hi, I'm Namrath Lakkadi</h3>
                
            </div>
            {/* Title, skills and Summary part */}
            <div className="border-2 border-black border-solid  max-h-[60%] xl:max-h-none xl:h-[80%] xl:w-2/3 flex flex-col  justify-center">
                
                    {/* Tite*/}
                    <div className="border-2 border-black border-solid p-1 max-h-[23%] xl:max-h-none">
                        <h5 className="border-2 border-black border-solid bg-[#FFFFF0] rounded p-2 text-center text-md xl:text-start w-fit ml-auto mr-auto xl:ml-0">Frontend/FullStack Developer</h5>
                    </div>
                     {/* Skills  */}
                    <div className="border-2 border-black border-solid h-fit max-h-[20%] xl:max-h-none flex flex-row justify-center p-1 xl:justify-start text-sm sm:gap-3">
                        <p className="border-2 border-black border-solid bg-[#FFFFF0] rounded p-1">React</p>
                        <p className="border-2 border-black border-solid bg-[#FFFFF0] rounded p-1">NextJs</p>
                        <p className="border-2 border-black border-solid bg-[#FFFFF0] rounded p-1">Tailwind</p>
                        <p className="border-2 border-black border-solid bg-[#FFFFF0] rounded p-1">NodeJs</p>
                        <p className="border-2 border-black border-solid bg-[#FFFFF0] rounded p-1">SQL</p>
                    </div>
                     {/* Summary  */}
                    <div className="border-2 border-black border-solid p-1 pt-3 max-h-[58%] xl:max-h-none">
                        <p className="border-2 border-black border-solid bg-[#FFFFF0] rounded text-center text-sm p-1 pt-0 h-full xl:max-h-none hide-scroll-1 hide-scroll-2 overflow-scroll">I’m an engineer who loves turning complex workflows into simple, intuitive UI experiences. I specialize in React, Next.js, and modern design systems, and I’ve spent the last several years building dashboards, workflows, and interactive tools used by hundreds of people.
My style sits at the intersection of clarity, creativity, and precision - and this portfolio reflects that. Scroll down to explore the “colors” behind how I solve problems and bring products to life.</p>
                    </div>
            </div>
               
                
            </div>
      

      {/* ========================================================= */}
      {/* BOTTOM 1/3 = 33.33dvh                                      */}
      {/* ========================================================= */}
      <div className="h-1/3 w-full bg-[#FFFFF0] flex flex-col items-center justify-center gap-[3vh]">

        {/* ---------------- BLOCK C: 4 Color Buttons ---------------- */}
        <div className="grid grid-cols-2 md:flex md:flex-row gap-[2vh] md:gap-[3vw] w-[80vw] md:w-auto justify-center">
          {["🟥 Action/ Results", "🟨 Creativity/ Collaboration", "🟩 Stability/ Support", "🟦 Logic/ Planning"].map((c) => (
            <button
              key={c}
              className="bg-gray-950 text-white p-2 rounded-md "
            >
              {c}
            </button>
          ))}
        </div>

        {/* ---------------- BLOCK D: Explore All Colors ---------------- */}
        <button className="bg-black text-white py-2 px-3 rounded-md">
          Explore all colors
        </button>
      </div>
    </section>
  );
}
