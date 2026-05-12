"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LandingView from "./components/LandingView";
import SetupView from "./components/SetupView";
import GenderSetupView from "./components/GenderSetupView";
import GameView from "./components/GameView";
import ClosingView from "./components/ClosingView";

type AppView = "landing" | "setup-age" | "setup-gender" | "game" | "closing";

export default function Home() {
  const [currentView, setCurrentView] = useState<AppView>("landing");

  const resetToLanding = useCallback(() => {
    setCurrentView("landing");
  }, []);

  // Game view needs full-screen layout, others are centered
  const isGameView = currentView === "game";

  return (
    <main
      className={`bg-surface text-on-surface min-h-screen flex flex-col items-center relative overflow-hidden font-body text-base selection:bg-primary-fixed selection:text-on-primary-fixed ${
        isGameView ? "" : "justify-center p-container-padding"
      }`}
    >
      {/* Ambient Background Gradient (hidden during game) */}
      {!isGameView && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-bright via-surface to-surface-container-low opacity-60 pointer-events-none" />
      )}

      {/* Theme Toggle */}
      <button
        type="button"
        onClick={() => {
          document.documentElement.classList.toggle("dark");
          const isDark = document.documentElement.classList.contains("dark");
          localStorage.setItem("theme", isDark ? "dark" : "light");
        }}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-surface-container-high/80 backdrop-blur-sm flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-all duration-300 cursor-pointer border border-outline-variant/30"
        aria-label="Toggle dark mode"
      >
        <span
          className="material-symbols-outlined text-xl dark:hidden"
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
        >
          dark_mode
        </span>
        <span
          className="material-symbols-outlined text-xl hidden dark:inline"
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
        >
          light_mode
        </span>
      </button>

      <AnimatePresence mode="wait">
        {currentView === "landing" && (
          <LandingView
            key="landing"
            onStart={() => setCurrentView("setup-age")}
          />
        )}

        {currentView === "setup-age" && (
          <SetupView
            key="setup-age"
            onBack={() => setCurrentView("landing")}
            onContinue={(_ageGroup) => setCurrentView("setup-gender")}
          />
        )}

        {currentView === "setup-gender" && (
          <GenderSetupView
            key="setup-gender"
            onBack={() => setCurrentView("setup-age")}
            onContinue={(_p1, _p2) => setCurrentView("game")}
          />
        )}

        {currentView === "game" && (
          <GameView
            key="game"
            onEnd={resetToLanding}
            onComplete={() => setCurrentView("closing")}
          />
        )}

        {currentView === "closing" && (
          <ClosingView
            key="closing"
            onPlayAgain={resetToLanding}
            onFinish={resetToLanding}
          />
        )}
      </AnimatePresence>
    </main>
  );
}