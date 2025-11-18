import React, { useEffect, useState } from "react";

const sectionConfig = [
  { id: "landing", label: "Why Colors?", type: "landing", bgClass: "bg-[#FDF6E3]" },
  { id: "blue", label: "Skills & Tech", type: "color", bgClass: "bg-blue-600" },
  { id: "red", label: "Projects & Impact", type: "color", bgClass: "bg-red-600" },
  { id: "green", label: "My Work Style", type: "color", bgClass: "bg-green-600" },
  { id: "yellow", label: "Connect With Me", type: "color", bgClass: "bg-yellow-500" },
];

export default function FloatyShell({
  currentSectionIndices,
  scrollToSection,
  locked
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
    : isOpen ? "X" : "◎";

  const containerClass = [
    "fixed w-full transition-all duration-300 ease-out overflow-hidden z-20 border border-black",
    (locked && currentSectionIndices.length===1)? `opacity-100 ${currentConfig.bgClass}` : "opacity-0 bg-none left-[100vw]",
    isOpen
      ? (isLanding
          ? "left-0 bottom-0 h-screen xl:h-[33vh]"
          : "left-0 bottom-0 h-screen xl:h-auto")
      : (isLanding
          ? "left-[80vw] bottom-[5vh] h-[10vh]"
          : "left-0 bottom-[5vh] h-[10vh]"),
  ].join(" ");

  function LandingExpanded() {
    return (
      <div className="h-full px-4 pt-4 pb-20 xl:pb-4 text-sm md:text-base">
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
      </div>
    );
  }

  function ColorExpanded() {
    const otherSections = sectionConfig
      .map((c, i) => ({ ...c, index: i }))
      .filter((c) => c.type === "color" && c.index !== mainIndex);

    return (
      <div className="h-full px-4 pt-4 pb-20 xl:pb-4 flex flex-col gap-3 text-white">
        <h3 className="font-semibold">Jump to another perspective:</h3>

        <div className="flex flex-col xl:flex-row gap-2">
          {otherSections.map((cfg) => (
            <button
              key={cfg.id}
              onClick={() => {
                scrollToSection(cfg.index);
                setIsOpen(false);
              }}
              className="flex-1 rounded-md bg-white/95 text-black px-3 py-2 font-medium shadow-sm hover:bg-white"
            >
              {cfg.label}
            </button>
          ))}
        </div>

        <p className="text-xs md:text-sm text-white/90 xl:text-white/80">
          You’re currently viewing: <strong>{currentConfig.label}</strong>
        </p>
      </div>
    );
  }

  return (
    <>
      {/* EXPANDING CONTAINER */}
      <div className={containerClass}>
        {isOpen
          ? (isLanding ? <LandingExpanded /> : <ColorExpanded />)
          : (!isLanding && (
              <h1 className="text-center text-2xl text-white">
                {currentConfig.label}
              </h1>
            ))}
      </div>

      {/* FLOATY BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={[
          (locked && currentSectionIndices.length===1) ? "opacity-100" : "opacity-0",
          "fixed z-30 bottom-[5vh] right-[5vw]",
          "h-12 w-12 rounded-full flex items-center justify-center",
          "bg-black text-white shadow-lg border border-white/40",
          "transition-transform duration-200 active:scale-95",
        ].join(" ")}
      >
        <span className="text-xl font-bold">{floatyIcon}</span>
      </button>
    </>
  );
}
