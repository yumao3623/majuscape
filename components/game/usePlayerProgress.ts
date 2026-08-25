"use client";

import { useCallback, useEffect, useState } from "react";
import { addRoundProgress, emptyProgress, readProgress, saveProgress } from "@/lib/progress";
import type { CapitalizationSkill, GameId } from "@/types/majuscape";

export function usePlayerProgress() {
  const [progress, setProgress] = useState(emptyProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProgress(readProgress(window.localStorage));
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const recordRound = useCallback((game: GameId, score: number, xp: number, stars: number, skills: CapitalizationSkill[]) => {
    setProgress((current) => {
      const next = addRoundProgress(current, game, score, xp, stars, skills);
      saveProgress(window.localStorage, next);
      return next;
    });
  }, []);

  return { progress, ready, recordRound };
}
