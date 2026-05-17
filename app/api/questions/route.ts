import type { NextRequest } from "next/server";

import { createDeck } from "@/lib/questionDeck";
import type { AgeGroup, Gender } from "@/lib/questions";

export const dynamic = "force-dynamic";

const VALID_AGE_GROUPS = new Set<AgeGroup>(["Under 18", "18–24", "25–34", "35+"]);
const VALID_GENDERS = new Set<Gender>([
  "Man",
  "Woman",
  "Non-binary",
  "Prefer not to say",
]);

export async function GET(request: NextRequest) {
  const ageGroup = request.nextUrl.searchParams.get("ageGroup");
  const playerOneGender = request.nextUrl.searchParams.get("playerOneGender");
  const playerTwoGender = request.nextUrl.searchParams.get("playerTwoGender");

  if (
    !ageGroup ||
    !playerOneGender ||
    !playerTwoGender ||
    !VALID_AGE_GROUPS.has(ageGroup as AgeGroup) ||
    !VALID_GENDERS.has(playerOneGender as Gender) ||
    !VALID_GENDERS.has(playerTwoGender as Gender)
  ) {
    return Response.json(
      { error: "Invalid age group or gender selection." },
      {
        status: 400,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  try {
    const deck = createDeck(
      ageGroup as AgeGroup,
      playerOneGender as Gender,
      playerTwoGender as Gender,
    );

    return Response.json(deck, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create question deck.";

    return Response.json(
      { error: message },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
