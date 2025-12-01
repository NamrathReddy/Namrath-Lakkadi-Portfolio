import React, { useEffect, useRef, useState } from "react";
import LandingSection from "./sections/LandingSection";
import RedSection from "./sections/RedSection";
import BlueSection from "./sections/BlueSection";
import GreenSection from "./sections/GreenSection";
import YellowSection from "./sections/YellowSection";
import FloatyShell from "./components/FloatyShell";

const sections = [
  LandingSection,
  BlueSection,
  RedSection,
  GreenSection,
  YellowSection
];

export default function App() {
  const [currentSectionIndices, setCurrentSectionIndices] = useState(new Set());

  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  function scrollToSection(index) {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  }

  // One entry per section
  const [sectionStates, setSectionStates] = useState(() =>
    sections.map(() => ({
      playIntro: false,
      abortIntro: false,
      locked: false,
    }))
  );

  function handleIntroComplete(index) {
    setSectionStates((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        locked: true,
        playIntro: false,
        abortIntro: false,
      };
      return copy;
    });
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.children;

    const observer = new IntersectionObserver(
      (entries) => {
        setSectionStates((prev) => {
          const copy = [...prev];

          entries.forEach((entry) => {
            const index = Number(entry.target.dataset.index);

            if (Number.isNaN(index)) return;

            const state = { ...copy[index] };

            // ADD or REMOVE INDEX based on intersecting state
            if (entry.isIntersecting) {
              // Add index
              setCurrentSectionIndices((prev) => {
                const next = new Set(prev);
                next.add(index);
                return next;
              });

              // Play intro if not locked
              if (!state.locked) {
                state.playIntro = true;
                state.abortIntro = false;
              }
            } else {
              // Remove index
              setCurrentSectionIndices((prev) => {
                const next = new Set(prev);
                next.delete(index);
                return next;
              });

              // Stop intro if not locked
              if (!state.locked) {
                state.abortIntro = true;
                state.playIntro = false;
              }
            }

            copy[index] = state;
          });

          return copy;
        });
      },
      {
        threshold: 0.05, //match this threshold with empty bottom space below the FloatyShell to let the floaty go away once the next color touches it.
      }
    );

    // Observe each section div
    Array.from(children).forEach((el, index) => {
      el.dataset.index = index;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const indicesArray = [...currentSectionIndices];
  const mainIndex = indicesArray[0] ?? 0;


  // function disableAnimations(x){
  //   if(x){
  //     setSectionStates(prev=>prev.map(s=>({
  //       playIntro: false,
  //     abortIntro: false,
  //     locked: true,
  //     })))
  //   }else{
  //     window.location.reload();
  //   }
  // }

  return (
    <>
      <div
        ref={containerRef}
        className="w-full snap-y snap-mandatory overflow-y-scroll h-dvh"
      >
        {sections.map((Sec, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="snap-start h-dvh"
          >
            <Sec
              playIntro={sectionStates[index]?.playIntro}
              abortIntro={sectionStates[index]?.abortIntro}
              locked={sectionStates[index]?.locked}
              onIntroComplete={() => handleIntroComplete(index)}
              {...(index === 0 ? { scrollToSection } : {})}
            />
          </div>
        ))}
      </div>

      {/* ⭐ FloatyShell BELOW the scrolling content */}
      <FloatyShell
        currentSectionIndices={indicesArray}
        scrollToSection={scrollToSection}
        locked={sectionStates[mainIndex]?.locked}
        // disableAnimations={disableAnimations}
      />
    </>
  );
}
