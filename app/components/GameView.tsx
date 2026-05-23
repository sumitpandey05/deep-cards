"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LEVEL_ICONS,
  LEVEL_NAMES,
  getQuestionsByLevel,
  type Question,
} from "@/lib/questions";

interface GameViewProps {
  onEnd: () => void;
  onComplete: () => void;
  questions: Question[];
}

export default function GameView({
  onEnd,
  onComplete,
  questions,
}: GameViewProps) {
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3>(1);
  const [cardIndex, setCardIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showRules, setShowRules] = useState(true);
  const [pendingLevel, setPendingLevel] = useState<2 | 3 | null>(null);

  const levelQuestions = getQuestionsByLevel(questions, currentLevel);
  const currentQuestion = levelQuestions[cardIndex];
  const totalCards = levelQuestions.length;
  const displayedLevel = pendingLevel ?? 1;
  const levelName = LEVEL_NAMES[displayedLevel];
  const levelIcon = LEVEL_ICONS[displayedLevel];

  const handleNext = useCallback(() => {
    setDirection(1);

    if (cardIndex < totalCards - 1) {
      setCardIndex((index) => index + 1);
      return;
    }

    if (currentLevel < 3) {
      setPendingLevel((currentLevel + 1) as 2 | 3);
      return;
    }

    onComplete();
  }, [cardIndex, totalCards, currentLevel, onComplete]);

  const handleBeginNextLevel = useCallback(() => {
    if (!pendingLevel) {
      return;
    }

    setDirection(1);
    setCurrentLevel(pendingLevel);
    setCardIndex(0);
    setPendingLevel(null);
  }, [pendingLevel]);

  const handleStartGame = useCallback(() => {
    setDirection(1);
    setShowRules(false);
  }, []);

  const ambientOpacity =
    (showRules ? 1 : displayedLevel) === 1
      ? "opacity-5"
      : (showRules ? 1 : displayedLevel) === 2
        ? "opacity-10"
        : "opacity-15";

  return (
    <motion.section
      key="game"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-10 flex min-h-screen w-full flex-col"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-primary-fixed transition-opacity duration-1000 ${ambientOpacity}`}
      />

      <header className="relative z-10 flex h-16 w-full items-center justify-between px-container-padding">
        <button
          type="button"
          onClick={onEnd}
          aria-label="End Session"
          className="flex cursor-pointer items-center justify-center rounded-full p-2 text-on-surface-variant transition-colors duration-300 hover:bg-surface-container-low hover:text-primary"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="font-body text-xs font-medium uppercase tracking-[0.1em] text-primary">
            {showRules ? "Before You Begin" : `Level ${displayedLevel}`}
          </span>
          <span className="mt-0.5 font-body text-base leading-6 text-on-surface-variant">
            {showRules ? "A few quick reminders" : levelName}
          </span>
        </div>

        <div className="h-10 w-10" />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-container-padding">
        <div className="relative w-full aspect-[3/4]">
          <AnimatePresence mode="wait" custom={direction}>
            {showRules ? (
              <motion.div
                key="rules"
                custom={direction}
                initial={{ opacity: 0, x: 60, rotateY: -5 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -60, rotateY: 5 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="paper-grain card-shadow-elevated relative flex h-full w-full flex-col justify-center overflow-hidden rounded-xl border border-surface-container-low bg-surface-container-lowest p-card-internal dark:border-surface-container dark:bg-surface-container-high"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(98,55,40,0.14),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,180,165,0.16),_transparent_60%)]" />
                <div className="absolute top-0 left-1/2 h-1 w-1/3 -translate-x-1/2 rounded-b-full bg-primary opacity-40" />

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="space-y-3 text-center">
                    <p className="font-body text-xs font-medium uppercase tracking-[0.14em] text-primary">
                      Rules
                    </p>
                    <h2 className="font-display text-[clamp(30px,7vw,48px)] leading-none tracking-[-0.03em] text-primary">
                      Set the tone first
                    </h2>
                    <p className="mx-auto max-w-xs font-body text-sm leading-6 text-on-surface-variant">
                      A calm start makes the rest of the conversation land better.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Take a few moments and understand the question",
                      "Be open and talk freely",
                      "Make sure to have fun",
                    ].map((rule) => (
                      <div
                        key={rule}
                        className="rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4"
                      >
                        <p className="font-body text-sm leading-6 text-on-surface">
                          {rule}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : pendingLevel ? (
              <motion.div
                key={`level-transition-${pendingLevel}`}
                custom={direction}
                initial={{ opacity: 0, x: 60, rotateY: -5 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -60, rotateY: 5 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="paper-grain card-shadow-elevated relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-surface-container-low bg-surface-container-lowest p-card-internal text-center dark:border-surface-container dark:bg-surface-container-high"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(98,55,40,0.14),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,180,165,0.16),_transparent_60%)]" />
                <div className="absolute top-0 left-1/2 h-1 w-1/3 -translate-x-1/2 rounded-b-full bg-primary opacity-40" />

                <div className="relative z-10 flex flex-col items-center gap-5">
                  <span
                    className="material-symbols-outlined text-5xl text-primary opacity-80"
                    style={{
                      fontVariationSettings:
                        pendingLevel === 3 ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    {levelIcon}
                  </span>

                  <div className="space-y-3">
                    <p className="font-body text-xs font-medium uppercase tracking-[0.14em] text-primary">
                      Next Level
                    </p>
                    <h2 className="font-display text-[clamp(34px,8vw,56px)] leading-none tracking-[-0.03em] text-primary">
                      Level {pendingLevel}
                    </h2>
                    <p className="font-display text-[clamp(22px,4vw,32px)] italic text-on-surface">
                      {levelName}
                    </p>
                    <p className="mx-auto max-w-xs font-body text-sm leading-6 text-on-surface-variant">
                      Take a breath. The conversation is about to go a little deeper.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestion?.id ?? 0}
                custom={direction}
                initial={{ opacity: 0, x: 60, rotateY: -5 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -60, rotateY: 5 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="paper-grain card-shadow-light relative flex h-full w-full flex-col items-center justify-center rounded-xl border border-surface-container-low bg-surface-container-lowest p-card-internal transition-transform duration-500 ease-in-out hover:scale-[1.01] dark:border-surface-container dark:bg-surface-container-high"
              >
                <div className="absolute top-0 left-1/2 h-1 w-1/3 -translate-x-1/2 rounded-b-full bg-primary opacity-30" />

                {currentLevel === 3 && (
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary-fixed/10 to-transparent" />
                )}

                <div className="relative z-10 flex flex-1 items-center justify-center text-center">
                  <h2 className="font-display text-[clamp(24px,5vw,40px)] leading-[1.2] tracking-[-0.02em] text-primary">
                    {currentQuestion?.text}
                  </h2>
                </div>

                <div className="relative z-10 mt-auto pt-8 opacity-40">
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
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-stack-gap flex w-full justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <button
            type="button"
            onClick={
              showRules
                ? handleStartGame
                : pendingLevel
                  ? handleBeginNextLevel
                  : handleNext
            }
            className="group flex cursor-pointer items-center gap-3 rounded-full border border-primary/20 bg-transparent px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.1em] text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 active:scale-95"
          >
            <span>
              {showRules
                ? "Start Level 1"
                : pendingLevel
                ? `Begin Level ${pendingLevel}`
                : cardIndex === totalCards - 1 && currentLevel === 3
                  ? "Finish"
                  : "Next Card"}
            </span>
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">
              {showRules || pendingLevel ? "play_arrow" : "arrow_forward"}
            </span>
          </button>
        </motion.div>
      </main>

      <footer className="relative z-10 flex w-full justify-center px-container-padding py-8">
        {showRules || pendingLevel ? (
          <p className="font-body text-xs uppercase tracking-[0.12em] text-on-surface-variant">
            Ready when you are
          </p>
        ) : (
          <div className="flex gap-2">
            {levelQuestions.map((_, index) => (
              <div
                key={index}
                className={`h-1 w-8 rounded-full transition-all duration-500 ${
                  index < cardIndex
                    ? "bg-primary opacity-100"
                    : index === cardIndex
                      ? "bg-primary opacity-60"
                      : "bg-outline-variant opacity-30"
                }`}
              />
            ))}
          </div>
        )}
      </footer>
    </motion.section>
  );
}
