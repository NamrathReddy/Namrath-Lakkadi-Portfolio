import React from "react";
import { useState, useEffect } from "react";
export default function BlueSection() {
  const [showIntro, setShowIntro] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

useEffect(() => {
  console.log("Effect running...");
  
  const show = () => {
    console.log("Show intro");
    setShowIntro(true);

    setTimeout(() => {
      console.log("Hide intro");
      setShowIntro(false);
    }, 1800);

    setTimeout(() => {
      console.log("Show skills");
      setShowSkills(true);
    }, 2400);
  };

  show();
}, []);


  return (
    <section className="h-dvh w-full bg-blue-200 relative overflow-hidden snap-start">
      
      {/* ================= INTRO LAYER ================= */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700
        ${showIntro ? "opacity-100" : "opacity-0"}`}
      >
        <h1 className="text-4xl font-bold mb-2">Welcome to my Blue side.</h1>
        <h2 className="text-xl font-semibold mb-1">Depth and expertise.</h2>
        <p className="text-sm opacity-80">The foundation of my technical skills.</p>
      </div>

      {/* ================= SKILLS LAYER ================= */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700
        ${showSkills ? "opacity-100" : "opacity-0"}`}
      >
        {/* PLACE SKILL CARDS HERE */}
        cards go here...
      </div>

    </section>
  );
}
