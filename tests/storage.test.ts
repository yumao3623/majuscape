import { describe, expect, it } from "vitest";
import { getBrowserStorage, readChoice, readNumber, writeValue } from "@/lib/storage";

describe("safe storage helpers", () => {
  it("reads valid values", () => {
    const storage = { getItem: (key: string) => key === "score" ? "40" : "hard", setItem: () => undefined };
    expect(readNumber(storage, "score")).toBe(40);
    expect(readChoice(storage, "difficulty", ["easy", "medium", "hard"] as const, "easy")).toBe("hard");
  });

  it("uses fallbacks for invalid or blocked storage", () => {
    const blocked = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
    expect(readNumber(blocked, "score", 7)).toBe(7);
    expect(readChoice(blocked, "mode", ["choose", "fix"] as const, "choose")).toBe("choose");
    expect(() => writeValue(blocked, "score", 10)).not.toThrow();
  });

  it("uses the numeric fallback when a value is missing and stays SSR-safe", () => {
    const empty = { getItem: () => null, setItem: () => undefined };
    expect(readNumber(empty, "score", 7)).toBe(7);
    expect(getBrowserStorage()).toBeUndefined();
  });
});
