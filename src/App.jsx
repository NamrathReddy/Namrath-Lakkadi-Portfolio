import React from "react";
import LandingSection from "./sections/LandingSection";
import RedSection from "./sections/RedSection";
import BlueSection from "./sections/BlueSection";
import GreenSection from "./sections/GreenSection";
import YellowSection from "./sections/YellowSection";
import QuizSection from "./sections/QuizSection";
export default function App() {
  return (
    <div className="w-full snap-y snap-mandatory overflow-y-scroll h-screen">
      <LandingSection></LandingSection>
      <RedSection></RedSection>
      <YellowSection></YellowSection>
      <GreenSection></GreenSection>
      <BlueSection></BlueSection>
    <QuizSection></QuizSection>
    </div>
  );
}
