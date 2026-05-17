import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";

import type {
  AgeGroup,
  Gender,
  Question,
  QuestionDeck,
  QuestionLevel,
} from "./questions";

type LevelBuckets = Record<QuestionLevel, string[]>;

const LEVELS: QuestionLevel[] = [1, 2, 3];

const GENDER_ORDER: Record<string, number> = {
  man: 0,
  woman: 1,
  nonbinary: 2,
  prefernottosay: 3,
};

function createEmptyBuckets(): LevelBuckets {
  return { 1: [], 2: [], 3: [] };
}

function normalizeAgeGroup(ageGroup: string): string {
  return ageGroup
    .trim()
    .toLowerCase()
    .replace(/[–—]/g, "-");
}

function normalizeGender(gender: string): string {
  return gender
    .trim()
    .toLowerCase()
    .replace(/[–—-]/g, "")
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, "");
}

function buildComboKey(ageGroup: string, firstGender: string, secondGender: string) {
  const genders = [normalizeGender(firstGender), normalizeGender(secondGender)].sort(
    (left, right) => GENDER_ORDER[left] - GENDER_ORDER[right],
  );

  return `${normalizeAgeGroup(ageGroup)}|${genders.join("+")}`;
}

function parseQuestionData() {
  const filePath = path.join(process.cwd(), "question-data.md");
  const fileContents = readFileSync(filePath, "utf8");
  const lines = fileContents.split(/\r?\n/);

  const general = createEmptyBuckets();
  const combos = new Map<string, LevelBuckets>();

  let currentSection: "general" | string | null = null;
  let currentLevel: QuestionLevel | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    const sectionMatch = line.match(/^##\s+(.+)$/);
    if (sectionMatch) {
      const sectionName = sectionMatch[1].trim();

      if (sectionName === "GENERAL (All Ages, All Genders)") {
        currentSection = "general";
      } else {
        const [ageGroupPart, genderPart] = sectionName.split("|").map((part) => part.trim());
        const [firstGender, secondGender] = genderPart
          .split("+")
          .map((part) => part.trim());
        const comboKey = buildComboKey(ageGroupPart, firstGender, secondGender);

        if (!combos.has(comboKey)) {
          combos.set(comboKey, createEmptyBuckets());
        }

        currentSection = comboKey;
      }

      currentLevel = null;
      continue;
    }

    const levelMatch = line.match(/^\*\*Level\s+([123])\b/);
    if (levelMatch) {
      currentLevel = Number(levelMatch[1]) as QuestionLevel;
      continue;
    }

    const questionMatch = line.match(/^-\s+(.+)$/);
    if (!questionMatch || currentSection === null || currentLevel === null) {
      continue;
    }

    const questionText = questionMatch[1].trim();

    if (currentSection === "general") {
      general[currentLevel].push(questionText);
    } else {
      combos.get(currentSection)?.[currentLevel].push(questionText);
    }
  }

  return { general, combos };
}

function randomSample<T>(items: T[], count: number): T[] {
  const pool = [...items];

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[randomIndex]] = [pool[randomIndex], pool[index]];
  }

  return pool.slice(0, count);
}

function buildQuestionId(
  level: QuestionLevel,
  source: "general" | "combo",
  questionIndex: number,
  text: string,
) {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return `${source}-l${level}-${questionIndex + 1}-${slug}`;
}

export function createDeck(
  ageGroup: AgeGroup,
  playerOneGender: Gender,
  playerTwoGender: Gender,
): QuestionDeck {
  const { general, combos } = parseQuestionData();
  const comboKey = buildComboKey(ageGroup, playerOneGender, playerTwoGender);
  const comboQuestions = combos.get(comboKey);

  if (!comboQuestions) {
    throw new Error(`No question set found for "${ageGroup}" and selected genders.`);
  }

  const questions: Question[] = [];

  for (const level of LEVELS) {
    const generalLevelQuestions = general[level];
    const comboLevelQuestions = comboQuestions[level];

    if (generalLevelQuestions.length < 3) {
      throw new Error(`Level ${level} needs at least 3 general questions.`);
    }

    if (comboLevelQuestions.length < 3) {
      throw new Error(
        `Level ${level} for "${ageGroup}" needs at least 3 combo-specific questions.`,
      );
    }

    const selectedGeneral = randomSample(generalLevelQuestions, 3);
    const selectedCombo = randomSample(comboLevelQuestions, 3);
    const levelQuestions = randomSample(
      [
        ...selectedGeneral.map((text) => ({ text, source: "general" as const })),
        ...selectedCombo.map((text) => ({ text, source: "combo" as const })),
      ],
      6,
    );

    levelQuestions.forEach(({ text, source }, questionIndex) => {
      questions.push({
        id: buildQuestionId(level, source, questionIndex, text),
        level,
        text,
        source,
      });
    });
  }

  return {
    ageGroup,
    playerOneGender,
    playerTwoGender,
    questions,
  };
}
