"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingView from "./components/LandingView";
import SetupView from "./components/SetupView";

type AppView = "landing" | "setup";

export default function Home(): React.JSX.Element {
  const [currentView, setCurrentView] = useState<AppView>("landing");

  return (
    <main className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-body text-base selection:bg-primary-fixed selection:text-on-primary-fixed p-container-padding">
      {/* Ambient Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-bright via-surface to-surface-container-low opacity-60 pointer-events-none" />

      <AnimatePresence mode="wait">
        {currentView === "landing" && (
          <LandingView
            key="landing"
            onStart={() => setCurrentView("setup")}
          />
        )}

        {currentView === "setup" && (
          <SetupView
            key="setup"
            onBack={() => setCurrentView("landing")}
            onContinue={(ageGroup) => {
              // TODO: handle age group selection and navigate to next step
              console.log("Selected age group:", ageGroup);
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}