"use client";

import { motion } from "framer-motion";

interface ClosingViewProps {
  onPlayAgain: () => void;
  onFinish: () => void;
}

export default function ClosingView({
  onPlayAgain,
  onFinish,
}: ClosingViewProps) {
  return (
    <motion.section
      key="closing"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto gap-12 px-container-padding"
    >
      {/* Ambient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-surface-bright to-surface-container opacity-50 pointer-events-none" />

      {/* Meditative Icon */}
      <motion.div
        className="mb-2 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <span
          className="material-symbols-outlined text-[72px] text-tertiary-container font-light"
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
        >
          spa
        </span>
      </motion.div>

      {/* Core Message */}
      <motion.div
        className="flex flex-col gap-6 px-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="font-display text-[40px] leading-[48px] tracking-[-0.02em] text-primary">
          Thank you for sharing this space together.
        </h1>
        <p className="font-body text-lg leading-7 text-secondary">
          The conversation doesn&apos;t have to end here, but for now, take a
          breath and reflect on what was shared.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-6 mt-8 w-full justify-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <button
          type="button"
          onClick={onPlayAgain}
          className="w-full sm:w-auto px-8 py-4 bg-primary-container text-on-primary-container rounded-full font-body text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300 hover:opacity-80 active:scale-95 cursor-pointer"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="w-full sm:w-auto px-8 py-4 text-primary rounded-full font-body text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300 hover:bg-surface-variant active:scale-95 cursor-pointer"
        >
          Finish
        </button>
      </motion.div>
    </motion.section>
  );
}
