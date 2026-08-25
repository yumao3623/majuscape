export type Difficulty = "easy" | "medium" | "hard";
export type GameMode = "choose" | "fix" | "capital";

export type Skill =
  | "sentence-beginnings"
  | "pronoun-i"
  | "names"
  | "days"
  | "months"
  | "cities"
  | "countries"
  | "languages"
  | "nationalities"
  | "holidays"
  | "titles"
  | "organisations"
  | "geographic-names"
  | "historical-events"
  | "mixed";

interface BaseQuestion {
  id: string;
  difficulty: Difficulty;
  skill: Skill;
}

export interface ChooseQuestion extends BaseQuestion {
  mode: "choose";
  prompt: string;
  options: [string, string, string];
  answer: string;
}

export interface FixQuestion extends BaseQuestion {
  mode: "fix";
  prompt: string;
  answer: string;
}

export interface CapitalQuestion extends BaseQuestion {
  mode: "capital";
  prompt: string;
  answer: boolean;
  displayAnswer: string;
}

export type CapitalizationQuestion = ChooseQuestion | FixQuestion | CapitalQuestion;

export interface RoundState {
  score: number;
  streak: number;
  bestStreak: number;
  answered: number;
  correct: number;
}
