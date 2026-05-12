export interface Question {
  id: number;
  level: 1 | 2 | 3;
  text: string;
}

export const LEVEL_NAMES: Record<1 | 2 | 3, string> = {
  1: "Icebreaking",
  2: "Personal",
  3: "Vulnerable",
};

export const LEVEL_ICONS: Record<1 | 2 | 3, string> = {
  1: "auto_awesome",
  2: "favorite",
  3: "water_drop",
};

// Placeholder questions — will be replaced with age-group-specific content later
export const questions: Question[] = [
  // ── Level 1: Icebreaking ──
  { id: 1, level: 1, text: "What is a seemingly insignificant memory that you think about often?" },
  { id: 2, level: 1, text: "If you could have dinner with anyone, living or dead, who would it be?" },
  { id: 3, level: 1, text: "What is the most spontaneous thing you've ever done?" },
  { id: 4, level: 1, text: "What does a perfect day look like for you?" },
  { id: 5, level: 1, text: "What is something you've always wanted to learn but never have?" },

  // ── Level 2: Personal ──
  { id: 6, level: 2, text: "What is a piece of advice that has stayed with you?" },
  { id: 7, level: 2, text: "What do you value most in a friendship?" },
  { id: 8, level: 2, text: "When did you last cry in front of another person?" },
  { id: 9, level: 2, text: "What is your most treasured memory?" },
  { id: 10, level: 2, text: "Is there something you've dreamed of doing for a long time? Why haven't you done it?" },

  // ── Level 3: Vulnerable ──
  { id: 11, level: 3, text: "What are you most afraid of being seen as?" },
  { id: 12, level: 3, text: "If you knew that in one year you would die suddenly, would you change anything about the way you are now living?" },
  { id: 13, level: 3, text: "What is the greatest accomplishment of your life?" },
  { id: 14, level: 3, text: "Share a personal problem and ask for advice on how the other person might handle it." },
  { id: 15, level: 3, text: "What, if anything, is too serious to be joked about?" },
];

export function getQuestionsByLevel(level: 1 | 2 | 3): Question[] {
  return questions.filter((q) => q.level === level);
}
