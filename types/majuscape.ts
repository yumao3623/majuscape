export type Difficulty = "easy" | "medium" | "hard";

export type GameId = "repair" | "sort" | "rush";

export type CapitalizationSkill =
  | "sentence-beginning"
  | "people"
  | "days"
  | "months"
  | "holidays"
  | "places"
  | "languages-nationalities"
  | "titles"
  | "proper-nouns"
  | "common-nouns"
  | "pronoun-i"
  | "mixed";

export interface TokenChange {
  index: number;
  explanation: string;
}

export interface SentenceChallenge {
  id: string;
  sentence: string;
  correctedSentence: string;
  grade: 2 | 3 | 4 | 5;
  difficulty: Difficulty;
  skills: CapitalizationSkill[];
  questionType: "sentence-repair" | "speed-repair";
  changes: TokenChange[];
}

export interface SortChallenge {
  id: string;
  term: string;
  context: string;
  correctedContext: string;
  capitalize: boolean;
  grade: 2 | 3 | 4 | 5;
  difficulty: Difficulty;
  skills: CapitalizationSkill[];
  questionType: "word-sort" | "context-sort";
  explanation: string;
  bonus?: boolean;
}

export interface Zone {
  id: string;
  name: string;
  shortName: string;
  skill: CapitalizationSkill;
  description: string;
  unlockXp: number;
}

export interface PlayerProgress {
  version: 1;
  xp: number;
  stars: number;
  dailyStreak: number;
  lastPlayedDate: string | null;
  bestScores: Record<GameId, number>;
  completedRounds: Record<GameId, number>;
  masteredRules: CapitalizationSkill[];
}
