export type QuestionLevel = 1 | 2 | 3;

export type AgeGroup = "Under 18" | "18–24" | "25–34" | "35+";

export type Gender = "Man" | "Woman" | "Non-binary" | "Prefer not to say";

export interface Question {
  id: string;
  level: QuestionLevel;
  text: string;
  source: "general" | "combo";
}

export interface QuestionDeck {
  ageGroup: AgeGroup;
  playerOneGender: Gender;
  playerTwoGender: Gender;
  questions: Question[];
}

export const LEVEL_NAMES: Record<QuestionLevel, string> = {
  1: "Icebreaking",
  2: "Personal",
  3: "Vulnerable",
};

export const LEVEL_ICONS: Record<QuestionLevel, string> = {
  1: "auto_awesome",
  2: "favorite",
  3: "water_drop",
};

export const AGE_GROUPS: readonly AgeGroup[] = [
  "Under 18",
  "18–24",
  "25–34",
  "35+",
];

export const GENDERS: readonly Gender[] = [
  "Man",
  "Woman",
  "Non-binary",
  "Prefer not to say",
];

export function getQuestionsByLevel(
  questions: Question[],
  level: QuestionLevel,
): Question[] {
  return questions.filter((question) => question.level === level);
}
