"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, LEVEL_NAMES, LEVEL_ICONS, getQuestionsByLevel } from "@/lib/questions";
import type { Question } from "@/lib/questions";

interface GameViewProps {
  onEnd: () => void;
  onComplete: () => void;
}

export default function GameView({ onEnd, onComplete }: GameViewProps) {
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3>(1);
  const [cardIndex, setCardIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward

  const levelQuestions = getQuestionsByLevel(currentLevel);
  const currentQuestion = levelQuestions[cardIndex];
  const totalCards = levelQuestions.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    if (cardIndex < totalCards - 1) {
      setCardIndex((i) => i + 1);
    } else if (currentLevel < 3) {
      // Advance to next level
      setCurrentLevel((l) => (l + 1) as 1 | 2 | 3);
      setCardIndex(0);
    } else {
      // Game over — all levels done
      onComplete();
    }
  }, [cardIndex, totalCards, currentLevel, onComplete]);

  const levelName = LEVEL_NAMES[currentLevel];
  const levelIcon = LEVEL_ICONS[currentLevel];

  // Level-based ambient color intensity
  const ambientOpacity =
    currentLevel === 1 ? "opacity-5" : currentLevel === 2 ? "opacity-10" : "opacity-15";

  return (
    <motion.section
      key="game"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="w-full min-h-screen flex flex-col relative z-10"
    >
      {/* Ambient level background */}
      <div
        className={`absolute inset-0 bg-primary-fixed pointer-events-none transition-opacity duration-1000 ${ambientOpacity}`}
      />

      {/* Header */}
      <header className="flex justify-between items-center w-full px-container-padding h-16 bg-transparent relative z-10">
        <button
          type="button"
          onClick={onEnd}
          aria-label="End Session"
          className="text-on-surface-variant hover:text-primary transition-colors duration-300 flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="font-body text-xs font-medium uppercase tracking-[0.1em] text-primary">
            Level {currentLevel}
          </span>
          <span className="font-body text-base leading-6 text-on-surface-variant mt-0.5">
            {levelName}
          </span>
        </div>

        <div className="w-10 h-10" /> {/* Spacer for alignment */}
      </header>

      {/* Main Card Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-container-padding relative z-10 w-full max-w-md mx-auto">
        {/* The Question Card */}
        <div className="w-full aspect-[3/4] relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion?.id ?? 0}
              custom={direction}
              initial={{ opacity: 0, x: 60, rotateY: -5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -60, rotateY: 5 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="paper-grain bg-surface-container-lowest dark:bg-surface-container-high w-full h-full rounded-xl card-shadow-light border border-surface-container-low dark:border-surface-container flex flex-col items-center justify-center p-card-internal relative transition-transform duration-500 ease-in-out hover:scale-[1.01]"
            >
              {/* Card accent bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-primary rounded-b-full opacity-30" />

              {/* Level 3 gradient overlay */}
              {currentLevel === 3 && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-fixed/10 to-transparent pointer-events-none" />
              )}

              {/* Question content */}
              <div className="flex-1 flex items-center justify-center text-center w-full relative z-10">
                <h2 className="font-display text-[clamp(24px,5vw,40px)] leading-[1.2] tracking-[-0.02em] text-primary">
                  {currentQuestion?.text}
                </h2>
              </div>

              {/* Card footer icon */}
              <div className="mt-auto pt-8 opacity-40 relative z-10">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{
                    fontVariationSettings:
                      currentLevel === 3 ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {levelIcon}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Card Button */}
        <motion.div
          className="mt-stack-gap w-full flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <button
            type="button"
            onClick={handleNext}
            className="group flex items-center gap-3 bg-transparent text-primary border border-primary/20 hover:border-primary/50 hover:bg-primary/5 px-8 py-4 rounded-full transition-all duration-300 font-body text-xs font-medium uppercase tracking-[0.1em] cursor-pointer active:scale-95"
          >
            <span>
              {cardIndex === totalCards - 1 && currentLevel === 3
                ? "Finish"
                : "Next Card"}
            </span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-300">
              arrow_forward
            </span>
          </button>
        </motion.div>
      </main>

      {/* Bottom Progress */}
      <footer className="w-full px-container-padding py-8 flex justify-center relative z-10">
        <div className="flex gap-2">
          {levelQuestions.map((_, i) => (
            <div
              key={i}
              className={`w-8 h-1 rounded-full transition-all duration-500 ${
                i < cardIndex
                  ? "bg-primary opacity-100"
                  : i === cardIndex
                    ? "bg-primary opacity-60"
                    : "bg-outline-variant opacity-30"
              }`}
            />
          ))}
        </div>
      </footer>
    </motion.section>
  );
}
