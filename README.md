# Unsaid Things 🃏

> A co-located, single-device web app designed to facilitate meaningful, progressively deeper conversations between two people.

**Live:** [unsaidthings.vercel.app](https://unsaid-things.vercel.app/) 

---

## 📖 Overview

**Unsaid Things**  is a digital card game meant to be played by two people sitting next to each other, sharing a single screen. The goal is to strip away the distractions of modern gamification—no timers, no scores, no competition—and focus entirely on human connection.

Through a carefully structured, progressive set of question prompts, players are guided from light icebreakers to deep, vulnerable reflections. The experience is designed to feel like a ritual: intimate, warm, and intentional.

---

## ✨ Features

### 🎯 Tailored Onboarding
Before the session begins, players complete a brief two-step setup:
1. **Age Group Selection** — Choose a shared age bracket: Under 18, 18–24, 25–34, or 35+
2. **Gender Selection** — Both players independently select their gender identity (Man, Woman, Non-binary, Prefer not to say)

These inputs ensure the question deck served is highly relevant and age-appropriate. For example, the Under 18 deck strictly avoids mature or romantic themes.

### 🌊 Progressive Question System
Questions are dynamically assembled on the server from a Markdown source file (`question-data.md`), tagged by demographic combination and level. A standard session consists of **18 questions** — 6 per level, drawn from a mix of general and combo-specific pools:

| Level | Theme | Description |
|-------|-------|-------------|
| **Level 1** | Icebreaking | Light, fun, and easy to answer |
| **Level 2** | Personal | Thought-provoking questions about life, values, and memories |
| **Level 3** | Vulnerable | Deep, intimate, and connection-building |

### 🃏 Core Game Loop
- **One card at a time** — large, legible typography with a gentle card-flip animation
- **Animated transitions** — powered by Framer Motion for smooth level and card progressions
- **Quiet progress indicator** — shows how far along the players are without creating urgency
- **Warm closure** — a thoughtful closing screen wraps up the experience



### 🌙 Dark Mode
Full dark mode support, automatically respecting the user's system preference. Theme is applied before first paint to prevent any flash of unstyled content.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Fonts** | DM Sans + Newsreader via `next/font/google` |
| **Data** | Plain Markdown file parsed on the server (`question-data.md`) |

| **Deployment** | [Vercel](https://vercel.com/) |
---

## 🎨 Design Philosophy

The design language deliberately avoids the "game show" aesthetic.

- **Vibe:** Warm, intimate, minimal
- **Palette:** Soft, muted tones with full dark mode — designed for late-night conversations
- **Typography:** DM Sans for UI, Newsreader (serif) for question cards to evoke a printed, physical card feel
- **Motion:** Gentle Framer Motion transitions — nothing jarring, nothing urgent

