"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GENDERS, type Gender } from "@/lib/questions";

interface GenderSetupViewProps {
  onBack: () => void;
  onContinue: (p1Gender: Gender, p2Gender: Gender) => void | Promise<void>;
  isLoading?: boolean;
  errorMessage?: string | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
  },
} as const;

export default function GenderSetupView({
  onBack,
  onContinue,
  isLoading = false,
  errorMessage = null,
}: GenderSetupViewProps) {
  const [p1Gender, setP1Gender] = useState<Gender | null>(null);
  const [p2Gender, setP2Gender] = useState<Gender | null>(null);

  const canContinue = p1Gender !== null && p2Gender !== null && !isLoading;

  return (
    <motion.section
      key="gender-setup"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80, scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-4xl flex flex-col items-center relative z-10"
    >
      {/* Header */}
      <motion.header
        className="text-center mb-stack-gap md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="font-display text-[40px] leading-[48px] tracking-[-0.02em] text-primary mb-unit">
          Who is playing today?
        </h1>
        <p className="font-body text-lg leading-7 text-on-surface-variant">
          Select identities to personalize the questions.
        </p>
      </motion.header>

      {/* Split Layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-stack-gap">
        {/* Player 1 */}
        <PlayerCard
          label="Player One"
          icon="person"
          color="primary"
          selected={p1Gender}
          onSelect={setP1Gender}
        />
        {/* Player 2 */}
        <PlayerCard
          label="Player Two"
          icon="person_add"
          color="tertiary"
          selected={p2Gender}
          onSelect={setP2Gender}
        />
      </div>

      {/* Action Area */}
      <motion.div
        className="mt-12 w-full flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => canContinue && onContinue(p1Gender!, p2Gender!)}
          className="bg-primary text-on-primary font-body text-lg leading-7 py-4 px-12 rounded-full hover:opacity-90 transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
        >
          {isLoading ? "Preparing Deck..." : "Continue"}
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </button>
      </motion.div>

      {errorMessage && (
        <motion.p
          className="mt-4 text-sm text-error text-center max-w-md"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {errorMessage}
        </motion.p>
      )}

      {/* Back link */}
      <motion.button
        type="button"
        onClick={onBack}
        disabled={isLoading}
        className="mt-6 text-on-surface-variant text-sm hover:text-primary transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        ← Back
      </motion.button>
    </motion.section>
  );
}

/* ─── Player Card Sub-component ─── */
function PlayerCard({
  label,
  icon,
  color,
  selected,
  onSelect,
}: {
  label: string;
  icon: string;
  color: "primary" | "tertiary";
  selected: Gender | null;
  onSelect: (gender: Gender) => void;
}) {
  const accentText = color === "primary" ? "text-primary" : "text-tertiary";
  const accentBg =
    color === "primary"
      ? "bg-primary-container/20"
      : "bg-tertiary-container/20";

  return (
    <motion.div
      className="bg-surface-container-low rounded-xl p-card-internal card-shadow-light border border-surface-variant relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Player icon */}
      <div className="text-center mb-6">
        <motion.span
          className={`font-body text-xs font-medium uppercase tracking-[0.1em] ${accentText} mb-2 block`}
          variants={itemVariants}
        >
          {label}
        </motion.span>
        <motion.div
          className={`w-12 h-12 rounded-full ${accentBg} flex items-center justify-center mx-auto ${accentText}`}
          variants={itemVariants}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </motion.div>
      </div>

      {/* Gender options */}
      <div className="flex flex-col gap-unit">
        {GENDERS.map((gender) => {
          const isSelected = selected === gender;
          const isLast = gender === "Prefer not to say";

          return (
            <motion.button
              key={gender}
              type="button"
              variants={itemVariants}
              onClick={() => onSelect(gender)}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 px-6 rounded-lg font-body text-base leading-6 transition-all duration-300 flex justify-between items-center cursor-pointer ${
                isSelected
                  ? "border-2 border-primary bg-primary-fixed/30 text-on-primary-fixed"
                  : `border border-outline-variant bg-surface hover:bg-surface-container-high text-on-surface ${isLast ? "opacity-70" : ""}`
              }`}
            >
              <span>{gender}</span>
              {isSelected && (
                <motion.span
                  className="material-symbols-outlined text-primary text-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
