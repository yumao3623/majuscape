import { describe, expect, it } from "vitest";
import { addRoundProgress, emptyProgress, PROGRESS_KEY, readProgress, saveProgress } from "@/lib/progress";

describe("player progress", () => {
  it("adds XP, stars, best scores, rounds, and mastered rules", () => {
    const next = addRoundProgress(emptyProgress, "repair", 540, 100, 2, ["people", "places"]);
    expect(next.xp).toBe(100);
    expect(next.stars).toBe(2);
    expect(next.bestScores.repair).toBe(540);
    expect(next.completedRounds.repair).toBe(1);
    expect(next.masteredRules).toEqual(["people", "places"]);
  });

  it("falls back safely when saved JSON is invalid", () => {
    const storage = { getItem: () => "not json" };
    expect(readProgress(storage)).toEqual(emptyProgress);
  });

  it("writes a versioned progress object", () => {
    const values = new Map<string, string>();
    saveProgress({ setItem: (key, value) => values.set(key, value) }, emptyProgress);
    expect(JSON.parse(values.get(PROGRESS_KEY) ?? "{}").version).toBe(1);
  });
});
