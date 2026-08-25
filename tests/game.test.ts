import { describe, expect, it } from "vitest";
import { capitalizationQuestions } from "@/data/capitalizationQuestions";
import { filterQuestions, isExactAnswer, pickNextQuestion, updateRound } from "@/lib/game";

describe("question filtering", () => {
  it("filters by game mode and difficulty", () => {
    const questions = filterQuestions(capitalizationQuestions, "fix", "medium");
    expect(questions).toHaveLength(10);
    expect(questions.every((question) => question.mode === "fix" && question.difficulty === "medium")).toBe(true);
  });

  it("filters by skill when selected", () => {
    const questions = filterQuestions(capitalizationQuestions, "choose", "easy", "days");
    expect(questions.length).toBeGreaterThan(0);
    expect(questions.every((question) => question.skill === "days")).toBe(true);
  });

  it("contains 90 complete questions", () => {
    expect(capitalizationQuestions).toHaveLength(90);
    expect(new Set(capitalizationQuestions.map((question) => question.id)).size).toBe(90);
  });
});

describe("round logic", () => {
  it("adds ten points and grows a streak for a correct answer", () => {
    const next = updateRound({ score: 20, streak: 2, bestStreak: 2, answered: 2, correct: 2 }, true);
    expect(next).toEqual({ score: 30, streak: 3, bestStreak: 3, answered: 3, correct: 3 });
  });

  it("keeps the score and resets the streak for an incorrect answer", () => {
    const next = updateRound({ score: 20, streak: 2, bestStreak: 4, answered: 4, correct: 2 }, false);
    expect(next).toEqual({ score: 20, streak: 0, bestStreak: 4, answered: 5, correct: 2 });
  });

  it("avoids the current or already seen question when possible", () => {
    const pool = [{ id: "a" }, { id: "b" }, { id: "c" }];
    expect(pickNextQuestion(pool, "a", new Set(["a", "b"]), () => 0)?.id).toBe("c");
  });
});

describe("answer matching", () => {
  it("ignores surrounding spaces but preserves capitalization and punctuation", () => {
    expect(isExactAnswer("  My friend Jack lives in London.  ", "My friend Jack lives in London.")).toBe(true);
    expect(isExactAnswer("my friend Jack lives in London.", "My friend Jack lives in London.")).toBe(false);
    expect(isExactAnswer("My friend Jack lives in London", "My friend Jack lives in London.")).toBe(false);
  });
});
