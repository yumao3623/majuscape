import { describe, expect, it } from "vitest";
import { repairQuestions, rushQuestions, sortQuestions } from "@/data/gameContent";
import { changedTokenIndexes, isSentenceCorrect, splitSentence, starsForAccuracy, toggleTokenCase } from "@/lib/majuscapeGame";

describe("Majuscape sentence mechanics", () => {
  it("toggles the first alphabetical character without removing punctuation", () => {
    expect(toggleTokenCase("monday,")).toBe("Monday,");
    expect(toggleTokenCase("Monday,")).toBe("monday,");
    expect(toggleTokenCase("'texas'" )).toBe("'Texas'");
  });

  it("recognizes a fully repaired sentence", () => {
    const question = repairQuestions[0];
    expect(isSentenceCorrect(question, splitSentence(question.correctedSentence))).toBe(true);
    expect(changedTokenIndexes(question, splitSentence(question.sentence))).toEqual(question.changes.map((change) => change.index));
  });

  it("awards stars from accuracy", () => {
    expect(starsForAccuracy(4, 4)).toBe(3);
    expect(starsForAccuracy(3, 4)).toBe(2);
    expect(starsForAccuracy(2, 4)).toBe(1);
  });
});

describe("question metadata", () => {
  it("keeps sentence token changes aligned with corrected text", () => {
    for (const question of [...repairQuestions, ...rushQuestions]) {
      const original = splitSentence(question.sentence);
      const corrected = splitSentence(question.correctedSentence);
      expect(corrected).toHaveLength(original.length);
      const actualChanges = original.flatMap((token, index) => token === corrected[index] ? [] : [index]);
      expect(question.changes.map((change) => change.index)).toEqual(actualChanges);
      expect(question.skills.length).toBeGreaterThan(0);
      expect(question.changes.every((change) => change.explanation.length > 20)).toBe(true);
    }
  });

  it("provides contextual feedback for every sorting crate", () => {
    expect(sortQuestions.length).toBeGreaterThanOrEqual(18);
    for (const question of sortQuestions) {
      expect(question.context.length).toBeGreaterThan(question.term.length);
      expect(question.explanation.length).toBeGreaterThan(20);
      expect(question.skills.length).toBeGreaterThan(0);
    }
  });
});
