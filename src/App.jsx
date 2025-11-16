import React from "react";
import LandingSection from "./sections/LandingSection";
import RedSection from "./sections/RedSection";
import BlueSection from "./sections/BlueSection";
import GreenSection from "./sections/GreenSection";
import YellowSection from "./sections/YellowSection";
export default function App() {
  return (
    <div className="w-full snap-y snap-mandatory overflow-y-scroll h-screen">
      <LandingSection></LandingSection>
      <BlueSection></BlueSection>
      <RedSection></RedSection>
      <GreenSection></GreenSection>
      <YellowSection></YellowSection>
    </div>
  );
}
//“I believe every skill can be mastered with curiosity, clarity, and consistent practice.”

// 🔵 BLUE

// “This section represents clarity, structure, and my technical foundation.”

// 🔴 RED

// “This section is about action, execution, and real project impact.”

// 🟢 GREEN

// “This section reflects how I collaborate, think, and solve problems.”

// 🟡 YELLOW

// “This section is about connection, communication, and opportunity.”


//“The 4-color theory describes four core working styles — Blue, Red, Green, and Yellow — and says that everyone expresses all four, just in different proportions. One color is usually dominant, while the others support it. Blue represents clarity and structured thinking, Red shows action and impact, Green reflects collaboration and thoughtful problem-solving, and Yellow expresses communication and connection. I’ve woven these colors into my portfolio to show the different sides of how I work: technical clarity (Blue), execution and results (Red), collaborative problem-solving (Green), and human connection (Yellow).”
