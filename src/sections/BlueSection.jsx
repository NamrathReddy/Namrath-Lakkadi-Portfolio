import React, { useEffect, useRef, useState } from "react";

const INTRO_DURATION = 4000; // 5 seconds

// ----------------------
//  SVG ICON COMPONENTS
// ----------------------
const icons = {
  react: `<svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" stroke-width="1.5">
      <circle cx="12" cy="12" r="2.5"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(120 12 12)"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.5"/>
    </svg>`,

  nextjs: `<svg viewBox="0 0 24 24" fill="black">
      <path d="M12 0c6.6 0 12 5.4 12 12 0 2.6-.8 5-2.2 7l-9.8-14v11h-1.5V0z"/>
      <path d="M1.8 4.1L14.6 24H12c-6.6 0-12-5.4-12-12 0-2.6.8-5 2.2-7z"/>
    </svg>`,

  ts: `<svg viewBox='0 0 24 24' fill='#3178C6'>
      <rect width='24' height='24' rx='3' />
      <path fill='white' d='M10.2 17v-7H7v-2h9v2h-3.2v7h-2.6z'/>
    </svg>`,

  js: `<svg viewBox='0 0 24 24' fill='#F7DF1E'>
      <rect width='24' height='24' rx='3'/>
      <path d='M6 17l2 1c.7 1.2 1.8 1.6 3 1 1-.6.7-1.7 0-2L9 15v-2l3 1c2 1 3 3 2 5-1 2-4 3-6 1-1-1-2-3-2-4z'/>
    </svg>`,

  tailwind: `<svg viewBox="0 0 48 48" fill="none">
      <path fill="#38BDF8" d="M24 10c-6 0-9.7 3-11 9 2.2-3 4.8-4 8-3 1.7.5 3 2 4 4 
      1.2 2.8 3.3 4.2 6 4 4-.3 6.7-3.3 7-9-2 3-4.7 4.3-8 4-1.6-.1-3-1.4-4-4-1.2-3-3.3-5-6-5z"/>
    </svg>`,

  recharts: `<svg viewBox="0 0 24 24" fill="#0088FE">
      <circle cx="12" cy="12" r="10" opacity="0.2"/>
      <path d="M12 2a10 10 0 0 1 10 10h-10z"/>
    </svg>`,

  node: `<svg viewBox="0 0 24 24" fill="#339933">
      <path d="M12 2l10 6v8l-10 6-10-6V8z"/>
    </svg>`,

  express: `<svg viewBox="0 0 24 24" stroke="black" fill="none" stroke-width="1.4">
      <text x="3" y="15" font-size="10" font-family="serif">Ex</text>
    </svg>`,

  rest: `<svg viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2">
      <rect x="3" y="6" width="6" height="12" rx="2"/>
      <rect x="15" y="6" width="6" height="12" rx="2"/>
      <path d="M9 12h6"/>
    </svg>`,

  postgres: `<svg viewBox="0 0 24 24" fill="#336791">
      <path d="M12 2c-5 0-9 3-9 7v6c0 4 4 7 9 7s9-3 9-7V9c0-4-4-7-9-7z"/>
    </svg>`,

  nextauth: `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 3"/>
    </svg>`,

  rbac: `<svg viewBox="0 0 24 24" fill="none" stroke="#0f766e" stroke-width="2">
      <circle cx="12" cy="8" r="3"/>
      <path d="M4 20c1-4 4-6 8-6s7 2 8 6"/>
    </svg>`,

  signed: `<svg viewBox="0 0 24 24" stroke="#2563eb" stroke-width="2" fill="none">
      <path d="M10 13l-3-3 3-3M14 11h7"/>
      <rect x="3" y="7" width="8" height="10" rx="2"/>
    </svg>`,

  zod: `<svg viewBox="0 0 24 24" fill="#3E8CFF">
      <path d="M4 4h16v4H8v4h8v4H4z"/>
    </svg>`,

  a11y: `<svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
      <circle cx="12" cy="5" r="2"/>
      <path d="M4 7h16M12 7v10M6 12l6 5 6-5"/>
    </svg>`,

  i18n: `<svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <path d="M8 12h8M12 3v18M5 8h14M5 16h14"/>
    </svg>`,

  uiGrid: `<svg viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>`,

  lazy: `<svg viewBox="0 0 24 24" stroke="#9333ea" fill="none" stroke-width="2">
      <circle cx="12" cy="12" r="9" opacity="0.4"/>
      <path d="M12 6v6l4 2"/>
    </svg>`,

  split: `<svg viewBox="0 0 24 24" stroke="#ea580c" stroke-width="2" fill="none">
      <path d="M4 12h16M12 4v16"/>
    </svg>`,

  jest: `<svg viewBox="0 0 24 24" fill="#99425B">
      <circle cx="12" cy="12" r="10"/>
    </svg>`,

  gha: `<svg viewBox="0 0 24 24" fill="none" stroke="#181717" stroke-width="2">
      <circle cx="8" cy="8" r="3"/>
      <path d="M3 21l7-7 4 4 7-7"/>
    </svg>`,
};

// ----------------------
//  SKILL CARD COMPONENT
// ----------------------
function Skill({ icon, label }) {
  return (
    <div className="flex items-center text-sm lg:text-md bg-white/80 backdrop-blur-sm rounded-lg shadow-sm px-3 py-[1vh] h-[4vh]">
      <span
        className="w-5 h-5"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <span className="font-medium px-2">{label}</span>
    </div>
  );
}

// ----------------------
//  CATEGORY CARD
// ----------------------
function Category({ title, skills }) {
  return (
    <div className="bg-blue-100 rounded-xl border border-blue-200 shadow-lg pb-[1vh] w-[90%] xl:w-2/3">
      <h3 className="text-blue-800 font-semibold px-2 py-[1vh] text-lg lg:text-xl">{title}</h3>

      <div className="grid grid-cols-1 gap-[.5vh]">
        {skills.map((s, i) => (
          <Skill key={i} icon={icons[s.icon]} label={s.label} />
        ))}
      </div>
    </div>
  );
}

// ----------------------
//  MAIN SECTION
// ----------------------
export default function BlueSection({
  playIntro,
  abortIntro,
  locked,
  onIntroComplete,
}) {
  const [showIntro, setShowIntro] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  const introTimer = useRef(null);
  const skillsTimer = useRef(null);
  const lockTimer = useRef(null);

  // ⭐ FIX: central timer cleanup
const clearAllTimers = () => {
  clearTimeout(introTimer.current);
  clearTimeout(skillsTimer.current);
  clearTimeout(lockTimer.current);
  introTimer.current = null;
  skillsTimer.current = null;
  lockTimer.current = null;
};

  // If locked, skip intro and directly show final content
useEffect(() => {
  if (locked) {
    clearAllTimers(); 
    setShowIntro(false);
    setShowSkills(true);  // <---- THIS LINE FIXES EVERYTHING
  }
}, [locked]);
  // PLAY INTRO
  useEffect(() => {
  if (playIntro && !locked) {
    clearAllTimers(); // 🔥 FIX: prevent leftover timers

    setShowIntro(true);
    setShowSkills(false);

    introTimer.current = setTimeout(() => setShowIntro(false), 3000);
    skillsTimer.current = setTimeout(() => setShowSkills(true), 4000);

    lockTimer.current = setTimeout(() => {
      if (onIntroComplete) onIntroComplete();
    }, INTRO_DURATION);
  }
}, [playIntro, locked, onIntroComplete]);


  // ABORT
  useEffect(() => {
    if (abortIntro && !locked) {
  clearAllTimers(); // 🔥 FIX: one unified cleanup
  setShowIntro(false);
  setShowSkills(false);
}
  }, [abortIntro, locked]);

  // CLEANUP
  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  return (
    <section className="h-dvh w-full bg-blue-200 relative overflow-hidden snap-start snap-always">

      {/* INTRO */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 
          ${showIntro ? "opacity-100" : "opacity-0"}
        `}
      >
        <h1 className="text-4xl font-bold mb-2">My Blue Side.</h1>
        <h2 className="text-2xl font-semibold mb-1">Depth & Expertise.</h2>
        <p className="text-md opacity-80">The foundation of my technical skills.</p>
      </div>

      {/* SKILLS */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 snap-y snap-mandatory
          ${showSkills ? "opacity-100 overflow-scroll" : "opacity-0"}
        `}
      >
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 md:grid-rows-[80vh_20vh] xl:gap-x-12">
          <div className="h-dvh md:h-full pb-[10vh] md:pb-0 flex flex-col gap-2 justify-center items-center xl:items-end snap-start md:snap-none">
          <Category //should i do pb-[10vh] or mb? pb is the answer
            title="Frontend"
            skills={[
              { icon: "react", label: "React.js" },
              { icon: "nextjs", label: "Next.js (App Router + RSC)" },
              { icon: "ts", label: "TypeScript" },
              { icon: "js", label: "JavaScript (ES6+)" },
              { icon: "tailwind", label: "Tailwind CSS (shadcn/ui)" },
              { icon: "recharts", label: "Recharts" },
            ]}
          />
          <Category
            title="UI/UX Engineering"
            skills={[
              { icon: "a11y", label: "Accessibility" },
              { icon: "i18n", label: "i18n (react-i18next)" },
              { icon: "uiGrid", label: "Reusable UI Systems" },
            ]}
          />
          <Category
            title="Performance Optimization"
            skills={[
              { icon: "split", label: "Route-level code splitting" },
              { icon: "lazy", label: "Lazy Loading" },
            ]}
          />
          </div>
          <div className="h-dvh md:h-full pb-[10vh] md:pb-0 flex flex-col gap-2 justify-center items-center xl:items-start snap-start md:snap-none">
          <Category
            title="Backend / APIs"
            skills={[
              { icon: "node", label: "Node.js" },
              { icon: "express", label: "Express.js" },
              { icon: "rest", label: "REST APIs" },
              { icon: "rest", label: "Axios Interceptors" },
              { icon: "zod", label: "Zod validation" },
              { icon: "postgres", label: "Basic PostgreSQL" },
            ]}
          />
          <Category
            title="Auth & Security"
            skills={[
              { icon: "nextauth", label: "NextAuth (SSO)" },
              { icon: "rbac", label: "Role-Based Access Control" },
              { icon: "signed", label: "Signed Share Links" },
            ]}
          />
          <Category
            title="Quality & DevOps"
            skills={[
              { icon: "jest", label: "Jest" },
              { icon: "gha", label: "GitHub Actions / CI" },
            ]}
          />
          </div>
          <div className="h-dvh md:h-full md:col-span-2 bg-blue-300 flex flex-row justify-center items-center md:items-start  px-2 snap-start md:snap-none">
            <div className="text-xl md:h-[10vh] flex flex-col items-center justify-center text-center text-blue-500 font-medium">
              <h1>My learning style is analytical: I research thoroughly, clarify concepts, and build knowledge step by step.</h1>
            </div>
            
            {/* I believe every skill can be mastered with curiosity, clarity, & consistency */}
          </div>

        </div>
      </div>
    </section>
  );
}
