"use client";

import React from "react";
import { motion } from "framer-motion";

interface LandingViewProps {
  onStart: () => void;
}

export default function LandingView({ onStart }: LandingViewProps): React.JSX.Element {
  return (
    <motion.section
      key="landing"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -80, scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-10 flex flex-col items-center justify-center w-full px-container-padding max-w-md mx-auto"
    >
      {/* The 'Card' Metaphor Container */}
      <div className="bg-surface-bright rounded-xl p-card-internal w-full flex flex-col items-center text-center ambient-shadow border border-surface-variant/40 transition-transform duration-500 ease-in-out hover:scale-[1.01]">
        {/* Ritualistic Anchor Line */}
        <div className="w-[1px] h-12 bg-outline-variant mb-8 opacity-60" />

        {/* Title */}
        <h1 className="font-display text-[40px] leading-[48px] tracking-[-0.02em] text-primary mb-6">
          Deep Cards
        </h1>

        {/* Poetic Subtitle */}
        <p className="font-body text-lg leading-7 text-on-surface-variant max-w-[280px] mb-12">
          A quiet space for meaningful connection.
          <br />
          Take a breath, deal a card, and listen.
        </p>

        {/* Call to Action */}
        <button
          type="button"
          onClick={onStart}
          className="bg-primary text-on-primary font-body text-xs font-medium uppercase tracking-[0.1em] rounded-full px-8 py-4 flex items-center justify-center gap-3 hover:bg-on-surface-variant transition-all duration-300 ease-in-out active:scale-95 group cursor-pointer"
        >
          <span>Start Ritual</span>
          <span
            className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform duration-300"
            style={{
              fontVariationSettings: "'FILL' 0, 'wght' 300",
            }}
          >
            east
          </span>
        </button>
      </div>
    </motion.section>
  );
}
