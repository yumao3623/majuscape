import type { CapitalizationSkill, GameId, PlayerProgress } from "@/types/majuscape";

export const PROGRESS_KEY = "majuscape-progress-v1";

export const emptyProgress: PlayerProgress = {
  version: 1,
  xp: 0,
  stars: 0,
  dailyStreak: 0,
  lastPlayedDate: null,
  bestScores: { repair: 0, sort: 0, rush: 0 },
  completedRounds: { repair: 0, sort: 0, rush: 0 },
  masteredRules: [],
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function previousDay(date: string) {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() - 1);
  return value.toISOString().slice(0, 10);
}

export function readProgress(storage?: Pick<Storage, "getItem">): PlayerProgress {
  if (!storage) return emptyProgress;
  try {
    const saved = JSON.parse(storage.getItem(PROGRESS_KEY) ?? "null") as Partial<PlayerProgress> | null;
    if (!saved || saved.version !== 1) return emptyProgress;
    return {
      ...emptyProgress,
      ...saved,
      bestScores: { ...emptyProgress.bestScores, ...saved.bestScores },
      completedRounds: { ...emptyProgress.completedRounds, ...saved.completedRounds },
      masteredRules: Array.isArray(saved.masteredRules) ? saved.masteredRules : [],
    };
  } catch {
    return emptyProgress;
  }
}

export function saveProgress(storage: Pick<Storage, "setItem"> | undefined, progress: PlayerProgress) {
  if (!storage) return;
  try {
    storage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Progress is optional; gameplay remains available when storage is blocked.
  }
}

export function addRoundProgress(
  current: PlayerProgress,
  game: GameId,
  score: number,
  xp: number,
  stars: number,
  skills: CapitalizationSkill[],
) {
  const date = today();
  const dailyStreak = current.lastPlayedDate === date
    ? current.dailyStreak
    : current.lastPlayedDate === previousDay(date)
      ? current.dailyStreak + 1
      : 1;

  return {
    ...current,
    xp: current.xp + xp,
    stars: current.stars + stars,
    dailyStreak,
    lastPlayedDate: date,
    bestScores: { ...current.bestScores, [game]: Math.max(current.bestScores[game], score) },
    completedRounds: { ...current.completedRounds, [game]: current.completedRounds[game] + 1 },
    masteredRules: Array.from(new Set([...current.masteredRules, ...skills])),
  } satisfies PlayerProgress;
}
