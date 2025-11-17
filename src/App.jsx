import React, { useEffect, useRef, useState } from "react";
import LandingSection from "./sections/LandingSection";
import RedSection from "./sections/RedSection";
import BlueSection from "./sections/BlueSection";
import GreenSection from "./sections/GreenSection";
import YellowSection from "./sections/YellowSection";
import FloatyShell from "./components/FloatyShell";

const sections = [LandingSection, BlueSection, RedSection, GreenSection, YellowSection];

export default function App() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

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

  // When a section reports “intro finished successfully”
  function handleIntroComplete(index) {
    setSectionStates((prev) => {
      const copy = [...prev];
      // lock this section
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

            if (entry.isIntersecting) {
              // ENTER view

              setCurrentSectionIndex(index);

              if (!state.locked) {
                state.playIntro = true;   // trigger intro
                state.abortIntro = false; // clear abort
              }
            } else {
              // LEAVE view
              if (!state.locked) {
                state.abortIntro = true;  // abort running animation
                state.playIntro = false;  // stop asking to play
              }
            }

            copy[index] = state;
          });

          return copy;
        });
      },
      {
        threshold: 0.5, // section considered "in view" when 50% visible
      }
    );

    // Attach data-index and observe each section container
    Array.from(children).forEach((el, index) => {
      el.dataset.index = index;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (<>
    <div
      ref={containerRef}
      className="w-full snap-y snap-mandatory overflow-y-scroll h-screen"
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
            // ⭐ Only pass scrollToSection to LandingSection (index === 0)
            {...(index === 0 ? { scrollToSection } : {})} //why no prop name?
          />
        </div>
      ))}
    </div>
    {/* ⭐ Adding FloatyShell here (AFTER scroll area) */}
    <FloatyShell
      currentSectionIndex={currentSectionIndex}
      scrollToSection={scrollToSection}
    />
    </>
  );
}
