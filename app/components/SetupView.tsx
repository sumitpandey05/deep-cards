"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SetupViewProps {
  onBack: () => void;
  onContinue: (ageGroup: string) => void;
}

const AGE_GROUPS = ["Under 18", "18–24", "25–34", "35+"] as const;

// Stagger children animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
} as const;

export default function SetupView({
  onBack,
  onContinue,
}: SetupViewProps) {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  return (
    <motion.section
      key="setup"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80, scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="max-w-md w-full flex flex-col items-center text-center relative z-10"
    >
      {/* Subtle Progress Indicator */}
      <motion.div
        aria-label="Setup progress"
        className="flex gap-2 mb-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <button
          type="button"
          onClick={onBack}
          className="w-2 h-2 rounded-full bg-primary-container cursor-pointer hover:bg-primary transition-colors duration-200"
          aria-label="Go back to start"
        />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-surface-variant" />
      </motion.div>

      {/* Header Section */}
      <motion.div
        className="flex flex-col gap-unit mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="font-headline text-[32px] leading-[40px] text-on-surface">
          Choose your shared age group
        </h1>
        <p className="font-body text-base leading-6 text-on-surface-variant px-4">
          This helps us select the most appropriate and resonant deck for your
          conversation.
        </p>
      </motion.div>

      {/* Options Grid */}
      <motion.div
        aria-labelledby="age-group-label"
        className="w-full flex flex-col gap-gutter"
        role="radiogroup"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="sr-only" id="age-group-label">
          Age group options
        </span>

        {AGE_GROUPS.map((group) => {
          const isSelected = selectedAge === group;
          return (
            <motion.button
              key={group}
              type="button"
              role="radio"
              aria-checked={isSelected}
              variants={itemVariants}
              onClick={() => setSelectedAge(group)}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-5 px-6 rounded-xl border font-body text-lg leading-7 transition-all duration-300 cursor-pointer focus:outline-none ${
                isSelected
                  ? "border-primary-container bg-primary-container text-on-primary-container shadow-[0_4px_20px_rgba(98,55,40,0.08)] ring-1 ring-primary-container ring-offset-2 ring-offset-surface"
                  : "border-outline-variant bg-surface-container-lowest text-on-surface shadow-[0_4px_20px_rgba(98,55,40,0.02)] hover:bg-surface-container-low hover:border-outline focus:ring-2 focus:ring-primary-container focus:ring-offset-2 focus:ring-offset-surface"
              }`}
            >
              {group}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Action Area */}
      <motion.div
        className="w-full mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <button
          type="button"
          disabled={!selectedAge}
          onClick={() => selectedAge && onContinue(selectedAge)}
          className="w-full py-4 rounded-full bg-primary text-on-primary font-body text-xs font-medium uppercase tracking-[0.1em] hover:opacity-90 active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(98,55,40,0.15)] flex justify-center items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          Continue
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            arrow_forward
          </span>
        </button>
      </motion.div>
    </motion.section>
  );
}
