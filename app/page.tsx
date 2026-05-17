"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LandingView from "./components/LandingView";
import SetupView from "./components/SetupView";
import GenderSetupView from "./components/GenderSetupView";
import GameView from "./components/GameView";
import ClosingView from "./components/ClosingView";
import type { AgeGroup, Gender, QuestionDeck } from "@/lib/questions";

type AppView = "landing" | "setup-age" | "setup-gender" | "game" | "closing";

export default function Home() {
  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(null);
  const [deck, setDeck] = useState<QuestionDeck | null>(null);
  const [isLoadingDeck, setIsLoadingDeck] = useState(false);
  const [deckError, setDeckError] = useState<string | null>(null);

  const resetToLanding = useCallback(() => {
    setSelectedAgeGroup(null);
    setDeck(null);
    setDeckError(null);
    setIsLoadingDeck(false);
    setCurrentView("landing");
  }, []);

  const handleAgeContinue = useCallback((ageGroup: AgeGroup) => {
    setSelectedAgeGroup(ageGroup);
    setDeckError(null);
    setCurrentView("setup-gender");
  }, []);

  const handleGenderContinue = useCallback(
    async (playerOneGender: Gender, playerTwoGender: Gender) => {
      if (!selectedAgeGroup) {
        setDeckError("Choose an age group before selecting player identities.");
        setCurrentView("setup-age");
        return;
      }

      setIsLoadingDeck(true);
      setDeckError(null);

      const params = new URLSearchParams({
        ageGroup: selectedAgeGroup,
        playerOneGender,
        playerTwoGender,
      });

      try {
        const response = await fetch(`/api/questions?${params.toString()}`, {
          cache: "no-store",
        });
        const payload = (await response.json()) as QuestionDeck | { error?: string };

        if (!response.ok || !("questions" in payload)) {
          throw new Error(
            "error" in payload && payload.error
              ? payload.error
              : "Unable to prepare the question deck.",
          );
        }

        setDeck(payload);
        setCurrentView("game");
      } catch (error) {
        setDeck(null);
        setDeckError(
          error instanceof Error
            ? error.message
            : "Unable to prepare the question deck.",
        );
      } finally {
        setIsLoadingDeck(false);
      }
    },
    [selectedAgeGroup],
  );

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
            onContinue={handleAgeContinue}
          />
        )}

        {currentView === "setup-gender" && (
          <GenderSetupView
            key="setup-gender"
            onBack={() => setCurrentView("setup-age")}
            onContinue={handleGenderContinue}
            isLoading={isLoadingDeck}
            errorMessage={deckError}
          />
        )}

        {currentView === "game" && deck && (
          <GameView
            key="game"
            onEnd={resetToLanding}
            onComplete={() => setCurrentView("closing")}
            questions={deck.questions}
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
