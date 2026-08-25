import type { CapitalizationQuestion, Difficulty, GameMode, RoundState, Skill } from "@/types/game";

export const ROUND_LENGTH = 10;

export function filterQuestions(
  questions: CapitalizationQuestion[],
  mode: GameMode,
  difficulty: Difficulty,
  skill: Skill | "all" = "all",
) {
  return questions.filter(
    (question) =>
      question.mode === mode &&
      question.difficulty === difficulty &&
      (skill === "all" || question.skill === skill),
  );
}

export function normalizeAnswer(value: string) {
  return value.trim();
}

export function isExactAnswer(value: string, answer: string) {
  return normalizeAnswer(value) === answer;
}

export function updateRound(state: RoundState, isCorrect: boolean): RoundState {
  const streak = isCorrect ? state.streak + 1 : 0;
  return {
    score: state.score + (isCorrect ? 10 : 0),
    streak,
    bestStreak: Math.max(state.bestStreak, streak),
    answered: state.answered + 1,
    correct: state.correct + (isCorrect ? 1 : 0),
  };
}

export function pickNextQuestion<T extends { id: string }>(
  pool: T[],
  currentId: string | undefined,
  seenIds: Set<string>,
  random = Math.random,
) {
  if (!pool.length) return undefined;
  let candidates = pool.filter((question) => !seenIds.has(question.id));
  if (!candidates.length) candidates = pool.filter((question) => question.id !== currentId);
  if (!candidates.length) candidates = pool;
  return candidates[Math.floor(random() * candidates.length)];
}
