import type { Difficulty, GameMode } from "@/types/game";

export const STORAGE_KEYS = {
  bestScore: "capitalization-games-best-score",
  difficulty: "capitalization-games-difficulty",
  mode: "capitalization-games-mode",
} as const;

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function getBrowserStorage(): StorageLike | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

export function readNumber(storage: StorageLike | undefined, key: string, fallback = 0) {
  if (!storage) return fallback;
  try {
    const value = storage.getItem(key);
    if (value === null || value.trim() === "") return fallback;
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function readChoice<T extends string>(
  storage: StorageLike | undefined,
  key: string,
  allowed: readonly T[],
  fallback: T,
) {
  if (!storage) return fallback;
  try {
    const value = storage.getItem(key) as T | null;
    return value && allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function writeValue(storage: StorageLike | undefined, key: string, value: string | number) {
  if (!storage) return;
  try {
    storage.setItem(key, String(value));
  } catch {
    // Browsers may block storage; gameplay should continue normally.
  }
}

export const difficulties: readonly Difficulty[] = ["easy", "medium", "hard"];
export const modes: readonly GameMode[] = ["choose", "fix", "capital"];
