# Deep Cards 🃏

> A co-located, single-device web app designed to facilitate meaningful, progressively deeper conversations between two people. Inspired by the *"36 Questions That Lead to Love"* and *"We're Not Really Strangers"*.

---

## 📖 Overview

**Deep Cards** is a digital card game meant to be played by two people sitting next to each other, sharing a single screen. The goal is to strip away the distractions of modern gamification—no timers, no scores, no competition—and focus entirely on human connection. Through a carefully structured, progressive set of question prompts, players are guided from light, surface-level icebreakers to deep, vulnerable reflections.

The experience is designed to feel like a ritual: intimate, warm, and intentional.

## ✨ Features

### 🎯 Tailored Onboarding
Before the session begins, players complete a brief, two-step setup:
1. **Age Group Selection:** Select a shared age bracket (Under 18, 18–24, 25–34, 35+).
2. **Inclusive Gender Selection:** Both players select their gender identities (Man, Woman, Non-binary, Prefer not to say).
*These inputs ensure the question deck served is highly relevant and age-appropriate (e.g., the Under 18 deck strictly avoids mature or romantic themes).*

### 🌊 Progressive Question System
Questions are dynamically loaded from a local JSON structure, tagged by age, difficulty, and theme. A standard session consists of roughly 36 questions, divided into three tiers:
* **Level 1 (Surface):** Light, fun, and easy icebreakers.
* **Level 2 (Reflective):** Personal, thought-provoking questions about life, memories, and values.
* **Level 3 (Intimate):** Deep, vulnerable, and connection-building prompts.

### 🃏 Core Game Loop
* **Minimalist Interface:** One card is displayed at a time with large, legible typography.
* **Subtle Navigation:** A "Next Card" button triggers a gentle, animated card-flip transition.
* **Pacing:** A quiet progress indicator shows how far along the players are without causing urgency.
* **Warm Closure:** A thoughtful closing screen wraps up the experience once the deck is completed.

### 📱 PWA & Offline Support
Deep Cards is an installable Progressive Web App (PWA). Users can save it to their home screens and run it completely offline—perfect for camping trips, flights, or cozy coffee shops with bad Wi-Fi.

## 🎨 UI/UX Philosophy
The design language of Deep Cards deliberately avoids the "game show" aesthetic. 
* **Vibe:** Warm, intimate, minimal.
* **Palette:** Soft, muted colors (e.g., warm creams, soft terracotta, deep slate) with full **Dark Mode** support for late-night conversations.
* **Motion:** Gentle, CSS-based transitions and card flips.

## 🛠 Tech Stack

**Current Architecture:**
* **Frontend:** Next.js (React)
* **Styling:** Tailwind CSS (or standard CSS Modules tailored for minimal design)
* **Data Storage:** Plain JSON files (`data/questions.json`)
* **Deployment:** Vercel (Static Site Generation)
* **Offline/Mobile:** PWA configured via `next-pwa`

